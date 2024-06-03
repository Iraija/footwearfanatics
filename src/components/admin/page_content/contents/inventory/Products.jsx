import React, { useEffect, useState } from "react";
import supabase from "../../../../../config/SupabaseClient";
import ProductSizeModal from "./inventory_modals/ProductSizeModal";
import Load2 from "../../../../loading/Load2";
import AddProductModal from "./inventory_modals/AddProductModal";
import ViewProductModal from "./inventory_modals/ViewProductModal";
import ConfirmationModal from "./inventory_modals/ConfirmationModal";

function Products() {
    const [fetchError, setFetchError] = useState(null);
    const [categories, setCategories] = useState(null);
    const [products, setProducts] = useState(null);
    const [sizes, setSizes] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null); 
    const [searchTerm, setSearchTerm] = useState("");
    const [sizeModalState, setSizeModalState] = useState(false);
    const [viewModalState, setViewModalState] = useState(false);
    const [addModalState, setAddModalState] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);        

    useEffect(() => {
        // Calculate total quantity for each product
        if (products && sizes) {
            const productsWithQuantity = products.map(product => {
                // Find the row in product_size_quantity for the current product
                const productSizesRow = sizes.find(sizeRow => sizeRow.product_id === product.id);
                if (productSizesRow) {
                    // Extract the quantities from the row and sum them, skipping first 2 columns
                    const quantities = Object.values(productSizesRow).slice(2).filter(val => typeof val === 'number');
                    const totalQuantity = quantities.reduce((acc, curr) => acc + curr, 0);
                    return { ...product, totalQuantity };
                } else {
                    return { ...product, totalQuantity: 0 }; // No sizes found, set totalQuantity to 0
                }
            });
            setQuantity(productsWithQuantity);
        }
    }, [products, sizes]);    

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const productsResponse = await supabase.from('product').select();
            const sizesResponse = await supabase.from('product_size_quantity').select();
            const categoriesResponse = await supabase.from('category').select();

            if (productsResponse.error || sizesResponse.error || categoriesResponse.error) {
                setFetchError('Could not fetch data');
                setProducts(null);
                setSizes(null);
                setCategories(null);
                console.error(productsResponse.error || sizesResponse.error || categoriesResponse.error);
                setIsLoading(false);
            } else {
                setProducts(productsResponse.data);
                setSizes(sizesResponse.data);
                setCategories(categoriesResponse.data);
                setFetchError(null);
                setIsLoading(false);
            }
        } catch (error) {
            setFetchError('Could not fetch data');
            setProducts(null);
            setSizes(null);
            setCategories(null);
            console.error('Error fetching data:', error.message);
        }
    };

    const handleViewSizes = (product) => {
        setSelectedProduct(product);
        setSizeModalState(true);
    };

    const handleViewProduct = (product) => {
        setSelectedProduct(product);
        setViewModalState(true);
    };

    const handleDeleteProduct = async (productId) => {
        try {
            setIsLoading(true);

            // Delete related data from 'product_size_quantity'
            const { error: sizeError } = await supabase
                .from('product_size_quantity')
                .delete()
                .eq('product_id', productId);
            if (sizeError) {
                throw new Error('Error deleting product sizes');
            }

            // Delete the product from 'product'
            const { error: productError } = await supabase
                .from('product')
                .delete()
                .eq('id', productId);
            if (productError) {
                throw new Error('Error deleting product');
            }

            // Refresh data after deletion
            fetchData();
        } catch (error) {
            console.error('Error deleting product:', error.message);
        } finally {
            setIsLoading(false);
            setConfirmModal(false);
        }
    };

    const handleOpenDeleteModal = (product) => {
        setSelectedProduct(product);
        setConfirmModal(true);
    };

    const handleRefresh = () => {
        fetchData();
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredProducts = quantity
        ? quantity.filter(product =>
              product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              product.product_brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
              (product.product_main_category && product.product_main_category.toLowerCase().includes(searchTerm.toLowerCase())) ||
              (product.product_sub_category_1 && product.product_sub_category_1.toLowerCase().includes(searchTerm.toLowerCase())) ||
              (product.product_sub_category_2 && product.product_sub_category_2.toLowerCase().includes(searchTerm.toLowerCase())) ||
              (product.product_sub_category_3 && product.product_sub_category_3.toLowerCase().includes(searchTerm.toLowerCase()))
          )
        : [];

    const tableHeader = [
        { name: "Product Name" },
        { name: "Brand" },
        { name: "Total Quantity" },
        { name: "Price" },
        { name: "Sizes" },
        { name: "Total Orders" },
        { name: "Actions" },
    ];

    return (
        <div className="p-4 bg-white rounded-lg shadow-md shadow-gray-400">
            <div className="text-sm md:text-base">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <p className="font-medium">Products:</p>
                    <div>
                        <span className="mr-1 md:mr-2 font-medium">Search</span>
                        <input
                            type="text"
                            placeholder="Search products.."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="px-2 py-1 md:px-4 md:py-2 bg-slate-50 border-2 rounded-md outline-none text-xs md:text-sm"
                        />
                    </div>
                </div>
                <div className="flex justify-between items-center my-2">
                    <button onClick={() => setAddModalState((prevState) => !prevState)} className="py-1 px-3 text-white text-xs md:text-sm bg-green-500 rounded-full">
                        <span>Add Product </span><i className="fa-solid fa-plus"></i>
                    </button>
                    <button onClick={handleRefresh} className="text-gray-400 hover:text-blue-500 text-xs md:text-sm py-1 px-1">
                        <i className="fa-solid fa-rotate-right"></i>
                    </button>
                </div>
            </div>
            <div className="h-96 relative">
                {isLoading && <Load2 />}

                {filteredProducts.length > 0 &&
                    <div className={`${isLoading ? 'overflow-hidden' : 'overflow-auto'} h-full`}>
                        <table className="min-w-full divide-y divide-gray-200 text-xs">
                            <thead className="bg-gray-50">
                                <tr className="sticky top-0">
                                    {tableHeader.map((th, index) => (
                                        <th key={index} scope="col" className="px-4 py-1 md:px-6 md:py-3 font-medium text-gray-500 uppercase tracking-wider text-center">{th.name}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredProducts.map((product) => (
                                    <tr 
                                        key={product.id}
                                        className="hover:bg-gray-100"
                                    >
                                        <td className="px-4 py-2 md:px-6 md:py-3 whitespace-nowrap font-medium text-gray-900">{product.product_name}</td>
                                        <td className="px-4 py-2 md:px-6 whitespace-nowrap text-gray-500">{product.product_brand}</td>
                                        <td className="px-4 py-2 md:px-6 whitespace-nowrap text-gray-500">{product.totalQuantity}</td>
                                        <td className="px-4 py-2 md:px-6 whitespace-nowrap text-gray-500">{product.product_price ? `Php ${product.product_price.toFixed(2)}` : '-'}</td>
                                        <td className="px-4 py-2 md:px-6 whitespace-nowrap text-gray-500">
                                            <button onClick={() => handleViewSizes(product)} className="py-[0.15rem] px-2 bg-gray-100 rounded-full border-[1px] border-gray-500 hover:bg-gray-300">View sizes</button>
                                        </td>
                                        <td className="px-4 py-2 md:px-6 whitespace-nowrap text-gray-500">{product.total_order ? `${product.total_order}` : 'No Orders Yet'}</td>
                                        <td className="px-4 py-2 md:px-6 whitespace-nowrap text-gray-500 flex gap-2">
                                            <button onClick={() => handleViewProduct(product)} className="py-[0.15rem] px-2 bg-gray-100 rounded-full border-[1px] border-gray-500 hover:bg-gray-300">View Product</button>
                                            <button onClick={() => handleOpenDeleteModal(product)} className="text-red-500 hover:text-red-700 text-xs w-5 h-5"><i className="fa-solid fa-trash-can"></i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
            {viewModalState && <ViewProductModal product={selectedProduct} setModalState={setViewModalState} />}
            {sizeModalState && <ProductSizeModal product={selectedProduct} setModalState={setSizeModalState} />}
            {addModalState && <AddProductModal product={selectedProduct} setModalState={setAddModalState} />}
            {confirmModal && (
                <ConfirmationModal 
                    name={selectedProduct.product_name}
                    onConfirm={() => handleDeleteProduct(selectedProduct.id)}
                    onCancel={() => setConfirmModal(false)}
                    setModalState={setConfirmModal}
                />
            )}
        </div>
    );
}

export default Products;

import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import Modal from "./../../../../../../../modal/Modal";
import supabase from "./../../../../../../../../config/SupabaseClient";
import Load from "./../../../../../../../loading/Load";

function AddProductModal({ setModalState }) {
    const [fetchError, setFetchError] = useState(null);
    const [brands, setBrands] = useState(null);
    const [categories, setCategories] = useState(null);
    const [load, setLoad] = useState(false);
    const inputRef = useRef();

    const [productData, setProductData] = useState({
        product_name: "",
        product_description: "",
        product_image_url: "",
        product_brand: "",
        product_price: "",
        product_main_category: "",
        product_sub_category_1: "",
        product_sub_category_2: "",
        product_sub_category_3: "",
    });

    const [productImage, setProductImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoad(true);

            try {
                const brandsResponse = await supabase.from('brand').select();
                const categoriesResponse = await supabase.from('category').select();

                if (brandsResponse.error || categoriesResponse.error) {
                    setLoad(false);
                    throw new Error('Could not fetch data');
                }
                setBrands(brandsResponse.data);
                setCategories(categoriesResponse.data);
                setFetchError(null);
                setLoad(false);
            } catch (error) {
                setFetchError('Could not fetch data');
                setBrands(null);
                setCategories(null);
                setLoad(false);
                console.error(error.message);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setProductImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleRemoveImage = () => {
        setProductImage(null);
        setImagePreview(null);
        inputRef.current.value = null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoad(true);
    
        try {
            let imageURL = "";
    
            if (productImage) {
                const imagePath = `product-images/${Date.now()}_${productImage.name}`;
                const { data: imageData, error: imageError } = await supabase.storage
                    .from("product-images")
                    .upload(imagePath, productImage);
    
                if (imageError) {
                    throw new Error('Error uploading image: ' + imageError.message);
                }
    
                const { data: publicURLData, error: urlError } = supabase.storage
                    .from("product-images")
                    .getPublicUrl(imagePath);
    
                if (urlError) {
                    throw new Error('Error getting image URL: ' + urlError.message);
                }
    
                imageURL = publicURLData.publicUrl;
                console.log(imageURL);
            }
    
            const { data: productDataResponse, error: productError } = await supabase
                .from('product')
                .insert([{ ...productData, product_image_url: imageURL }]);
    
            if (productError) {
                throw new Error('Error creating product: ' + productError.message);
            }
            toast.success("Product added successfully!");
            setLoad(false);
            console.log('Product added successfully');
            setModalState(false);
        } catch (error) {
            toast.error("Error adding product!");
            setLoad(false);
            console.error(error.message);
            alert('Error: ' + error.message);
        }
    };    

    return (
        <Modal>
            {load && <Load />}
            <div className="flex justify-between mb-2">
                <p className="font-bold text-lg mb-2">Add New Product:</p>
                <button onClick={() => setModalState(prevState => !prevState)} className="text-gray-400 hover:text-gray-700 duration-300">
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>
            <div className="relative">
                {brands && categories &&
                    <form
                        onSubmit={handleSubmit}
                        className="text-xs md:text-sm"
                    >
                        <div className="overflow-y-auto flex flex-col gap-5">
                            <div className="flex flex-col md:grid md:grid-cols-4 gap-4">
                                <div className="grid col-span-1 row-span-3">
                                    <label className="font-semibold">Product Image:</label>
                                    <div className="h-44 w-44 rounded-md bg-slate-50 border-2 overflow-hidden">
                                        {!imagePreview ? 
                                            <div className="h-full w-full">
                                                <input
                                                    className="px-3 py-1 rounded-md bg-slate-50 border-2 outline-blue-300"
                                                    type="file"
                                                    hidden
                                                    accept="image/jpeg, image/png"
                                                    ref={inputRef}
                                                    onChange={handleImageChange}
                                                />
                                                <div
                                                    className="h-full w-full flex justify-center items-center hover:bg-slate-100 cursor-pointer"
                                                    onClick={() => inputRef.current.click()}
                                                >
                                                    Select Image
                                                </div>
                                            </div>
                                        : 
                                            <div className="h-full w-full relative">
                                                <input
                                                    className="px-3 py-1 rounded-md bg-slate-50 border-2 outline-blue-300"
                                                    type="file"
                                                    hidden
                                                    accept="image/jpeg, image/png"
                                                    ref={inputRef}
                                                    onChange={handleImageChange}
                                                />
                                                <div
                                                    className="w-full flex justify-end items-center absolute p-2 top-0 left-0"
                                                >
                                                    <i className="fa-solid fa-xmark cursor-pointer text-gray-400 hover:text-blue-500 duration-300"
                                                        onClick={handleRemoveImage}
                                                    ></i>
                                                </div>
                                                <div
                                                    className="w-full flex absolute bottom-0 left-0"
                                                >
                                                    <span
                                                        className="bg-slate-200 hover:bg-blue-500 bg-opacity-50 cursor-pointer py-2 w-full text-center"
                                                        onClick={() => inputRef.current.click()}
                                                    >
                                                        Select other image
                                                    </span>
                                                </div>
                                                <img src={imagePreview} alt="Product" className="h-full w-full object-cover"/>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className="grid col-span-3">
                                    <label className="font-semibold">Product Name:</label>
                                    <input
                                        className="px-3 py-1 rounded-md bg-slate-50 border-2 outline-blue-300"
                                        type="text"
                                        name="product_name"
                                        placeholder="Enter product name"
                                        value={productData.product_name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="grid col-span-3">
                                    <label className="font-semibold">Price:</label>
                                    <div>
                                        <span className="text-gray-400">Php </span>
                                        <input
                                            className="px-3 py-1 rounded-md bg-slate-50 border-2 outline-blue-300"
                                            type="number"
                                            name="product_price"
                                            placeholder="Enter product price"
                                            value={productData.product_price}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="grid col-span-1">
                                    <label className="font-semibold">Brand:</label>
                                    <select
                                        className="px-3 py-1 rounded-md bg-slate-50 border-2 outline-blue-300"
                                        name="product_brand"
                                        value={productData.product_brand}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Brand</option>
                                        {brands.map((brand) => (
                                            <option key={brand.id} value={brand.brand_name}>{brand.brand_name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="grid col-span-4">
                                    <label className="font-semibold">Product Description:</label>
                                    <textarea
                                        className="px-3 py-1 rounded-md bg-slate-50 border-2 outline-blue-300"
                                        type="text"
                                        name="product_description"
                                        value={productData.product_description}
                                        onChange={handleChange}
                                    />
                                </div>
                                <label className="grid col-span-4 font-semibold">Product Categories:</label>
                                <div className="grid">
                                    <label className="font-semibold">Main Category:</label>
                                    <select
                                        className="px-3 py-1 rounded-md bg-slate-50 border-2 outline-blue-300"
                                        name="product_main_category"
                                        value={productData.product_main_category}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Main Category</option>
                                        {categories.filter(category => category.category_type === 'main').map((category) => (
                                            <option key={category.id} value={category.product_category}>{category.product_category}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="grid">
                                    <label className="font-semibold">Sub Category 1:</label>
                                    <select
                                        className="px-3 py-1 rounded-md bg-slate-50 border-2 outline-blue-300"
                                        name="product_sub_category_1"
                                        value={productData.product_sub_category_1}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Sub Category</option>
                                        {categories.filter(category => category.category_type === 'sub').map((category) => (
                                            <option key={category.id} value={category.product_category}>{category.product_category}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="grid">
                                    <label className="font-semibold">Sub Category 2:</label>
                                    <select
                                        className="px-3 py-1 rounded-md bg-slate-50 border-2 outline-blue-300"
                                        name="product_sub_category_2"
                                        value={productData.product_sub_category_2}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Sub Category</option>
                                        {categories.filter(category => category.category_type === 'sub').map((category) => (
                                            <option key={category.id} value={category.product_category}>{category.product_category}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="grid">
                                    <label className="font-semibold">Sub Category 3:</label>
                                    <select
                                        className="px-3 py-1 rounded-md bg-slate-50 border-2 outline-blue-300"
                                        name="product_sub_category_3"
                                        value={productData.product_sub_category_3}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Sub Category</option>
                                        {categories.filter(category => category.category_type === 'sub').map((category) => (
                                            <option key={category.id} value={category.product_category}>{category.product_category}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex justify-end gap-2 mt-5">
                            <button
                                type="submit"
                                className="py-1 px-3 bg-green-500 text-white text-xs md:text-sm rounded-full"
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={() => setModalState(prevState => !prevState)}
                                className="py-1 px-3 bg-red-500 text-white text-xs md:text-sm rounded-full"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                }
            </div>
        </Modal>
    );
}

export default AddProductModal;

import React, { useEffect, useState, useRef } from "react";
import Modal from "./../../../../../../../modal/Modal";
import supabase from "./../../../../../../../../config/SupabaseClient";
import Load from "./../../../../../../../loading/Load";

function ViewProductModal({ product, setModalState }) {
    const { product_name, product_description, product_brand, product_price, product_main_category, product_sub_category_1, product_sub_category_2, product_sub_category_3, product_image_url } = product;
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [productData, setProductData] = useState({
        product_name,
        product_description,
        product_brand,
        product_price,
        product_main_category,
        product_sub_category_1,
        product_sub_category_2,
        product_sub_category_3,
        product_image_url
    });
    const [imagePreview, setImagePreview] = useState(product_image_url);
    const inputRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const brandsResponse = await supabase.from('brand').select('brand_name');
                const categoriesResponse = await supabase.from('category').select('product_category, category_type');

                if (brandsResponse.error || categoriesResponse.error) {
                    console.error(brandsResponse.error || categoriesResponse.error);
                } else {
                    setBrands(brandsResponse.data.map(brand => brand.brand_name));
                    setCategories(categoriesResponse.data);
                }
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error.message);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setImagePreview(null);
        inputRef.current.value = null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', productData);
        setIsEdit(false);
    };

    return (
        <Modal>
            {isLoading && <Load />}
            <div className="flex justify-between mb-2">
                <p className="font-bold text-lg mb-2">View Product:</p>
                <button onClick={() => setModalState(false)} className="text-gray-400 hover:text-gray-700 duration-300">
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>
            <div className="relative">
                {!isLoading && brands && categories &&
                    <form
                        onSubmit={handleSubmit}
                        className="text-xs md:text-sm"
                    >
                        {!isEdit ?
                            <div className="overflow-y-auto flex flex-col gap-5">
                                <div className="flex flex-col md:grid md:grid-cols-4 gap-4">
                                    <div className="grid col-span-1 row-span-3">
                                        <label className="font-semibold">Product Image:</label>
                                        <div className="h-44 w-44 rounded-md bg-slate-50 border-2 overflow-hidden">
                                            {product_image_url ?
                                                <div className="h-full w-full">
                                                    <img src={product_image_url} alt="Product" className="h-full w-full object-cover" />
                                                </div>
                                                :
                                                <div className="h-full w-full flex flex-col justify-center items-center relative text-gray-400">
                                                    <i className="fa-solid fa-file-image"></i>
                                                    <span>No Image</span>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div className="grid col-span-3">
                                        <label className="font-semibold">Product Name:</label>
                                        <span>{product_name}</span>
                                    </div>
                                    <div className="grid col-span-3">
                                        <label className="font-semibold">Price:</label>
                                        <div>
                                            <span>{product_price ? `Php ${product_price.toFixed(2)}` : 'No price inputted'}</span>
                                        </div>
                                    </div>
                                    <div className="grid col-span-1">
                                        <label className="font-semibold">Brand:</label>
                                        <span>{product_brand}</span>
                                    </div>
                                    <div className="grid col-span-4">
                                        <label className="font-semibold">Product Description:</label>
                                        <textarea
                                            className="px-3 py-1 rounded-md outline-none resize-none h-20"
                                            name="product_description"
                                            readOnly
                                            value={product_description}
                                        />
                                    </div>
                                    <label className="grid col-span-4 font-semibold">Product Categories:</label>
                                    <div className="grid">
                                        <label className="font-semibold">Main Category:</label>
                                        <span>{product_main_category}</span>
                                    </div>
                                    <div className="grid">
                                        <label className="font-semibold">Sub Category 1:</label>
                                        <span>{product_sub_category_1}</span>
                                    </div>
                                    <div className="grid">
                                        <label className="font-semibold">Sub Category 2:</label>
                                        <span>{product_sub_category_2}</span>
                                    </div>
                                    <div className="grid">
                                        <label className="font-semibold">Sub Category 3:</label>
                                        <span>{product_sub_category_3}</span>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="max-h-96 overflow-y-auto flex flex-col gap-5">
                                <div className="flex flex-col md:grid md:grid-cols-4 gap-4">
                                    <div className="grid col-span-1 row-span-3">
                                        <label className="font-semibold">Product Image:</label>
                                        <div className="h-44 w-full rounded-md bg-slate-50 border-2 overflow-hidden">
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
                                                    <div className="w-full flex justify-end items-center absolute p-2 top-0 left-0">
                                                        <i className="fa-solid fa-xmark cursor-pointer text-gray-400 hover:text-blue-500 duration-300" onClick={handleRemoveImage}></i>
                                                    </div>
                                                    <div className="w-full flex absolute bottom-0 left-0">
                                                        <span className="bg-slate-200 hover:bg-blue-500 hover:bg-opacity-50 bg-opacity-50 cursor-pointer py-2 w-full text-center" onClick={() => inputRef.current.click()}>
                                                            Select other image
                                                        </span>
                                                    </div>
                                                    <img src={imagePreview} alt="Product" className="h-full w-full object-cover" />
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
                                            {brands.map((brand, index) => (
                                                <option key={index} value={brand}>{brand}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="grid col-span-4">
                                        <label className="font-semibold">Product Description:</label>
                                        <textarea
                                            className="px-3 py-1 rounded-md bg-slate-50 border-2 outline-blue-300"
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
                                            {categories.filter(category => category.category_type === 'main').map((category, index) => (
                                                <option key={index} value={category.product_category}>{category.product_category}</option>
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
                                            {categories.filter(category => category.category_type === 'sub').map((category, index) => (
                                                <option key={index} value={category.product_category}>{category.product_category}</option>
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
                                            {categories.filter(category => category.category_type === 'sub').map((category, index) => (
                                                <option key={index} value={category.product_category}>{category.product_category}</option>
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
                                            {categories.filter(category => category.category_type === 'sub').map((category, index) => (
                                                <option key={index} value={category.product_category}>{category.product_category}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        }
                        {!isEdit ?
                            <div className="w-full flex justify-end gap-2 mt-5">
                                <div
                                    type="button"
                                    className="py-1 px-3 bg-green-500 text-white text-xs md:text-sm rounded-full cursor-pointer"
                                    onClick={() => setIsEdit(true)}
                                >
                                    Edit
                                </div>
                            </div>
                            :
                            <div className="w-full flex justify-end gap-2 mt-5">
                                <button
                                    type="submit"
                                    className="py-1 px-3 bg-green-500 text-white text-xs md:text-sm rounded-full"
                                >
                                    Save
                                </button>
                                <div
                                    type="button"
                                    onClick={() => setIsEdit(false)}
                                    className="py-1 px-3 bg-red-500 text-white text-xs md:text-sm rounded-full cursor-pointer"
                                >
                                    Cancel
                                </div>
                            </div>
                        }
                    </form>
                }
            </div>
        </Modal>
    );
}

export default ViewProductModal;

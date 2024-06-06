import React, { useState, useEffect } from "react";
import supabase from "../../../../../../config/SupabaseClient";
import Load2 from "../../../../../loading/Load2";

function Dashboard() {
    const [boxes, setBoxes] = useState([
        { name: "Products", icon: <i className="fa-solid fa-boxes-stacked"></i>, amount: 0, text: "Total Products", backgroundColor: "#41B06E" },
        { name: "Orders", icon: <i className="fa-solid fa-cart-shopping"></i>, amount: 0, text: "Total Orders", backgroundColor: "#1679AB" },
    ]);

    const [brands, setBrands] = useState([]);
    const [mainCategoryCount, setMainCategoryCount] = useState(0);
    const [subCategoryCount, setSubCategoryCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchProductCount();
        fetchBrands();
        fetchCategories();
    }, []);

    const fetchProductCount = async () => {
        const { data, error, count } = await supabase
            .from('product')
            .select('id', { count: 'exact' });

        if (error) {
            console.error(error);
        } else {
            setBoxes((prevBoxes) => prevBoxes.map(box =>
                box.name === "Products" ? { ...box, amount: count } : box
            ));
        }
    };

    const fetchBrands = async () => {
        setIsLoading(true);
        try {
            const brandResponse = await supabase.from('brand').select();
            const productResponse = await supabase.from('product').select();

            if (brandResponse.error || productResponse.error) {
                console.error(brandResponse.error || productResponse.error);
            } else {
                const brandsWithCount = brandResponse.data.map((brand) => {
                    const productCount = productResponse.data.filter(product => product.product_brand === brand.brand_name).length;
                    return { ...brand, productCount };
                });

                setBrands(brandsWithCount);
            }
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error.message);
            setIsLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const { data, error } = await supabase.from('category').select();
            if (error) {
                console.error(error);
            } else {
                const mainCount = data.filter(category => category.category_type === 'main').length;
                const subCount = data.filter(category => category.category_type === 'sub').length;
                setMainCategoryCount(mainCount);
                setSubCategoryCount(subCount);
            }
        } catch (error) {
            console.error('Error fetching categories:', error.message);
        }
    };

    return (
        <div className="flex-1 flex flex-col gap-5 text-white mb-5">
            <h1 className="text-3xl text-black font-bold">Dashboard</h1>
            <div className="flex flex-col gap-5 p-4 bg-white rounded-lg shadow-md shadow-gray-400 relative overflow-hidden">
                <div className="flex flex-col md:flex-row gap-5">
                    {boxes.map((box, index) => (
                        <div
                            className="flex flex-col shadow-md shadow-gray-400 rounded-lg grow p-4"
                            style={{ backgroundColor: box.backgroundColor }}
                            key={index}>
                            <p className="text-lg font-bold">{box.icon} {box.name}:</p>
                            <p className="text-md w-full pt-4 flex justify-between font-semibold"><span>{box.text}</span><span>{box.amount}</span></p>
                        </div>
                    ))}
                </div>
                <div className="flex-1">
                    <p className="text-lg text-black font-bold pb-2"><i className="fa-solid fa-table"></i> Category</p>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col shadow-md shadow-gray-400 rounded-lg px-4 py-2 bg-[#6295A2]">
                            <p className="text-md font-medium flex justify-between"><span>Main Categories </span><span>{mainCategoryCount}</span></p>
                        </div>
                        <div className="flex flex-col shadow-md shadow-gray-400 rounded-lg px-4 py-2 bg-[#80B9AD]">
                            <p className="text-md font-medium flex justify-between"><span>Sub Categories </span><span>{subCategoryCount}</span></p>
                        </div>
                    </div>
                </div>
                <div className="flex-1 text-black">
                    <p className="text-lg text-black font-bold pb-2"><i className="fa-brands fa-dropbox"></i> Brands:</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 overflow-auto h-72 px-2">
                        {isLoading ? (
                            <Load2 />
                        ) : (
                            brands.map((brand, index) => (
                                <div
                                    className="bg-white rounded-lg shadow-md p-4"
                                    key={index}
                                >
                                    <p className="text-sm font-bold">{brand.brand_name}:</p>
                                    <p className="text-gray-600 text-xs w-full pt-2 flex justify-between font-medium"><span>Total Products:</span><span>{brand.productCount}</span></p>
                                </div>
                            ))
                        )}
                        {!isLoading && brands.length === 0 && (
                            <p className="text-gray-600">No brands found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

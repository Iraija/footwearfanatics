import React, { useState, useEffect } from "react";
import supabase from "../../../../../config/SupabaseClient";
import Load2 from "../../../../loading/Load2";
import AddCategoryModal from "./inventory_modals/AddCategoryModal";
import ConfirmationModal from "./inventory_modals/ConfirmationModal";

function CreateNewCategory() {
    const [categories, setCategories] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [categoryState, setCategoryState] = useState(true);
    const [modalState, setModalState] = useState(false);
    const [confirmationModalState, setConfirmationModalState] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [deleteError, setDeleteError] = useState(null);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const categoriesResponse = await supabase.from('category').select();

            if (categoriesResponse.error) {
                console.error(categoriesResponse.error);
            } else {
                setCategories(categoriesResponse.data);
            }
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error.message);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const [searchQuery, setSearchQuery] = useState(""); 

    const handleRemoveCategory = async () => {
        if (!categoryToDelete) return;

        setIsLoading(true);
        try {
            // Check if there are any products referencing this category
            const { data: products, error: productsError } = await supabase
                .from('product')
                .select()
                .or(`product_main_category.eq.${categoryToDelete.id}`);

            if (productsError) {
                console.error("Error checking products:", productsError.message);
                setDeleteError("Error checking products.");
                setConfirmationModalState(false);
            } else if (products.length > 0) {
                // Delete the products referencing this category
                const { error: deleteProductsError } = await supabase
                    .from('product')
                    .delete()
                    .or(`product_main_category.eq.${categoryToDelete.id}`);

                if (deleteProductsError) {
                    console.error("Error deleting products:", deleteProductsError.message);
                    setDeleteError("Error deleting products.");
                    setConfirmationModalState(false);
                }
            }

            // Proceed with deletion of the category
            const { data, error } = await supabase.from("category").delete().eq("id", categoryToDelete.id);

            if (error) {
                console.error("Error deleting category:", error.message);
                setDeleteError("Error deleting category.");
            } else {
                console.log("Category deleted successfully:", data);
                // Update categories after deletion
                setCategories(categories.filter((category) => category.id !== categoryToDelete.id));
                setCategoryToDelete(null);
                setConfirmationModalState(false);
                setDeleteError(null);
            }
        } catch (error) {
            console.error("Error deleting category:", error.message);
            setDeleteError("Error deleting category.");
        } finally {
            setIsLoading(false);
        }
    };

    const openConfirmationModal = (category) => {
        setCategoryToDelete(category);
        setConfirmationModalState(true);
    };

    const handleRefresh = async () => {
        await fetchData();
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md shadow-gray-400">
            <div className="text-sm md:text-base flex flex-col md:flex-row md:justify-between md:items-center pb-2">
                <p className="font-medium">Product Categories:</p>
                <div>
                    <span className="mr-1 md:mr-2 font-medium">Search</span>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search category..."
                        className="px-2 py-1 md:px-4 md:py-2 border-2 bg-slate-50 rounded-md outline-none text-xs md:text-sm"
                    />
                </div>
            </div>
            <div>
                <div className="w-full flex flex-row text-xs md:text-sm">
                    <button 
                        onClick={() => setCategoryState(true)}
                        disabled={categoryState}
                        className={`${categoryState ? 'rightside bg-[#41B06E]' : ''} rounded-t-lg relative`}
                    >
                        <p className={`${categoryState ? 'text-white' : 'hover:bg-[#41B06E]'} py-1 px-5 mx-1 my-1 duration-300 rounded-md hover:bg-opacity-25`}>Main</p>
                    </button>
                    <button 
                        onClick={() => setCategoryState(false)}
                        disabled={!categoryState}
                        className={`${categoryState ? '' : 'rightside leftside bg-[#41B06E]'} rounded-t-lg relative`}
                    >
                        <p className={`${categoryState ? 'hover:bg-[#41B06E]' : 'text-white'} py-1 px-5 mx-1 my-1 duration-300 rounded-md hover:bg-opacity-25`}>Sub</p>
                    </button>
                    <div className="flex justify-end gap-2 w-full">
                        <button onClick={() => setModalState((prevState) => !prevState)} className="py-1 px-3 my-1 duration-300 rounded-full text-white bg-green-500">
                            <span>Add Category </span><i className="fa-solid fa-plus"></i>
                        </button>
                        <button onClick={handleRefresh} className="text-gray-400 hover:text-blue-500 text-xs md:text-sm py-1 px-1">
                            <i className="fa-solid fa-rotate-right"></i>
                        </button>
                    </div>
                </div>
                <div className={`${categoryState ? '' : 'rounded-tl-lg'} flex flex-row px-2 py-4 w-full rounded-b-lg rounded-tr-lg bg-[#41B06E] gap-3 flex-wrap overflow-x-auto text-xs relative`}>
                    {isLoading && <Load2 />}
                    {categories && (
                        <div>
                            {categoryState ? (
                                <div className="flex gap-2">
                                    {categories.filter(category => category.category_type === 'main').map((category) => (
                                        <div key={category.id} className="py-2 px-4 rounded-full bg-white flex">
                                            <span>{category.product_category} </span>
                                            <button onClick={() => openConfirmationModal(category)} className="text-gray-400 hover:text-gray-700 duration-300">
                                                <i className="fa-solid fa-xmark"></i>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex gap-2">
                                    {categories.filter(category => category.category_type === 'sub').map((category) => (
                                        <div key={category.id} className="py-2 px-4 rounded-full bg-white flex">
                                            <span>{category.product_category} </span>
                                            <button onClick={() => openConfirmationModal(category)} className="text-gray-400 hover:text-gray-700 duration-300">
                                                <i className="fa-solid fa-xmark"></i>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            {modalState && <AddCategoryModal setModalState={setModalState} fetchData={fetchData} />}
            {confirmationModalState && (
                <ConfirmationModal
                    onConfirm={handleRemoveCategory}
                    onCancel={() => setConfirmationModalState(false)}
                    name={categoryToDelete?.product_category}
                />
            )}
            {deleteError && (
                <div className="text-red-500 text-center mt-2">{deleteError}</div>
            )}
        </div>
    );
}

export default CreateNewCategory;

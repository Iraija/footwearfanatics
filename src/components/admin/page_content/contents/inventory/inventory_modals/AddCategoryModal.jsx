import React, { useState } from "react";
import Modal from "../../../../../modal/Modal";
import supabase from "../../../../../../config/SupabaseClient";

function AddCategoryModal({ setModalState, fetchData }) {
    const [categoryName, setCategoryName] = useState("");
    const [catTypeState, setCatTypeState] = useState(true);

    const handleSave = async () => {
        try {
            const { data, error } = await supabase
                .from("category")
                .insert([
                    {
                        product_category: categoryName,
                        category_type: catTypeState ? "main" : "sub",
                        created_at: new Date().toISOString(),
                    },
                ]);
            if (error) {
                throw error;
            }
            console.log("Category added successfully:", data);
            // Optionally, you can close the modal after saving
            setModalState(false);
            // Refresh categories
            await fetchData();
        } catch (error) {
            console.error("Error adding category:", error.message);
        }
    };

    return (
        <Modal>
            <div className="flex justify-end mb-2">
                <button onClick={() => setModalState(prevState => !prevState)} className="text-gray-400 hover:text-gray-700 duration-300">
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>
            <div className="">
                <p className="font-bold mb-5">Add New Category:</p>
                <div className="text-xs md:text-sm flex gap-5">
                    <div className="flex flex-col">
                        <label htmlFor="">Category Name:</label>
                        <input
                            className="px-3 py-1 rounded-md bg-slate-50 border-2 outline-blue-300"
                            type="text"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Category Type:</label>
                        <div className="flex gap-1">
                            <button
                                onClick={() => setCatTypeState(true)}
                                className={`${catTypeState ? 'bg-blue-500 text-white' : 'hover:bg-blue-200'} px-3 py-1 rounded-full`}
                                disabled={catTypeState}
                            >
                                Main
                            </button>
                            <button
                                onClick={() => setCatTypeState(false)}
                                className={`${!catTypeState ? 'bg-blue-500 text-white' : 'hover:bg-blue-200'} px-3 py-1 rounded-full`}
                                disabled={!catTypeState}
                            >
                                Sub
                            </button>
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-end mt-5">
                    <button
                        className="py-1 px-3 bg-green-500 text-white text-xs md:text-sm rounded-full"
                        onClick={handleSave}
                    >Save</button>
                </div>
            </div>
        </Modal>
    );
}

export default AddCategoryModal;

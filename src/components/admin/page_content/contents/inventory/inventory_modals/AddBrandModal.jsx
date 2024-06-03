import React, { useState } from "react";
import Modal from "../../../../../modal/Modal";
import supabase from "../../../../../../config/SupabaseClient";

function AddBrandModal({ setModalState, fetchData }) {
    const [newBrand, setNewBrand] = useState({ name: "", description: "" });
    const [error, setError] = useState(null);

    const handleAddBrand = async () => {
        if (!newBrand.name) {
            setError("Brand name is required");
            return;
        }

        try {
            const { data, error } = await supabase
                .from("brand")
                .insert([
                    {
                        brand_name: newBrand.name,
                        brand_description: newBrand.description,
                        created_at: new Date().toISOString(),
                    },
                ]);
            if (error) {
                throw error;
            }
            console.log("Brand added successfully:", data);
            setNewBrand({ name: "", description: "" }); // Clear inputs after adding
            setModalState(false); // Close modal after adding
            await fetchData(); // Refresh brand list
        } catch (error) {
            console.error("Error adding brand:", error.message);
        } finally {
        }
    };

    return (
        <Modal>
            <div className="flex justify-end mb-2">
                <button
                    onClick={() => setModalState(false)}
                    className="text-gray-400 hover:text-gray-700 duration-300"
                >
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>
            <div>
                <p className="font-bold mb-5">Add New Brand:</p>
                {error && <p className="text-red-500 text-xs mb-2">{error}</p>}
                <div className="text-xs md:text-sm flex gap-5">
                    <div className="flex flex-col">
                        <label htmlFor="">Brand Name:</label>
                        <input
                            className="px-3 py-1 rounded-md bg-slate-50 border-2 outline-blue-300"
                            type="text"
                            value={newBrand.name}
                            onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="">Brand Description:</label>
                        <textarea
                            className="px-3 py-1 rounded-md bg-slate-50 border-2 outline-blue-300"
                            value={newBrand.description}
                            onChange={(e) => setNewBrand({ ...newBrand, description: e.target.value })}
                        ></textarea>
                    </div>
                </div>
                <div className="w-full flex justify-end mt-5 gap-2">
                    <button
                        className="py-1 px-3 bg-green-500 text-white text-xs md:text-sm rounded-full"
                        onClick={handleAddBrand}
                    >
                        Save
                    </button>
                    <button
                        className="py-1 px-3 bg-gray-300 text-black text-xs md:text-sm rounded-full"
                        onClick={() => setModalState(false)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default AddBrandModal;

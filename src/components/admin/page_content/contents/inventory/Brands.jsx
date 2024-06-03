import React, { useState, useEffect } from "react";
import supabase from "../../../../../config/SupabaseClient";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddBrandModal from "./inventory_modals/AddBrandModal";
import ConfirmationModal from "./inventory_modals/ConfirmationModal";
import Load2 from "../../../../loading/Load2";

function Brands() {
    const [brands, setBrands] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [modalState, setModalState] = useState(false);
    const [confirmationModalState, setConfirmationModalState] = useState(false);
    const [brandToDelete, setBrandToDelete] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const brandResponse = await supabase.from('brand').select();

            if (brandResponse.error) {
                console.error(brandResponse.error);
            } else {
                setBrands(brandResponse.data || []);
            }
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error.message);
            setIsLoading(false);
        }
    };

    const handleRemoveBrand = async () => {
        if (!brandToDelete) return;

        setIsLoading(true);
        try {
            const { error } = await supabase.from('brand').delete().eq('id', brandToDelete.id);
            if (error) {
                throw error;
            }
            setBrands(brands.filter((brand) => brand.id !== brandToDelete.id));
            setBrandToDelete(null);
            setConfirmationModalState(false);
            toast.success("Brand deleted successfully");
        } catch (error) {
            console.error('Error deleting brand:', error.message);
            toast.error("Error deleting brand");
        } finally {
            setIsLoading(false);
        }
    };

    const handleRefresh = async () => {
        fetchData();
    };
    

    const filteredBrands = brands.filter((brand) =>
        brand && brand.brand_name && brand.brand_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const openConfirmationModal = (brand) => {
        setBrandToDelete(brand);
        setConfirmationModalState(true);
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md shadow-gray-400">
            <div className="text-sm md:text-base flex flex-col md:flex-row md:justify-between md:items-center pb-2">
                <p className="font-medium">Brands:</p>
                <div>
                    <span className="mr-1 md:mr-2 font-medium">Search</span>
                    <input
                        type="text"
                        placeholder="Search brands..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-2 py-1 md:px-4 md:py-2 bg-slate-50 border-2 rounded-md outline-none text-xs md:text-sm"
                    />
                </div>
            </div>
            <div className="flex justify-between">
                <button
                    onClick={() => setModalState(true)}
                    className="py-1 px-3 bg-green-500 text-white text-xs md:text-sm rounded-full mt-3"
                >
                    Add Brand
                </button>
                <button onClick={handleRefresh} className="text-gray-400 hover:text-blue-500 text-xs md:text-sm py-1 px-1">
                    <i className="fa-solid fa-rotate-right"></i>
                </button>
            </div>
            <div className=" overflow-auto h-40 relative">
                {isLoading && <Load2 />}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-2">
                    {filteredBrands.map((brand) => (
                        <div key={brand.id} className="bg-white rounded-lg shadow-md p-4 text-xs">
                            <div className="flex justify-between">
                                <h3 className="text-sm font-semibold">{brand.brand_name}</h3>
                                <button onClick={() => openConfirmationModal(brand)} className="text-gray-400 hover:text-gray-700 duration-300">
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                    {!isLoading && 
                        <div className="flex justify-center items-center">
                            {filteredBrands.length === 0 && (
                                <p className="text-gray-600">No brands found.</p>
                            )}
                        </div>
                    }
                </div>
            </div>
            {modalState && <AddBrandModal setModalState={setModalState} brands={brands} setBrands={setBrands} fetchData={fetchData} />}
            {confirmationModalState && (
                <ConfirmationModal
                    onConfirm={handleRemoveBrand}
                    onCancel={() => setConfirmationModalState(false)}
                    name={brandToDelete.brand_name}
                />
            )}
            <ToastContainer />
        </div>
    );
}

export default Brands;

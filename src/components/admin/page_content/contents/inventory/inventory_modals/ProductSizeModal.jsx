import React, { useEffect, useState } from "react";
import Modal from "../../../../../modal/Modal";
import supabase from "../../../../../../config/SupabaseClient";
import CouldNotFetch from "../../../../../modal/modal_contents/CouldNotFetch";
import Load from "../../../../../loading/Load";
import Load2 from "../../../../../loading/Load2";

function ProductSizeModal({ product, setModalState }) {
    const [fetchError, setFetchError] = useState(null);
    const [sizes, setSizes] = useState(null);
    const [productSizeQuantity, setProductSizeQuantity] = useState(null);
    const [filteredSizes, setFilteredSizes] = useState(null);
    const [load, setLoad] = useState(false);
    const [load2, setLoad2] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [sizeData, setSizeData] = useState({});

    const sizesInputs = [
        {name: "size_1"},
        {name: "size_2"},
        {name: "size_3"},
        {name: "size_4"},
        {name: "size_5"},
        {name: "size_6"},
        {name: "size_7"},
        {name: "size_8"},
        {name: "size_9"},
        {name: "size_10"},
        {name: "size_11"},
        {name: "size_12"},
        {name: "size_13"},
        {name: "size_14"},
        {name: "size_15"},
        {name: "size_16"},
        {name: "size_17"},
        {name: "size_18"},
        {name: "size_19"},
        {name: "size_20"},
    ];

    const tableHeader = [
        { name: "US" },
        { name: "UK" },
        { name: "EU" },
        { name: "CM" },
    ];

    useEffect(() => {
        const fetchData = async () => {
            setLoad(true);

            try {
                const sizeQuantityResponse = await supabase.from('product_size_quantity').select();
                const sizesResponse = await supabase.from('sizes').select();

                if (sizeQuantityResponse.error || sizesResponse.error) {
                    setLoad(false);
                    throw new Error('Could not fetch data');
                }

                setProductSizeQuantity(sizeQuantityResponse.data);
                setSizes(sizesResponse.data);
                setFetchError(null);
                setLoad(false);
            } catch (error) {
                setFetchError('Could not fetch data');
                setProductSizeQuantity(null);
                setSizes(null);
                setLoad(false);
                console.error(error.message);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (product && productSizeQuantity) {
            const filtered = productSizeQuantity.filter(sizeItem => sizeItem.product_id === product.id);
            setFilteredSizes(filtered);

            const initialSizeData = {};
            sizesInputs.forEach(size => {
                const foundSize = filtered.find(item => item[size.name] !== undefined);
                initialSizeData[size.name] = foundSize ? foundSize[size.name] : 0;
            });
            setSizeData(initialSizeData);
        }
    }, [product, productSizeQuantity]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSizeData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEdit = () => {
        setIsEditable(true);
    };

    const handleSave = async () => {
        try {
            setLoad2(true); // Set loading state
    
            // Check if product ID exists in productSizeQuantity
            const existingProductSize = productSizeQuantity.find(item => item.product_id === product.id);
            if (existingProductSize) {
                // Update existing sizes
                const updateSizeQuantity = sizesInputs.reduce((acc, size) => {
                    acc[size.name] = sizeData[size.name] || 0; // Use sizeData values if present, otherwise default to 0
                    return acc;
                }, {});
    
                // Update the existing product size quantity in the database
                await supabase
                    .from('product_size_quantity')
                    .update(updateSizeQuantity)
                    .eq('product_id', product.id);
    
                setFetchError(null);
            } else {
                // Insert new size quantity for the product
                const newSizeQuantity = {
                    product_id: product.id,
                    ...sizesInputs.reduce((acc, size) => {
                        acc[size.name] = sizeData[size.name] || 0; // Use sizeData values if present, otherwise default to 0
                        return acc;
                    }, {})
                };
    
                // Insert the new product size quantity into the database
                const { error } = await supabase.from('product_size_quantity').insert(newSizeQuantity);
    
                if (error) {
                    throw new Error('Failed to insert new size quantity.');
                }
    
                setFetchError(null);
            }
    
            setIsEditable(false); // Disable editing mode
        } catch (error) {
            setFetchError('Error saving data.');
            console.error(error.message);
        } finally {
            setLoad2(false); // Set loading state to false
        }
    };
    

    const handleCancel = () => {
        setIsEditable(false);
        setSizeData({}); // Clear sizeData on cancel
    };

    return (
        <Modal>
            <div className="flex justify-end mb-2">
                <button onClick={() => setModalState(prevState => !prevState)} className="text-gray-400 hover:text-gray-700 duration-300">
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>
            {load && <Load />}
            {load2 && <Load2 />}
            {fetchError && <CouldNotFetch setModalState={setModalState} />}
            {filteredSizes && sizes && sizeData && sizesInputs && (
                <div className="text-xs md:text-sm">
                    <p className="font-bold text-base">{product.product_name}</p>
                    <p className="font-semibold mb-2">Shoe Sizes</p>
                    <div className="h-96 overflow-y-auto">
                        <div className="flex items-start">
                            <div className="flex flex-col divide-y divide-x divide-gray-200">
                                <span className="px-4 py-2 whitespace-nowrap text-gray-500 bg-gray-100">Size Quantity</span>
                                {sizesInputs.map((size, id) => (
                                    <input 
                                        key={id}
                                        className="px-4 py-2 md:px-6 w-40 whitespace-nowrap text-gray-500 bg-slate-50"
                                        type="number"
                                        disabled={!isEditable} // Disable when not editable
                                        name={size.name}
                                        value={sizeData[size.name]}
                                        onChange={handleChange}
                                    />
                                ))}
                            </div>
                            <table className="divide-y divide-gray-200">
                                <thead className="sticky top-0">
                                    <tr className="bg-gray-50">
                                        {tableHeader.map((th, index) => (
                                            <td key={index} scope="col" className="px-4 py-2 md:px-6 whitespace-nowrap text-gray-500">{th.name}</td>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {sizes.map((size) => (
                                        <tr key={size.id}>
                                            <td className="px-4 py-2 md:px-6 whitespace-nowrap text-gray-500">{size.US}</td>
                                            <td className="px-4 py-2 md:px-6 whitespace-nowrap text-gray-500">{size.UK}</td>
                                            <td className="px-4 py-2 md:px-6 whitespace-nowrap text-gray-500">{size.EU}</td>
                                            <td className="px-4 py-2 md:px-6 whitespace-nowrap text-gray-500">{size.CM}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="w-full flex justify-end mt-3">
                        {!isEditable && (
                            <button
                                className="py-1 px-3 bg-green-500 text-white text-xs md:text-sm rounded-full"
                                onClick={handleEdit}
                            >Edit</button>
                        )}
                        {isEditable && (
                            <div className="flex gap-2">
                                <button
                                    className="py-1 px-3 bg-green-500 text-white text-xs md:text-sm rounded-full"
                                    onClick={handleSave}
                                >Save</button>
                                <button
                                    className="py-1 px-3 bg-gray-500 text-white text-xs md:text-sm rounded-full"
                                    onClick={handleCancel}
                                >Cancel</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </Modal>
    );
}

export default ProductSizeModal;

import React from "react";

function Brands() {
    const brands = [
        { name: "Nike", products: 120, varieties: 40 },
        { name: "Adidas", products: 90, varieties: 30 },
        { name: "Puma", products: 80, varieties: 25 },
        { name: "Reebok", products: 70, varieties: 20 },
        // Add more brands as needed
    ];

    return (
        <div>
            <p className="font-medium pb-2">Brands:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {brands.map((brand, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-4">
                        <h3 className="text-lg font-semibold">{brand.name}</h3>
                        <p className="text-gray-600">Products: {brand.products}</p>
                        <p className="text-gray-600">Varieties: {brand.varieties}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Brands;

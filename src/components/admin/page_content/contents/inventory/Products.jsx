import React from "react";

function Product() {
    const products = [
        { id: 1, name: "Running Shoes", brand: "Nike", categories: [{ category: "Sports" }, { category: "Running" }], sizes: ["7", "8", "9", "10"] },
        { id: 2, name: "Casual Boots", brand: "Timberland", categories: [{ category: "Casual" }, { category: "Boots" }], sizes: ["8", "9", "10", "11"] },
        { id: 3, name: "Dress Shoes", brand: "Clarks", categories: [{ category: "Formal" }, { category: "Shoes" }], sizes: ["7", "8", "9"] },
        // Add more products here
        { id: 4, name: "Sports Sandals", brand: "Adidas", categories: [{ category: "Sports" }, { category: "Sandals" }], sizes: ["7", "8", "9", "10"] },
        { id: 5, name: "Hiking Boots", brand: "Columbia", categories: [{ category: "Outdoor" }, { category: "Boots" }], sizes: ["8", "9", "10", "11"] },
        { id: 6, name: "Canvas Sneakers", brand: "Vans", categories: [{ category: "Casual" }, { category: "Sneakers" }], sizes: ["7", "8", "9"] },
        { id: 7, name: "Formal Oxfords", brand: "Cole Haan", categories: [{ category: "Formal" }, { category: "Shoes" }], sizes: ["7", "8", "9"] },
        { id: 8, name: "Running Shorts", brand: "Under Armour", categories: [{ category: "Sports" }, { category: "Clothing" }], sizes: ["S", "M", "L"] },
        { id: 9, name: "Tennis Racquet", brand: "Wilson", categories: [{ category: "Sports" }, { category: "Equipment" }], sizes: [] },
        { id: 10, name: "Yoga Mat", brand: "Liforme", categories: [{ category: "Fitness" }, { category: "Equipment" }], sizes: [] },
        // Add more products as needed
        { id: 11, name: "Football Cleats", brand: "Nike", categories: [{ category: "Sports" }, { category: "Football" }], sizes: ["8", "9", "10", "11"] },
        { id: 12, name: "Basketball Shoes", brand: "Jordan", categories: [{ category: "Sports" }, { category: "Basketball" }], sizes: ["7", "8", "9", "10"] },
        { id: 13, name: "Golf Clubs Set", brand: "Callaway", categories: [{ category: "Sports" }, { category: "Golf" }], sizes: [] },
        { id: 14, name: "Swimming Goggles", brand: "Speedo", categories: [{ category: "Sports" }, { category: "Swimming" }], sizes: [] },
        { id: 15, name: "Cycling Helmet", brand: "Giro", categories: [{ category: "Sports" }, { category: "Cycling" }], sizes: [] },
        { id: 16, name: "Baseball Glove", brand: "Rawlings", categories: [{ category: "Sports" }, { category: "Baseball" }], sizes: [] },
        { id: 17, name: "Snowboard", brand: "Burton", categories: [{ category: "Sports" }, { category: "Snowboarding" }], sizes: [] },
        { id: 18, name: "Hockey Stick", brand: "Bauer", categories: [{ category: "Sports" }, { category: "Hockey" }], sizes: [] },
        { id: 19, name: "Tennis Shoes", brand: "Asics", categories: [{ category: "Sports" }, { category: "Tennis" }], sizes: ["7", "8", "9", "10"] },
        { id: 20, name: "Gym Bag", brand: "Nike", categories: [{ category: "Fitness" }, { category: "Accessories" }], sizes: [] },
        // Add more products as needed
    ];

    return (
        <div>
            <p className="font-medium pb-2">Products:</p>
            <div className="overflow-auto max-h-96">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 sticky top-0">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categories</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sizes Available</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-100">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.brand}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex gap-2">
                                    {product.categories.map((category, index) => (
                                        <span key={index} className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-800">{category.category}</span>
                                    ))}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 mr-3">
                                    {product.sizes.map((size) => (
                                        <span key={size} className="inline-block py-1 text-sm font-semibold text-gray-800">| {size} |</span>
                                    ))}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Product;

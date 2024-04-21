import React, { useState } from "react";

function CreateNewCategory() {
    const initialDisplayCount = 10;
    const [displayCount, setDisplayCount] = useState(initialDisplayCount);
    const [categories, setCategories] = useState([
        { id: 1, category: "nike" },
        { id: 2, category: "running shoes" },
        { id: 3, category: "adidas" },
        { id: 4, category: "casual shoes" },
        { id: 5, category: "sports shoes" },
        { id: 6, category: "boots" },
        { id: 7, category: "sandals" },
        { id: 8, category: "heels" },
        { id: 9, category: "slippers" },
        { id: 10, category: "formal shoes" },
        { id: 11, category: "sneakers" },
        { id: 12, category: "loafers" },
        { id: 13, category: "flip flops" },
        { id: 14, category: "wedges" },
        { id: 15, category: "mules" },
        { id: 16, category: "oxfords" },
        { id: 17, category: "clogs" },
        { id: 18, category: "espadrilles" },
        { id: 19, category: "platform shoes" },
        { id: 20, category: "mary janes" },
        { id: 21, category: "boat shoes" },
        { id: 22, category: "derby shoes" },
        { id: 23, category: "monk strap shoes" },
        { id: 24, category: "chelsea boots" },
        { id: 25, category: "slip-on shoes" },
        { id: 26, category: "workout shoes" },
        { id: 27, category: "hiking boots" },
        { id: 28, category: "formal heels" },
        { id: 29, category: "canvas shoes" },
        { id: 30, category: "winter boots" },
        // Add more categories as needed
    ]);
    const [newCategory, setNewCategory] = useState("");

    const handleShowMore = () => {
        setDisplayCount(categories.length);
    };

    const handleShowLess = () => {
        setDisplayCount(initialDisplayCount);
    };

    const handleAddCategory = () => {
        if (newCategory.trim() !== "") {
            setCategories([...categories, { id: Date.now(), category: newCategory }]);
            setNewCategory("");
        }
    };

    const handleRemoveCategory = (id) => {
        const updatedCategories = categories.filter((cat) => cat.id !== id);
        setCategories(updatedCategories);
    };

    return (
        <div>
            <p className="font-medium pb-2">Product Categories:</p>
            <div className="flex flex-row px-2 py-4 w-full border-y-2 border-gray-300 bg-primary gap-3 flex-wrap max-h-60 overflow-y-auto">
                {categories.slice(0, displayCount).map((category, index) => (
                    <div
                        className="flex justify-center gap-2 items-center bg-white shadow-sm shadow-gray-400 rounded-full px-4 py-2 cursor-pointer"
                        key={category.id}
                    >
                        <p className="text-sm font-bold">{category.category}</p>
                        <button
                            className="hover:bg-gray-400 hover:text-white rounded-full px-2"
                            onClick={() => handleRemoveCategory(category.id)}
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                ))}
                <div className="flex justify-center gap-2 items-center bg-white shadow-sm shadow-gray-400 rounded-full px-4 py-2">
                    <input
                        required
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="Add New Category"
                        className="border-none outline-none text-sm flex-1"
                    />
                    <button onClick={handleAddCategory} className="bg-green-500 text-sm text-white px-2 rounded-full hover:bg-green-600">
                        Save
                    </button>
                </div>
            </div>
            {displayCount !== categories.length ? (
                <button onClick={handleShowMore} className="text-sm text-blue-500 underline mt-2">Show More</button>
            ) : (
                <button onClick={handleShowLess} className="text-sm text-blue-500 underline mt-2">Show Less</button>
            )}
        </div>
    );
}

export default CreateNewCategory;

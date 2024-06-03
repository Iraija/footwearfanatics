import React from "react"

function Dashboard() {
    
    const boxes = [
        {name: "Customers", icon: <i className="fa-solid fa-people-group"></i>, amount: 0, text: "Total Customers", backgroundColor: "#41B06E"},
        {name: "Orders", icon: <i className="fa-solid fa-cart-shopping"></i>, amount: 0, text: "Total Orders", backgroundColor: "#1679AB"},
    ];

    const inventory = [
        {name: "Nike", totalAmount: 0, variety: 0},
        {name: "Adidas", totalAmount: 0, variety: 0},
        {name: "World Balance", totalAmount: 0, variety: 0},
        {name: "New Balance", totalAmount: 0, variety: 0},
        {name: "Mizuno", totalAmount: 0, variety: 0},
        {name: "No Brand", totalAmount: 0, variety: 0},
        {name: "No Brand", totalAmount: 0, variety: 0},
        {name: "No Brand", totalAmount: 0, variety: 0},
        {name: "No Brand", totalAmount: 0, variety: 0},
        {name: "No Brand", totalAmount: 0, variety: 0}
    ];

    return (
        <div className="flex-1 flex flex-col gap-5 text-white mb-5">
            <h1 className="text-3xl text-black font-bold">Dashboard</h1>
            <div className="flex flex-col gap-5 p-4 bg-white rounded-lg shadow-md shadow-gray-400">
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
                    <p className="text-xl text-black font-bold pb-2"><i className="fa-solid fa-box"></i> Inventory</p>
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col shadow-md shadow-gray-400 rounded-lg p-4 bg-[#F6B17A]">
                            <p className="text-md font-semibold flex justify-between"><span>Total Amount of Products: </span><span>0</span></p>
                        </div>
                        <div className="flex-1 text-black">
                            <p className="font-semibold pb-2">Brands:</p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 overflow-auto max-h-96 px-2">
                                {inventory.map((brand, index) => (
                                    <div
                                        className="bg-white rounded-lg shadow-md p-4"
                                        key={index}
                                    >
                                        <p className="text-sm font-bold">{brand.name}:</p>
                                        <p className="text-gray-600 text-xs w-full pt-2 flex justify-between font-medium"><span>Total Products:</span><span>{brand.totalAmount}</span></p>
                                        <p className="text-gray-600 text-xs w-full pt-2 flex justify-between font-medium"><span>Variety:</span><span>{brand.variety}</span></p>
                                    </div>
                                ))}
                            </div>
                        </div>  
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Dashboard;

import React from "react";

function Orders() {
    const orders = [
        { id: 1, name: "John Doe", product: "Running Shoes", size: "8", quantity: 2, address: "123 Street, City, Country", dateTime: "2024-04-20T10:30:00", status: "Received" },
        { id: 2, name: "Jane Smith", product: "Casual Boots", size: "9", quantity: 1, address: "456 Avenue, Town, Country", dateTime: "2024-04-21T15:45:00", status: "Ongoing" },
        // Add more order data as needed
    ];

    const formatDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        return `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`;
    };

    return (
        <div className="flex-1 mb-5">
            <h1 className="text-3xl text-black font-bold mb-4">Orders</h1>
            <div className="p-4 bg-white rounded-lg shadow-md shadow-gray-400">
                <div className="overflow-auto max-h-96">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Ordered</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-100">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.product}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.size}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.quantity}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.address}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDateTime(order.dateTime)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Orders;

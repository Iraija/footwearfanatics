import React from "react";

function Customers() {
    const customers = [
        { id: 1, name: "John Doe", email: "johndoe@example.com", address: "123 Street, City, Country", orders: 5, cart: 2, cancel: 0 },
        { id: 2, name: "Jane Smith", email: "janesmith@example.com", address: "456 Avenue, Town, Country", orders: 10, cart: 1, cancel: 0 },
        // Add more customer data as needed
    ];

    const tableHeader = [
        {name: "Name"},
        {name: "Email"},
        {name: "Address"},
        {name: "Orders"},
        {name: "Cart"},
        {name: "Cancel Orders"}
    ];

    return (
        <div className="flex-1 flex flex-col gap-5 mb-5">
            <h1 className="text-3xl text-black font-bold">Customers</h1>
            <div className="p-4 bg-white rounded-lg shadow-md shadow-gray-400">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 text-xs">
                        <thead className="bg-gray-50">
                            <tr>
                                {tableHeader.map((th, index) => (
                                    <th key={index} scope="col" className="px-4 py-1 md:px-6 md:py-3 text-left font-medium text-gray-500 uppercase tracking-wider">{th.name}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {customers.map((customer) => (
                                <tr key={customer.id} className="hover:bg-gray-100">
                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{customer.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{customer.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{customer.address}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{customer.orders}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{customer.cart}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{customer.cancel}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Customers;

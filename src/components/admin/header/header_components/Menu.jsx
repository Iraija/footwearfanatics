import React from "react"

function Menu() {

    const menu = [
        { name: "Dashboard", icon: <i class="fa-solid fa-gauge"></i>, navigate: ""},
        { name: "Inventory", icon: <i class="fa-solid fa-box"></i>, navigate: ""},
        { name: "Customers", icon: <i class="fa-solid fa-people-group"></i>, navigate: ""},
        { name: "Orders", icon: <i class="fa-solid fa-cart-shopping"></i>, navigate: ""}
    ];

    return (
        <>
            <ul className="flex gap-10">
                {menu.map((menu, index) => (
                    <li key={index}>
                        <button 
                        className="flex items-center gap-3 hover:opacity-50 duration-300">
                            {menu.icon} {menu.name}
                        </button>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Menu;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../../../modal/SideBar";

function SideBarMenu({ setSidebarState }) {
    const navigate = useNavigate();

    const menu = [
        { name: "Dashboard", icon: <i className="fa-solid fa-gauge"></i>, navigate: "/" },
        { name: "Inventory", icon: <i className="fa-solid fa-box"></i>, navigate: "/inventory" },
        { name: "Customers", icon: <i className="fa-solid fa-people-group"></i>, navigate: "/customers" },
        { name: "Orders", icon: <i className="fa-solid fa-cart-shopping"></i>, navigate: "/orders" }
    ];

    const buttons = [
        { name: "Settings", icon: <i className="fa-solid fa-gear"></i> },
        { name: "Log out", icon: <i className="fa-solid fa-right-from-bracket"></i> },
    ];

    const handleButtonClick = (index) => {
        navigate(menu[index].navigate);
    };

    return (
        <>
            <SideBar>
                <button onClick={()=> setSidebarState((prevState) => !prevState)}
                    className="flex justify-end items-center hover:opacity-75 duration-300 w-full"
                >
                    <i className="fa-solid fa-xmark"></i>
                </button>
                <div className="h-full flex flex-col justify-between">
                    <ul className="flex flex-col">
                        {menu.map((menuItem, index) => (
                            <li key={index}>
                                <button
                                    className="flex items-center hover:opacity-75 duration-300 gap-3 py-3"
                                    onClick={() => handleButtonClick(index)}
                                >
                                    <span className="w-5">{menuItem.icon}</span>{menuItem.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div>
                        {buttons.map((button, index) =>(
                            <button key={index} 
                                className="flex items-center hover:opacity-75 duration-300 gap-3 py-3"
                            >
                                <span className="w-5">{button.icon}</span><span>{button.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </SideBar>
        </>
    );
}

export default SideBarMenu;

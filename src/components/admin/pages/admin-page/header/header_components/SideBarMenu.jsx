import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../../../../../modal/SideBar";

function SideBarMenu({ setSidebarState, signOut, adminDetails }) {
    const navigate = useNavigate();

    const menu = [
        { name: "Dashboard", icon: <i className="fa-solid fa-gauge"></i>, navigate: "/" },
        { name: "Inventory", icon: <i className="fa-solid fa-box"></i>, navigate: "/inventory" },
        { name: "Customers", icon: <i className="fa-solid fa-people-group"></i>, navigate: "/customers" },
        { name: "Orders", icon: <i className="fa-solid fa-cart-shopping"></i>, navigate: "/orders" }
    ];

    const handleButtonClick = (index) => {
        navigate(menu[index].navigate);
        setSidebarState(false);
    };

    return (
        <>
            <SideBar>
                <button onClick={()=> setSidebarState((prevState) => !prevState)}
                    className="flex justify-end items-center hover:opacity-75 duration-300 w-full"
                >
                    <i className="fa-solid fa-xmark"></i>
                </button>
                <div className="flex flex-col items-center py-5">
                    <div className="rounded-full w-20 h-20 bg-gray-400 overflow-hidden border-[1.5px]">
                        {adminDetails &&
                            <img src={adminDetails.admin_profile_pic} alt="profile" className="h-full w-full object-cover" />
                        }
                    </div>
                    { adminDetails && 
                        <span className="font-bold text-md">
                            {adminDetails.admin_first_name} {adminDetails.admin_last_name}
                        </span>
                    }
                    <p className="px-4 text-[.50rem] font-medium">{adminDetails.admin_email_account}</p>
                </div>
                <div className="border-y-[1px] mb-5 text-sm">
                    <button
                        onClick={() => signOut()}
                        className="flex items-center hover:opacity-75 duration-300 gap-3 py-3"
                    >
                        <span className="w-5"><i className="fa-solid fa-right-from-bracket"></i></span><span>Sign out</span>
                    </button>
                </div>
                <div className="h-full flex flex-col text-sm">
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
                </div>
            </SideBar>
        </>
    );
}

export default SideBarMenu;

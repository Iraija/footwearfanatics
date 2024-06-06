import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navigation() {
    const navigate = useNavigate();

    const [menuState, setMenuState] = useState([
        { name: "Dashboard", icon: <i className="fa-solid fa-gauge"></i>, navigate: "/", state: true },
        { name: "Inventory", icon: <i className="fa-solid fa-box"></i>, navigate: "/inventory", state: false },
        { name: "Customers", icon: <i className="fa-solid fa-people-group"></i>, navigate: "/customers", state: false },
        { name: "Orders", icon: <i className="fa-solid fa-cart-shopping"></i>, navigate: "/orders", state: false }
    ]);

    const handleButtonClick = (index) => {
        const updatedMenuState = menuState.map((item, i) =>
            i === index ? { ...item, state: true } : { ...item, state: false }
        );
        setMenuState(updatedMenuState);
        navigate(menuState[index].navigate);
    };

    return (
        <>
            <ul className="hidden sm:flex gap-10">
                {menuState.map((menuItem, index) => (
                    <li key={index}>
                        <button
                            className="flex items-center hover:opacity-75 duration-300 gap-3"
                            onClick={() => handleButtonClick(index)}
                        >
                            {menuItem.icon} {menuItem.name}
                        </button>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Navigation;

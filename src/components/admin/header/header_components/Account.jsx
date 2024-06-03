import React, { useState, useEffect, useRef } from "react";
import DropDownModal from "../../../modal/DropDownModal";

function Account() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const buttons = [
        { name: "Log out", icon: <i className="fa-solid fa-right-from-bracket"></i> },
        { name: "Settings", icon: <i className="fa-solid fa-gear"></i> },
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    const handleItemClick = () => {
        setIsOpen(false);
    };

    return (
        <div className="relative hidden md:flex justify-end">
            <button onClick={toggleDropdown} className="flex items-end -space-x-2">
                <div className="rounded-full w-10 h-10 bg-gray-400"></div>
                <div className="h-4 w-4 flex justify-center rounded-full ring-4 ring-secondary bg-primary text-sm text-secondary">
                    <i className="fa-solid fa-sort-down"></i>
                </div>
            </button>
            {isOpen && (
                <div className="flex justify-end" ref={dropdownRef}>
                    <DropDownModal>
                        {buttons.map((button, index) => (
                            <button
                                key={index}
                                className="flex items-center justify-between w-32 px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:outline-none"
                                onClick={() => {
                                    console.log(`Clicked: ${button.name}`);
                                    handleItemClick(); // Close the dropdown
                                }}
                            >
                                <span>{button.name}</span><span>{button.icon}</span>
                            </button>
                        ))}
                    </DropDownModal>
                </div>
            )}
        </div>
    );
}

export default Account;

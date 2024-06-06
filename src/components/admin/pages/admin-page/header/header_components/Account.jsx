import React, { useState, useEffect, useRef } from "react";
import DropDownModal from "./../../../../../modal/DropDownModal";
import supabase from "../../../../../../config/SupabaseClient";

function Account({ user, signOut, adminDetails }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

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

    const handleLogout = () => {
        signOut();
        setIsOpen(false);
    };

    return (
        <div className="relative hidden md:flex justify-end items-center">
            <button onClick={toggleDropdown} className="flex items-end -space-x-2">
                <div className="rounded-full w-10 h-10 bg-gray-400 overflow-hidden">
                    {adminDetails &&
                        <img src={adminDetails.admin_profile_pic} alt="profile" className="h-full w-full object-cover" />
                    }
                </div>
                <div className="h-4 w-4 flex justify-center rounded-full ring-4 ring-secondary bg-primary text-sm text-secondary">
                    <i className="fa-solid fa-sort-down"></i>
                </div>
            </button>
            {isOpen && (
                <div className="flex justify-end" ref={dropdownRef}>
                    <DropDownModal>
                            <div className="text-gray-800 w-80 pb-3">
                                <div className="border-b-[1px] flex flex-col items-center py-5">
                                    <div className="rounded-full w-20 h-20 bg-gray-400 overflow-hidden border-[1.5px]">
                                        {adminDetails &&
                                            <img src={adminDetails.admin_profile_pic} alt="profile" className="h-full w-full object-cover" />
                                        }
                                    </div>
                                    { adminDetails && 
                                        <span className="font-bold text-xl">
                                            {adminDetails.admin_first_name} {adminDetails.admin_last_name}
                                        </span>
                                    }
                                    <p className="px-4 text-xs font-medium">{adminDetails.admin_email_account}</p>
                                </div>
                                <button
                                    className="flex items-center gap-2 px-4 py-2 text-sm w-full hover:bg-gray-100 focus:outline-none border-b-[1px]"
                                    onClick={handleLogout}
                                >
                                    <span><i className="fa-solid fa-right-from-bracket"></i></span><span className="text-nowrap font-medium">Sign out</span>
                                </button>
                            </div>
                    </DropDownModal>
                </div>
            )}
        </div>
    );
}

export default Account;

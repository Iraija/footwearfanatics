import React from "react";

function DropDownModal({ children }) {
    return (
        <div className="absolute top-[3rem] shadow-md shadow-gray-600 bg-white rounded-lg overflow-hidden">
            {children}
        </div>
    );
}

export default DropDownModal;

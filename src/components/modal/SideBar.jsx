import React from "react"

function SideBar({ children }) {

    return (
        <div className="h-screen w-screen bg-black bg-opacity-75 absolute top-0 left-0 flex justify-end z-50">
            <div className="bg-secondary p-4 shadow-md shadow-black w-60 h-full">
                {children}
            </div>
        </div>
    )
}

export default SideBar;

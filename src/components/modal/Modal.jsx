import React from "react"

function Modal({ children }) {

    return (
        <div className="fixed h-screen w-screen bg-black bg-opacity-25 top-0 left-0 flex justify-center items-center z-50">
            <div className="bg-white p-5 rounded-lg m-[2rem] shadow-lg shadow-gray-500">
                {children}
            </div>
        </div>
    )
}

export default Modal;

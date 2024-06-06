import React from "react";
import Modal from "./../../../../../../../modal/Modal";

function ConfirmationModal({ onConfirm, onCancel, name }) {
    return (
        <Modal>
            <div className="flex justify-end mb-2">
                <button onClick={onCancel} className="text-gray-400 hover:text-gray-700 duration-300">
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>
            <div className="flex flex-col items-center gap-4">
                <div className="h-16 w-16 bg-yellow-500 text-white flex justify-center items-center rounded-full shadow-md shadow-gray-500 text-5xl">
                    <i className="fa-solid fa-question"></i>
                </div>
                <div className="text-center">
                    <p>Are you sure you want to delete</p>
                    <p><span className="text-lg text-blue-950 font-bold">{name}</span>?</p>
                </div>
                <div className="flex gap-4">
                    <button onClick={onConfirm} className="w-20 py-1 bg-gray-400 text-white rounded-md shadow-sm shadow-gray-500">Yes</button>
                    <button onClick={onCancel} className="w-20 py-1 bg-blue-400 text-white rounded-md shadow-sm shadow-gray-500">No</button>
                </div>
            </div>
        </Modal>
    );
}

export default ConfirmationModal;

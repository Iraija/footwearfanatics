import PulseLoader from "react-spinners/PulseLoader";
import React from "react"
import Modal from "../modal/Modal";

function Load() {

    return (
        <Modal>
            <div className="p-10 text-center flex-col justify-center items-center text-gray-700">
                <PulseLoader
                    color={'black'}
                    loading={true}
                    size={10}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
                <p className="text-lg md:text-xl font-semibold">Please wait...</p>
                <p className="text-xs md:text-sm">This might take a while.</p>
            </div>
        </Modal>
    )
}

export default Load;

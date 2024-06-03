import PulseLoader from "react-spinners/PulseLoader";
import React from "react"

function Load2() {

    return (
        <div className="h-full w-full flex justify-center items-center bg-black bg-opacity-25 absolute top-0 left-0 z-50">
            <PulseLoader
                color={'white'}
                loading={true}
                size={5}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    )
}

export default Load2;

import React from "react";

function CouldNotFetch({ setModalState }) {

    return (
        <div className="flex flex-col justify-center items-center text-gray-700">
            <i className="fa-regular fa-face-frown text-[8.5rem] pb-4"></i>
            <p className="text-md md:text-lg text-center font-bold">Sorry, we coudn't fetch the data!</p>
            <p className="text-xs md:text-sm text-center pb-5">Please check your internet connection and try again.</p>
            <button onClick={() => setModalState((prevState) => !prevState)} 
                className="px-10 py-2 text-center text-white font-semibold rounded-md bg-green-500"
            >OK</button>
        </div>
    )
}

export default CouldNotFetch;

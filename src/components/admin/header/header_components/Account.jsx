import React from "react"

function Account() {

    return (
        <div className="flex items-end justify-end -space-x-2">
            <div className="rounded-full w-10 h-10 bg-gray-400"></div>
            <div className="h-4 w-4 flex justify-center rounded-full ring-4 ring-secondary bg-primary text-sm text-secondary">
                <i className="fa-solid fa-sort-down"></i>
            </div>
        </div>
    )
}

export default Account;

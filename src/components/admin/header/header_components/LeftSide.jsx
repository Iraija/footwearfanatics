import React from "react"
import Logo from "../../../../assets/images/logo.png"

function LeftSide() {

    return (
        <div className="flex items-center gap-4">
            <div className="w-7 h-7 md:w-10 md:h-10"><img src={Logo} alt="" className="w-full" /></div>
            <p>Admin</p>
        </div>
    )
}

export default LeftSide;

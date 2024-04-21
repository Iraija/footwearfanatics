import React from "react"
import Menu from "./header_components/Menu"
import RightSide from "./header_components/Account";
import LeftSide from "./header_components/LeftSide";

function Header() {

    return (
        <div className="flex-1 py-4 px-[3rem] flex justify-between items-center shadow-md bg-secondary text-primary text-lg sticky top-0">
            <LeftSide />
            <Menu />
            <RightSide />
        </div>
    )
}

export default Header;

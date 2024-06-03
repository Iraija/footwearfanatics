import React, { useState } from "react"
import Menu from "./header_components/Menu"
import RightSide from "./header_components/Account";
import LeftSide from "./header_components/LeftSide";
import SideBarMenu from "./header_components/SideBarMenu";

function Header() {
    const [ sideBarState, setSidebarState ] = useState(false);

    return (
        <div className="flex-1 py-4 px-[3rem] flex justify-between items-center shadow-md bg-secondary text-primary text-base sticky top-0 z-50">
            <LeftSide />
            <Menu />
            <RightSide />

            <div className="md:hidden">
                <button onClick={() => setSidebarState((prevState) => !prevState)}>
                    <i className="fa-solid fa-bars"></i>
                </button>
            </div>

            { sideBarState && 
                <SideBarMenu setSidebarState = {setSidebarState}/>
            }
        </div>
    )
}

export default Header;

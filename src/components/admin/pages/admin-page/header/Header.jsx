import React, { useState, useEffect } from "react"
import Navigation from "./header_components/Navigation"
import Account from "./header_components/Account";
import LeftSide from "./header_components/LeftSide";
import SideBarMenu from "./header_components/SideBarMenu";
import supabase from "../../../../../config/SupabaseClient";

function Header({ user, signOut }) {
    const [ sideBarState, setSidebarState ] = useState(false);
    const [adminDetails, setAdminDetails] = useState(null);

    useEffect(() => {
        fetchAdminDetails();
    }, []);   

    const fetchAdminDetails = async () => {
        try {
            const { data, error } = await supabase
                .from('admin')
                .select()
                .eq('admin_email_account', user.email)
                .single();

            if (error || !data) {
                console.log(error);
            } else {
                setAdminDetails(data);
                console.log("Data fetched successfully");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex-1 py-4 px-[3rem] flex justify-between items-center shadow-md bg-secondary text-primary text-base sticky top-0 z-50">
            <LeftSide />
            <Navigation />
            <Account signOut={signOut} adminDetails={adminDetails} />

            <div className="md:hidden">
                <button onClick={() => setSidebarState((prevState) => !prevState)}>
                    <i className="fa-solid fa-bars"></i>
                </button>
            </div>

            { sideBarState && 
                <SideBarMenu setSidebarState = {setSidebarState} signOut={signOut} adminDetails={adminDetails} />
            }
        </div>
    )
}

export default Header;

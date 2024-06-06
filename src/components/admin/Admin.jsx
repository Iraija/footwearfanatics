import React, { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import LandingPage from "./pages/landing-page/LandingPage";
import AdminPage from "./pages/admin-page/AdminPage";
import { toast, ToastContainer } from "react-toastify";

function Admin() {
    const user = useUser();
    const supabase = useSupabaseClient();
    const [adminDetails, setAdminDetails] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const { data, error } = await supabase
                .from('admin')
                .select()
                .eq('admin_email_account', email)
                .single();

            if (error || !data) {
                toast.error("Login failed. Please check your credentials.");
            } else {
                if (data.admin_password === password) {
                    setAdminDetails(data);
                    setIsLoggedIn(true);
                    toast.success("Login Successful!");
                } else {
                    toast.error("Login failed. Incorrect password.");
                }
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (adminDetails) {
            sendEmailRedirectLink();
        }
    }, [adminDetails]);

    const sendEmailRedirectLink = async () => {
        if (adminDetails && adminDetails.admin_email_account) {
            const { data, error } = await supabase.auth.signInWithOtp({
                email: adminDetails.admin_email_account,
            });

            if (error) {
                toast.error("Error communicating with Supabase, make sure to use a real email address!");
            } else {
                toast.success("Send email successfully");
            }
        }
    };

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            toast.error("Sign out failed.");
        } else {
            setIsLoggedIn(false);
            setAdminDetails(null);
        }
    };

    return (
        <div className="flex-1 flex-row min-h-screen bg-primary text-secondary">
            {user === null ? 
                <LandingPage setEmail={setEmail} email={email} setPassword={setPassword} password={password} isLoggedIn={isLoggedIn} isLoading={isLoading} handleLogin={handleLogin} adminDetails={adminDetails} />
            : 
                <AdminPage user={user} signOut={signOut} adminDetails={adminDetails} />
            }
            <ToastContainer />
        </div>
    );
}

export default Admin;

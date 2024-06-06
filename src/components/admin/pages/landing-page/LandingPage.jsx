import React from "react";
import Logo from "../../../../assets/images/logo-black.png";
import Login from "./pages/Login";
import SendEmail from "./pages/SendEmail";
import { ToastContainer } from "react-toastify";

function LandingPage({ setEmail, email, setPassword, password, isLoggedIn, isLoading, handleLogin, adminDetails }) {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
            <main className="flex-1 container flex justify-center items-center">
                <div className="bg-white rounded-lg shadow-md px-5 py-10 w-80">
                    <div className="flex flex-col items-center mb-10">
                        <div className="w-7 h-7 md:w-10 md:h-10">
                            <img src={Logo} alt="" className="w-full" />
                        </div>
                        <h1 className="text-lg md:text-xl font-bold text-secondary">Footwear Fanatics</h1>
                        <h1 className="text-sm md:text-md font-medium text-secondary">Admin Panel</h1>
                    </div>
                    {!isLoggedIn ? (
                        <Login setEmail={setEmail} email={email} setPassword={setPassword} password={password} isLoading={isLoading} handleLogin={handleLogin} />
                    ) : (
                        <SendEmail adminDetails={adminDetails} />
                    )}
                </div>
            </main>

            <footer className="w-full bg-primary py-4">
                <div className="container mx-auto text-center text-secondary">
                    <p>&copy; {new Date().getFullYear()} Footware Fanatics. All rights reserved.</p>
                </div>
            </footer>
            <ToastContainer />
        </div>
    );
}

export default LandingPage;

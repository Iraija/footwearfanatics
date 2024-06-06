import React from "react";
import { PulseLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";

function Login({ setEmail, email, setPassword, password, isLoading, handleLogin }) {
    return (
        <>
            <h1 className="text-xl font-bold text-center">Login</h1>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <div className="flex flex-col">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="outline-blue-500 text-sm border-[1px] rounded-md py-1 px-2"
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="outline-blue-500 text-sm border-[1px] rounded-md py-1 px-2"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className={`${isLoading ? 'bg-sky-700' : 'bg-blue-400 hover:bg-blue-500'} rounded-md py-1 text-white`}
                    disabled={isLoading}
                >
                    {isLoading ? 
                        <PulseLoader
                            color={"white"}
                            size={5}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        /> 
                    : 
                        "Sign in"
                    }
                </button>
            </form>
            <ToastContainer />
        </>
    );
}

export default Login;

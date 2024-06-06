import React from "react";

function SendEmail({ adminDetails }) {
    return (
        <div className="flex flex-col items-center">
            <div className="text-center mb-10">
                <p className="text-lg font-semibold">Welcome back!</p>
                <p className="text-3xl font-bold">{adminDetails.admin_first_name} {adminDetails.admin_last_name}</p>
            </div>
            <div className="text-center text-sm">
                <p>Please check your email</p>
                <p className="font-bold">{adminDetails.admin_email_account}</p>
                <p>to redirect you to the</p>
                <p><span className="font-bold">Admin Panel</span>.</p>
            </div>
        </div>
    );
}

export default SendEmail;

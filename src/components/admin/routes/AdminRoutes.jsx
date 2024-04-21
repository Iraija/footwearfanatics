import React from "react"
import {  Route, Routes } from "react-router-dom";
import Dashboard from "../page_content/contents/Dashboard";
import Inventory from "../page_content/contents/Inventory";
import Orders from "../page_content/contents/Orders";
import Customers from "../page_content/contents/Customers";

function AdminRoutes() {

    return (
        <Routes>
            <Route path="/" element={<Dashboard />} ></Route>
            <Route path="/inventory" element={<Inventory />} ></Route>
            <Route path="/orders" element={<Orders />} ></Route>
            <Route path="/customers" element={<Customers />} ></Route>
        </Routes>
    )
}

export default AdminRoutes;

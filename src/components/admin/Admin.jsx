import React from "react"
import Header from "./header/Header"
import PageContent from "./page_content/PageContent"

function Admin() {

    return (
        <div className="flex-1 flex-row h-screen">
            <Header />
            <PageContent />
        </div>
    )
}

export default Admin;

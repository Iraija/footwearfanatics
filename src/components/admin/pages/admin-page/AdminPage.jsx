import React from "react"
import Header from "./header/Header"
import PageContent from "./page_content/PageContent"

function AdminPage({ user, signOut }) {

    return (
        <div className="flex-1 flex-row min-h-screen bg-primary text-secondary">
            <Header user={user} signOut={signOut} />
            <PageContent />
        </div>
    )
}

export default AdminPage;

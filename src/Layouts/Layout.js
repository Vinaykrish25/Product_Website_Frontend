import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Components/Footer'
import Header from "../Components/Header"

const Layout = () => {
    return (
        <div style={{backgroundColor: "#FADFA1"}}>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout

import { Navigate, Outlet, useLocation } from "react-router-dom"
import getUsertype from '../hooks/getUsertype';
import AppBar from "./AppBar"
import Footer from "./Footer"

export default function UserLayout() {

    return getUsertype()
        ? <>
            <AppBar />
            <main className="min-h-screen py-14 md:py-16">
                <Outlet />
            </main>
            <Footer />
        </>
        : <Navigate to="/login" state={{ from: useLocation() }} />
}
import { NavLink, Outlet, useNavigate, } from "react-router-dom"
import { useState } from "react"
import { FaTasks } from "react-icons/fa"
import { CgProfile } from "react-icons/cg"
import { BsCalendar3 } from "react-icons/bs"

export default function Detail() {
    const navigator = useNavigate()

    return (
        <div className="flex flex-col md:flex-row h-[calc(100vh-56px)] relative">
            <div className="md:fixed left-0 top-16 bottom-0 md:w-80 max-md:p-2  flex items-center justify-center">
                <div className="md:w-60 max-md:space-x-2 md:space-y-2 p-2 md:p-5 rounded-xl bg-gray-300 flex flex-row md:flex-col">

                    <NavLink
                        to={''}
                        className="p-1 rounded-lg bg-white flex items-center space-x-2 active:bg-gray-500 active:text-white"
                    >
                        <CgProfile className="w-5 h-5 mr-2" />
                        Profile
                    </NavLink>
                    <NavLink
                        to={'tasks'}
                        className="p-1 rounded-lg bg-white flex items-center space-x-2 active:bg-gray-500 active:text-white"

                    >
                        <FaTasks className="w-5 h-5 mr-2" />
                        Tasks
                    </NavLink>
                    <NavLink
                        to={'attendance'}
                        className="p-1 rounded-lg bg-white flex items-center space-x-2 active:bg-gray-500 active:text-white"
                    >
                        <BsCalendar3 className="w-5 h-5 mr-2" />
                        <span>Attendance</span>
                    </NavLink>
                </div>
            </div>
            <div className="p-2 max-md:pb-40 md:pl-[328px] md:w-full  md:h-[calc(100vh-56px)]">
                <Outlet />
            </div>
        </div>
    )
}
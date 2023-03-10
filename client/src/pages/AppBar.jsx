import { useState } from "react"
import { NavLink, Navigate, useNavigate } from "react-router-dom"
import { BsList, BsX, } from "react-icons/bs"
import { TbLogout } from "react-icons/tb"
import navconfig from '../data/navconfig'
import { getJson } from "../hooks/getData"

export default function AppBar() {
    const { data, error, isLoading } = getJson('user')
    const navigate = useNavigate()
    const [menu, setMenu] = useState(false)
    const [menuanimate, setMenuanimate] = useState('max-md:animate-down')
    function handlemenu() {
        if (menu) {
            setMenuanimate('max-md:animate-left')
            setTimeout(() => setMenu(menu => !menu), 900)
        } else {
            setMenuanimate('max-md:animate-right')
            setMenu(menu => !menu)
        }
    }
    return error ? <Navigate to='/login' /> : isLoading ? null :
        <header className="appbar z-50 fixed top-0 left-0 right-0 h-14 p-2 md:px-10 bg-purple-500 text-white flex flex-row justify-between items-center">
            <button onClick={handlemenu} className="md:hidden" >
                {menu
                    ? <BsX className="w-10 h-10" />
                    : <BsList className="w-10 h-10" />
                }
            </button>
            <nav className={`max-md:fixed top-14 left-0 w-[50%]  max-md:p-4 md:flex max-md:flex-col max-md:bg-purple-300 
                            max-md:rounded-br-xl  max-md:space-y-4 md:space-x-2
                            ${menuanimate} ${menu ? 'max-md:flex' : 'max-md:hidden'}`}>
                <button>
                    <NavLink
                        onClick={() => handlemenu()}
                        to='/app/'
                        className='px-3 py-1 rounded-lg bg-purple-600 shadow-sm shadow-purple-700 flex max-md:text-lg'
                    >
                        Welcome
                    </NavLink>
                </button>
                {navconfig[
                    data.usertype === 'Director'
                        ? 'director'
                        : data.usertype === 'Teacher'
                            ? 'teacher'
                            : data.usertype === 'Student' && 'student'

                ]
                    .map((da, index) =>
                        <button key={index}>
                            <NavLink
                                onClick={() => handlemenu()}
                                to={da[0]}
                                className='px-3 py-1 rounded-lg bg-purple-600 shadow-sm shadow-purple-700 flex max-md:text-lg'
                            >
                                {da[1]}
                            </NavLink>
                        </button>
                    )
                }
            </nav>
            <div className="flex flex-row items-center space-x-3">
                <button
                    onClick={() => navigate('profile')}
                    className="px-4 py-2 rounded-md active:bg-purple-600 active:shadow-lg active:shadow-purple-700"
                >
                    <span className="text-xl">{data.user.name.first}{' '}{data.user.name.father}</span>
                </button>
                <button
                    onClick={() => navigate('/logout')}
                    className="p-2 rounded-md active:bg-purple-600 active:shadow-lg active:shadow-purple-700"
                >
                    <TbLogout className='w-5 h-5' />
                </button>
            </div>
        </header >
}
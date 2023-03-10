import { useState } from "react"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import getUsertype from "../hooks/getUsertype"
import { BsPerson } from "react-icons/bs"
import { BiLock } from "react-icons/bi"

export default () => {
    const usertype = getUsertype()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const location = useLocation()

    return usertype ? <Navigate to='/app/' /> :
        <div className="h-screen flex flex-col justify-center items-center">
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    fetch(
                        'http://localhost:3000/login',
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ username, password })
                        }
                    )
                        .then(res => res.status == 200
                            ? res.json()
                            : null
                        )
                        .then(Auth => {
                            sessionStorage.refreshtoken = Auth.refreshtoken
                            sessionStorage.accesstoken = Auth.accesstoken
                            navigate(location.state ? location.state.from.pathname : "/app/")
                        })
                }}
                className="bg-gray-300 rounded-xl max-md:min-w-[300px] md:w-96 flex flex-col py-10 px-5 md:px-10 space-y-5"
            >
                <p className="text-center text-xl ">Welcome!</p>
                <div className="flex flex-row p-2 space-x-2 bg-white rounded-xl">
                    <BsPerson className="w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        autoComplete="off"
                        required
                        autoFocus
                        onChange={(e) => setUsername(() => e.target.value)}
                        className="p-0 bg-white w-full border-none focus:ring-0 placeholder-gray-300"
                    />
                </div>
                <div className="flex flex-row p-2 space-x-2 bg-white rounded-xl">
                    <BiLock className="w-5 h-5" />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        required
                        onChange={(e) => setPassword(() => e.target.value)}
                        className="p-0 bg-white w-full border-none focus:ring-0 placeholder-gray-300"
                    />
                </div>
                <input
                    type="submit"
                    value="Log In"
                    className=" text-white bg-purple-500 hover:shadow-md hover:shadow-purple-900 p-2 rounded-xl"
                />
            </form>
        </div>

}
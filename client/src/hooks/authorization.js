import { useNavigate } from "react-router-dom"

export default function authorization(username, password) {
    
    fetch(
        'http://localhost:3000/login',
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }
    )
        .then(res => res.status == 200 ? res.json() : false)
        .then(token => {
            if (!!token) {
                sessionStorage.refreshtoken = token.refreshtoken
                sessionStorage.accesstoken = token.accesstoken
                console.log('token : ', sessionStorage.accesstoken)
                const navigate = useNavigate()
                navigate("/app/")
            } else {
                const navigate = useNavigate()
                navigate("/login")
            }
        })
        .catch(err => {
            console.log('catch', err)
            const navigate = useNavigate()
            navigate("/login")
        })
}
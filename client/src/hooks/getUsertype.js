import jwt_decode from "jwt-decode"
export default function getUsertype() {
    const token = sessionStorage.refreshtoken
    if (token) return jwt_decode(token).usertype
    else return null
}
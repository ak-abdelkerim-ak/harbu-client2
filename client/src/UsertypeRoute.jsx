import getUsertype from './hooks/getUsertype'

export default ({ element, usertype }) => {
    return usertype.includes(getUsertype()) ? element : <Navigate to="/app/" />
}

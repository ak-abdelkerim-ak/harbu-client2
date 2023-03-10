import { Navigate, Outlet, useLocation } from "react-router-dom"
import getUsertype from './hooks/getUsertype';
import AppBar from "./AppBar"
import Footer from "./Footer"

export default function AppRoute() {
    const usertype = getUsertype()
    const location = useLocation()

    return usertype
        ? <>
            <AppBar />
            <main className="min-h-screen py-14 md:py-16">
                <Outlet />
            </main>
            <Footer />
        </>
        : <Navigate to="/login" state={{ from: location }} />
}























// import { Navigate } from 'react-router-dom'
// import { getJson } from './hooks/getData'
// import Profile from './pages/Profile'
// import Welcome from "./pages/Welcome";
// import Teacher from './pages/director/Teacher'
// import Student from './pages/director/Student'
// import Section from './pages/director/Section'
// import Department from './pages/director/Department'
// import Assignment from './pages/teacher/Assignment'
// import Attendance from './pages/teacher/Attendance'
// import Schedule from './pages/teacher/Schedule'

// export function AppRoutes() {
//     const { data: userdata, error: usererror, isLoading: isUserdata } = getJson('user')
//     return (
//         <routes>
//             <Route index element={<Welcome />} />
//             <Route path='profile' element={<Profile />} />
//             {usererror
//                 ? <Route path='*' element={<p>Something is Wrong</p>} />
//                 : isUserdata
//                     ? <Route path='*' element={<p>Loading ... </p>} />
//                     : userdata.usertype === 'Director'
//                         ? <>
//                             <Route path='teacher' element={<Teacher />} />
//                             <Route path='student' element={<Student />} />
//                             <Route path='section' element={<Section />} />
//                             <Route path='department' element={<Department />} />
//                         </>
//                         : userdata.usertype === 'Teacher'
//                             ? <>
//                                 <Route path='Assignment' element={<Assignment />} />
//                                 <Route path='Attendance' element={<Attendance />} />
//                                 <Route path='schedule' element={<Schedule />} />
//                             </>
//                             : userdata.usertype === 'Student'
//                             && <>
//                                 <Route path='Assignment' element={<Assignment />} />
//                                 <Route path='Attendance' element={<Attendance />} />
//                                 <Route path='schedule' element={<Schedule />} />
//                             </>
//             }
//             <Route path='*' element={<Navigate to='/app/' />} />
//         </routes>
//     )
// }
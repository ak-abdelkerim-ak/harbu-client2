import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UsertypeRoute from './UsertypeRoute'
import Login from './pages/Login'
import UserLayout from './pages/UserLayout'
import Welcome from "./pages/Welcome"
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
 
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='app' element={<UserLayout />} >
          <Route index element={<Welcome />} />
          <Route path='teacher'>
            <Route index
              element={
                <UsertypeRoute element={<Dashboard datatype='teacher' />} usertype={['Director']} />
              }
            />
            <Route path=':id'
              element={
                <UsertypeRoute element={<Dashboard datatype='teacher' />} usertype={['Director']} />
              }
            />
          </Route>
          <Route path='student'>
            <Route index
              element={
                <UsertypeRoute element={<Dashboard datatype='student' />} usertype={['Director']} />
              }
            />

          </Route>
          <Route path='section' element={<UsertypeRoute element={<Dashboard datatype='section' />} usertype={['Director']} />} />
          <Route path='department' element={<UsertypeRoute element={<Dashboard datatype='department' />} usertype={['Director']} />} />
          <Route path='assignment' element={<UsertypeRoute element={<Dashboard datatype='assignment' />} usertype={['Teacher', 'Student']} />} />
          <Route path='attendance' element={<UsertypeRoute element={<Dashboard datatype='attendance' />} usertype={['Teacher', 'Student']} />} />
          <Route path='schedule' element={<UsertypeRoute element={<Dashboard datatype='schedule' />} usertype={['Teacher', 'Student']} />} />
          <Route path='profile' element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

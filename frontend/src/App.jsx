import { Route, Routes } from 'react-router-dom'
import Auth from './pages/auth/Auth'
import Login from './pages/login/Login'
import Home from './pages/home/Home'
import Users from './pages/users/Users'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Auth />}>
          <Route path='users' element={<Users />} />
        </Route>

      </Routes>
    </>
  )
}

export default App
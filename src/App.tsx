import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { storeType } from './app/store/store'

function App() {

  const { user } = useSelector((state: storeType) => state.logged)

  const navigate = useNavigate()

  useEffect(() => {
    if (user === null) {
      navigate('/login')
    }
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='home' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App

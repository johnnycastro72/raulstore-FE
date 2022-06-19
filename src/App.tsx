import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { rootState } from './app/store/store'

function App() {

  const { user } = useSelector((state: rootState) => state.logged)

  const navigate = useNavigate()

  useEffect(() => {
    if (user === null) {
      navigate('/')
    }
  }, [])

  return (
    <div className="App">
      {user ?
        <Routes>
          <Route path='home' element={<Home />} />
        </Routes> :
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='/' element={<Login />} />
          <Route path='*' element={<Login />} />
        </Routes>
      }
    </div>
  )
}

export default App

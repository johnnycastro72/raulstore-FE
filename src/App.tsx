import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import { stateType } from './state/store'

function App() {

  const { user } = useSelector((state: stateType) => state.logged)

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
        </Routes>
    </div>
  )
}

export default App

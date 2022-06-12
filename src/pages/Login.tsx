import React from 'react'
import LoginFrame from '../components/login/LoginFrame'
import InfoFrame from '../components/login/InfoFrame'
import '../components/login/Login.css'

const Login = () => {
  return (
    <div className='loginFrame'>
      <div className="divInfoFrame">
        <LoginFrame />
        <InfoFrame />
      </div>
    </div>
  )
}

export default Login
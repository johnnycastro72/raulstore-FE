import React from 'react'
import LeftLogin from '../components/LeftLogin'
import RightLogin from '../components/RightLogin'

const Login = () => {
  return (
    <div className='mainLogin'>
      <div className="rightLogin">
        <LeftLogin />
        <RightLogin />
      </div>
    </div>
  )
}

export default Login
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { auth } from '../../firebaseConfig';
import './SignInFrame.css'

const SignInFrame: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [validEmail, setValidEmail] = useState(false)
  const [buttonSignIn, setButtonSignIn] = useState(false)

  const emailSignIn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (userName && password) {
      createUserWithEmailAndPassword(auth, userName, password)
        .then((userCredential) => {
          // Signed in
          //If the logged in is succesfull you will access this part of the code where you will 
          //get a lot of information about the user that have logged in
          const user = userCredential.user;

          /*With the information of the user you can populate an state that is mainly focused on 
          holding the information of the user that is logged in*/

          navigate('/home')
        })
        .catch((error) => {

          //If the logged in is not succesfull yu will get to this part and with the message you can tell 
          //the user what went wrong
          const errorCode = error.code;
          const errorMessage = error.message;

          setValidEmail(false)
          setButtonSignIn(false)
          navigate('/login')
        });
      setUserName('')
      setPassword('')
    }
  }

  const validateEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value)
    if (userName) {
      const validData = (/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(userName)) ||
        (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(userName))
      setValidEmail(validData)
      if (!validData) {
        setButtonSignIn(false)
      }
    }
  }

  const validatePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const activePassword = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setButtonSignIn(true)
  }

  return (
    <div className="sigInFrame">
      <form action="" method="post" className='formSignIn'>
        <div className='headerSignIn'>
          <img src="https://firebasestorage.googleapis.com/v0/b/raul-s-hardware-store.appspot.com/o/assets%2Fhammer-and-wrench-svgrepo-com.svg?alt=media&token=daa32d6e-a95e-4068-abd6-fc51789c5f14" alt="" width="35vw" />
          <h2>Raul's Hardware Store</h2>
        </div>
        <h2 className='msg1SignIn'>Create your account</h2>
        <div className='orLogin'>
          <span className='orinLogin'>or</span>
        </div>
        <fieldset className='emailSignIn'>
          <label htmlFor="username" id='usernameLabel' className='labelSignIn'>
            Email address
            <div className='divEmailSignIn'>
              <div className='emailFrame'>
                <div className='inputFrame'>
                  <input
                    onChange={(e) => validateEmail(e)}
                    name="userName"
                    value={userName}
                    autoComplete="email"
                    type="email"
                    className='inputEmail'
                    required
                    placeholder=''
                    id='username' />
                </div>
                {validEmail ? <img src="https://firebasestorage.googleapis.com/v0/b/raul-s-hardware-store.appspot.com/o/assets%2FGreen_check.svg.png?alt=media&token=c0410393-02fd-453c-89cf-1abfad2b4ffe" alt="Good" className='checked' /> : <img src="https://firebasestorage.googleapis.com/v0/b/raul-s-hardware-store.appspot.com/o/assets%2FFalse.svg?alt=media&token=435aaf5a-9351-412f-84d4-cc5b5d68dec4" alt="Bad" className='wrong' />}
              </div>
            </div>
          </label>
          {(buttonSignIn) && <label htmlFor="password" id='passwordLabel' className='labelLogin'>
            Password
            <div id="passwordFrame" className='divEmailSignIn'>
              <input
                onChange={(e) => validatePassword(e)}
                name='password'
                value={password}
                type='password'
                minLength={8}
                required
                className="inputPassword"
                id="inputPassword" />
            </div>
          </label>}
        </fieldset>
        <footer>
          <button type="submit" onClick={(buttonSignIn) ? (e) => emailSignIn(e) : (e) => activePassword(e)} disabled={!validEmail} className={validEmail ? 'btnLogin2' : 'btnLogin'} name="SignIn" >
            <div className={validEmail ? 'btnLoginText2' : 'btnLoginText'} id='btnSignInText'>
              {(buttonSignIn) ? "Sign In" : "Next"}
            </div>
          </button>
          <span className='loginSpan'>
            Have an account?
            <Link to="/login" className='loginLink'>Log in now</Link>
          </span>
        </footer>
      </form>
    </div >
  )
}

export default SignInFrame

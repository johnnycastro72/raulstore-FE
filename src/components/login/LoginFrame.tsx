import { auth } from "../../firebaseConfig";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { logInReducer } from '../../state/features/loggedInSlice';
import GoggleLogin from "./GoggleLogin";
import GitHubLogin from "./GitHubLogin";
import React, { ChangeEvent, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import './LoginFrame.css'

const LoginFrame: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [validEmail, setValidEmail] = useState(false)
    const [buttonLogin, setButtonLogin] = useState(false)

    const emailLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        if (userName && password) {
            signInWithEmailAndPassword(auth, userName, password)
                .then((userCredential) => {
                    // Logged in
                    //If the logged in is succesfull you will acces this part of teh code where you will 
                    //get a lot of information about the user that have logged in
                    const user = userCredential.user;

                    /*With the information of the user you can populate an state that is mainly focused on 
                    holding the information of the user that is logged in*/
                    // ...
                    dispatch(logInReducer(user))
                    navigate('/home')
                })
                .catch((error) => {

                    //If the logged in is not succesfull yu will get to this part and with the message you can tell 
                    //the user what went wrong
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setButtonLogin(false)
                    navigate('/login')
                });
            setPassword('')
            setUserName('')

        }

    }


    const validateEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value)
        if (userName) {
            const validData = (/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(userName)) ||
                (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(userName))
            setValidEmail(validData)
            if (!validData) {
                setButtonLogin(false)
            }
        }
    }

    const validatePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const activePassword = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setButtonLogin(true)
    }

    return (
        <div className='loginFrame'>
            <form action="" method="post" className='formLogin'>
                <div className='headerLogin'>
                    <img src="src\assets\hammer-and-wrench-svgrepo-com.svg" alt="" width="35vw" />
                    <h2>Raul's Hardware Store</h2>
                </div>
                <h2 className='msg1Login'>Log in to your account</h2>
                <GoggleLogin />
                <div id="name"></div>
                <GitHubLogin />
                <div className='orLogin'>
                    <span className='orinLogin'>or</span>
                </div>
                <fieldset className='emailLogin'>
                    <label htmlFor="username" id='usernameLabel' className='labelLogin'>
                        Email address
                        <div className='divEmailLogin'>
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
                                {validEmail ? <img src="src/assets/Green_check.svg" alt="Good" className='checked' /> : <img src="src/assets/False.svg" alt="Bad" className='wrong' />}
                            </div>
                        </div>
                    </label>
                    {(buttonLogin) && <label htmlFor="password" id='passwordLabel' className='labelLogin'>
                        Password
                        <div id="passwordFrame" className='divEmailLogin'>
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
                    <button type="submit" onClick={(buttonLogin) ? (e) => emailLogin(e) : (e) => activePassword(e)} disabled={!validEmail} className={validEmail ? 'btnLogin2' : 'btnLogin'} name="login" >
                        <div className={validEmail ? 'btnLoginText2' : 'btnLoginText'} id='btnLoginText'>
                            {(buttonLogin) ? "Login" : "Next"}
                        </div>
                    </button>
                    <span className='registerLogin'>
                        Don't Have an account?
                        <Link to="/register" className='registerLink'>Sign Up</Link>
                    </span>
                </footer>
            </form>
        </div >
    )
}

export default LoginFrame
import { auth } from "../../firebaseConfig";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { logInReducer } from '../../state/features/loggedInSlice';
import { validate } from 'uuid';
import GoggleLogin from "./GoggleLogin";
import GitHubLogin from "./GitHubLogin";
import { ChangeEvent, useState } from "react";
import './LoginFrame.css'

const LoginFrame: React.FC = () => {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [validEmail, setValidEmail] = useState(false)

    const validateEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value)
        if (userName) {
            const validData = (/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(userName)) ||
                (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(userName))
            setValidEmail(validData)
        }
    }

    const activePassword = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        const inputPassword = document.createElement("div");
        inputPassword.innerHTML = "<input />";
        const divPassword = document.getElementById('passwordFrame');
        divPassword?.appendChild(inputPassword);
        const btnLogin = document.getElementById('login');
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
                        <div className='demailLogin'>
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
                            <div id="passwordFrame" className='passwordFrame'>

                            </div>
                        </div>
                    </label>
                </fieldset>
                <footer>
                    <button type="submit" onClick={(e) => activePassword(e)} disabled={!validEmail} className="btnLogin" name="login" >
                        <div className={validEmail ? 'btnLoginText2' : 'btnLoginText'} id='btnLoginText'>
                            Next
                        </div>
                    </button>
                    <span className='registerLogin'>
                        Don't Have an account?
                        <Link to="/register" className='registerLink'>Sign Up</Link>
                    </span>
                </footer>
            </form>
        </div>
    )
}

export default LoginFrame
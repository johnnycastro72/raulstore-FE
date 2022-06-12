import React from 'react'
import { Link } from 'react-router-dom'

const LeftLogin = () => {
    return (
        <div className='loginFrame'>
            <form action="" className='formLogin'>
                <div className='headerLogin'>
                    <img src="src\assets\hammer-and-wrench-svgrepo-com.svg" alt="" width="35vw" />
                    <h2>Raul's Hardware Store</h2>
                </div>
                <h2 className='msg1Login'>Log in to your account</h2>
                <div id="googleInWrapper">
                    <div id="customBtn" className="customGPlusSignIn">
                        <span className="icon"></span>
                        <span className="buttonText">Google</span>
                    </div>
                </div>
                <div id="name"></div>
                <div id="googleInWrapper">
                    <div id="customBtn" className="customGPlusSignIn">
                        <span className="icon2"></span>
                        <span className="buttonText">GitHub</span>
                    </div>
                </div>
                <div className='orLogin'>
                    <span className='orinLogin'>or</span>
                </div>
                <fieldset className='emailLogin'>
                    <label htmlFor="username" id='usernameLabel' className='labelLogin'>
                        Email address
                        <div className='demailLogin'>
                            <div className='emailFrame'>
                                <div className='inputFrame'>
<input name="username" autoComplete="email" type="text" className='inputEmail' required placeholder='' id='username' />
                                </div>
                            </div>
                        </div>
                    </label>
                </fieldset>
                <footer>
                    <button type="submit" className="btnLogin" disabled aria-disabled="true" name="login" >
                    <div className='btnLoginText'>
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

export default LeftLogin

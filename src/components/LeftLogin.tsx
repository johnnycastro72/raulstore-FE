import { GoogleAuthProvider, OAuthCredential, signInWithPopup } from 'firebase/auth';
import { auth } from "../firebaseConfig";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { logInReducer } from '../state/features/loggedInSlice';
import { useState } from 'react';

const providerGoogleAuth = new GoogleAuthProvider();

const LeftLogin: React.FC = () => {

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const signInWithGoogleButton = () => {

        signInWithPopup(auth, providerGoogleAuth)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential: OAuthCredential | null = GoogleAuthProvider.credentialFromResult(result);

                const token = credential!.accessToken;

                // The signed-in user info.
                //If the logged in is succesfull you will acces this part of the code where you will 
                //get a lot of information about the user that have logged in
                const user = result.user;

                /*Whit the information of the user you can populate an state that is mainly focused on 
                  holding the information of the user that is logged in*/

                dispatch(logInReducer(user))

                navigate('/home')

                // ...
            }).catch((error) => {

                //If the logged in is not succesfull yu will get to this part and with the message you can tell 
                //the user what went wrong


                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
                navigate('/login')
            });
    }

    return (
        <div className='loginFrame'>
            <form action="" className='formLogin'>
                <div className='headerLogin'>
                    <img src="src\assets\hammer-and-wrench-svgrepo-com.svg" alt="" width="35vw" />
                    <h2>Raul's Hardware Store</h2>
                </div>
                <h2 className='msg1Login'>Log in to your account</h2>
                    <div id="googleInWrapper">
                        <div onClick={signInWithGoogleButton} id="customBtn" className="customGPlusSignIn">
                            <span onClick={signInWithGoogleButton} className="icon"></span>
                            <span onClick={signInWithGoogleButton} className="buttonText">Google</span>
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
                                    <input 
                                    onChange={(e) => setUserName(e.target.value)} 
                                    name="userName" 
                                    value={userName} 
                                    autoComplete="email" 
                                    type="email" 
                                    className='inputEmail' 
                                    required 
                                    placeholder='' 
                                    id='username' />
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
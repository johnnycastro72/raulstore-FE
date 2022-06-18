import { GoogleAuthProvider, OAuthCredential, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import { logInReducer, userType } from "../../app/features/loggedInSlice";
import './GoogleLogin.css'
import { useAppDispatch } from "../../app/hooks";

const providerGoogleAuth = new GoogleAuthProvider();

const GoggleLogin = () => {
    const dispatch = useAppDispatch();
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
                const {displayName, email, photoURL, uid} = result.user
                const user = {displayName, email, photoURL, uid};

                /*Whit the information of the user you can populate an state that is mainly focused on 
                  holding the information of the user that is logged in*/

                dispatch(logInReducer(user as userType))

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
        <div>
            <div id="googleInWrapper">
                <div onClick={signInWithGoogleButton} id="customBtn" className="customGPlusSignIn">
                    <span onClick={signInWithGoogleButton} className="icon"></span>
                    <span onClick={signInWithGoogleButton} className="buttonText">Google</span>
                </div>
            </div>
        </div>
    )
}

export default GoggleLogin

import Info2Frame from "../components/register/Info2Frame"
import SignInFrame from "../components/register/SignInFrame"
import '../components/register/Register.css'

const Register = () => {
    return (
        <div className="sigInFrame">
            <div className="divInfo2Frame">
                <SignInFrame />
                <Info2Frame />
            </div>
        </div>
    )
}

export default Register

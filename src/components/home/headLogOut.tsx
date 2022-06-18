import { Button, Card, Offcanvas } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { auth } from "../../firebaseConfig"
import { logOutReducer } from "../../app/features/loggedInSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { rootState } from "../../app/store/store"


const headLogOut = () => {

    const { user } = useAppSelector((state: rootState) => state.logged)

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const logOut = () => {
        auth.signOut().then(() => {
            // Sign-out successful.
            dispatch(logOutReducer())
            navigate('/login')
        }).catch((error) => {
            // An error happened.
            navigate('/login')
        });
    }

    return (
        <Offcanvas show="true" placement="end" name="end" >
            <Card style={{ width: "auto" }}>
                <Card.Img variant="top" src={(user?.photoURL) ? user?.photoURL : "https://firebasestorage.googleapis.com/v0/b/raul-s-hardware-store.appspot.com/o/assets%2Fuser.png?alt=media&token=59cadf34-5b9c-4779-a655-5e2d9f54f56b"} />
                <Card.Body>
                    <Card.Title> {(user?.displayName) ? user.displayName : user?.email}</Card.Title>
                    <Card.Text>
                        {user?.email}
                        <br />
                    </Card.Text>
                    <Button variant="primary" onClick={logOut}>Log Out</Button>
                </Card.Body>
            </Card>
        </Offcanvas>
    )
}

export default headLogOut

import { useState } from "react"
import { Button, Card, Offcanvas } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { auth } from "../../firebaseConfig"
import { logOutReducer } from "../../state/features/loggedInSlice"
import { storeType } from "../../state/store"

const headLogOut = () => {

    const { user } = useSelector((state: storeType) => state.logged)

    const dispatch = useDispatch();
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
                <Card.Img variant="top" src={(user?.photoURL) ? user?.photoURL : "src/assets/user.png"} />
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

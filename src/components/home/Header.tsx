import { useState } from 'react'
import { Stack } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { userType } from '../../state/features/loggedInSlice'
import { storeType } from '../../state/store'
import HeadLogOut from './headLogOut'
import './Header.css'

const Header = () => {
  const { user } = useSelector((state: storeType) => state.logged)

  const { photoURL } = user as userType

  const [showCard, setShowCard] = useState(false)

  const showLogOut = () => {
    setShowCard(true);
  }

  return (
    <Stack direction="horizontal">
      <div className='headerLogo'>
        <img src="src\assets\hammer-and-wrench-svgrepo-com.svg" alt="" width="35vw" />
        <h2>Raul's Hardware Store</h2>
      </div>
      <div className="ms-auto photo">
        <img onClick={showLogOut} src={photoURL} alt="" width="35vw" />
      </div>
      {(showCard) && <HeadLogOut />}
    </Stack>
  )
}

export default Header

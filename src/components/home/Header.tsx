import { useState } from 'react'
import { Stack } from 'react-bootstrap'
import { userType } from '../../app/features/loggedInSlice'
import { rootState } from '../../app/store/store'
import HeadLogOut from './headLogOut'
import { useAppSelector } from '../../app/hooks'
import './Header.css'

const Header = () => {
  const { user } = useAppSelector((state: rootState) => state.logged)

  const { photoURL } = user as userType

  const [showCard, setShowCard] = useState(false)

  const showLogOut = () => {
    setShowCard(true);
  }

  return (
    <Stack direction="horizontal">
      <div className='headerLogo'>
        <img src="https://firebasestorage.googleapis.com/v0/b/raul-s-hardware-store.appspot.com/o/assets%2Fhammer-and-wrench-svgrepo-com.svg?alt=media&token=daa32d6e-a95e-4068-abd6-fc51789c5f14" alt="" width="35vw" />
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

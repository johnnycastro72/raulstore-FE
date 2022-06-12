import { Stack } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { userType } from '../../state/features/loggedInSlice'
import { storeType } from '../../state/store'
import './Header.css'

const Header = () => {
  const { user } = useSelector((state: storeType) => state.logged)

  const { photoURL } = user as userType

  return (
    <Stack direction="horizontal">
      <div className='headerLogo'>
        <img src="src\assets\hammer-and-wrench-svgrepo-com.svg" alt="" width="35vw" />
        <h2>Raul's Hardware Store</h2>
      </div>
      <div className="ms-auto">
        <img src={photoURL} alt="" width="35vw" />
      </div>
    </Stack>
  )
}

export default Header

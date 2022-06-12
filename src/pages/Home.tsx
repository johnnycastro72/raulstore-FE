import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { stateType } from "../state/store"

const Home = () => {
  const { user } = useSelector((state: stateType) => state.logged)

  const navigate = useNavigate()

  useEffect(() => {
    if (user === null) {
      navigate('/login')
    }
  }, [])

  return (
    <div>
      <h1>This is my Home Page</h1>
    </div>
  )
}

export default Home
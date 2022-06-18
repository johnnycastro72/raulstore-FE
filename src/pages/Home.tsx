import { useEffect } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { rootState } from "../app/store/store"
import BillNote from "../components/home/bills/BillNote"
import Footer from "../components/home/Footer"
import Header from "../components/home/Header"
import MainContainer from "../components/home/tab/MainContainer"

const Home = () => {
  const { user } = useSelector((state: rootState ) => state.logged)

  const navigate = useNavigate()

  useEffect(() => {
    if (user === null) {
      navigate('/login')
    }
  }, [])

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Header />
      </Row>
      <Row>
        <Col>
          <BillNote />
        </Col>
        <Col>
          <MainContainer />
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Footer />
      </Row>
    </Container>
  )
}

export default Home
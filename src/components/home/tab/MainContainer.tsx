import { useState } from "react"
import { Container, Tab, Tabs } from "react-bootstrap"
import './MainContainer.css'
import ProductSuppliersList from "../../../app/features/productSupplier/ProductSuppliersList"

const MainContainer = () => {

  const [key, setKey] = useState('products')

  return (
    <Container className="mainContainer">
      <Tabs
        defaultActiveKey={key}
        id="controlled-tab"
        onSelect={(k) => setKey((k) ? k : "products")}
        className="mb-3">
        <Tab eventKey="products" title="Available Products">
          Products tab
        </Tab>
        <Tab eventKey="supplier" title="Product Suppliers">
          <ProductSuppliersList />
        </Tab>
        <Tab eventKey="receipt" title="Receipts">
          Receipt tab
        </Tab>
      </Tabs>
    </Container>
  )
}

export default MainContainer

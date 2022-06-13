import { useSelector } from "react-redux"
import { storeType } from "../../../state/store"
import { productSupplier } from "../../../state/features/productSupplierSlice"
import { Table } from "react-bootstrap"

const ProductSuppliers = () => {
  const { value } = useSelector((state: storeType) => state.productSupplier)
  return (
    <Table striped bordered hover size="sm" responsive>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        {value.map((pSupplier: productSupplier) => {
          return (
            <tr>
              <td>{pSupplier.id}</td>
              <td>{pSupplier.supplierName}</td>
              <td>{pSupplier.supplierPhone}</td>
            </tr>);
        })}
      </tbody>
    </Table>
  )
}

export default ProductSuppliers

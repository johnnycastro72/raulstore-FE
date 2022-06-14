import { useDispatch, useSelector } from "react-redux"
import { storeType } from "../../../app/store/store"
import { productSupplier } from "../../../features/productSupplierSlice"
import { Table } from "react-bootstrap"
import { useEffect } from "react"
import { getAllProductSuppliersAction } from "../../../actions/ProductSupplierAction"

const ProductSuppliers = () => {

  const { value } = useSelector((state: storeType) => state.productSupplier)

  const dispatch = useDispatch()

  useEffect(() => {

    getAllProductSuppliersAction(dispatch)

  }, [value])

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
            <tr key={pSupplier.id}>
              <td>{pSupplier.taxPayerId}</td>
              <td>{pSupplier.supplierName}</td>
              <td>{pSupplier.supplierPhone}</td>
            </tr>);
        })}
      </tbody>
    </Table>
  )
}

export default ProductSuppliers

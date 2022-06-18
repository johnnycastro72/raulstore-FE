import { productSupplier } from "../../../app/features/productSupplierSlice"
import { Table } from "react-bootstrap"
import { useEffect } from "react"
import { getAllProductSuppliersAction } from "../../../actions/ProductSupplierAction"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { rootState } from "../../../app/store/store"

const ProductSuppliers = () => {

  const { value } = useAppSelector((state: rootState) => state.productSupplier)

  const dispatch = useAppDispatch()

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

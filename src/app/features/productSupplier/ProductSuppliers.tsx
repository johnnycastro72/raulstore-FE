import { productSupplier } from "./productSupplierSlice"
import { Table } from "react-bootstrap"
import { useEffect } from "react"
import { getAllProductSuppliersAction } from "../../actions/ProductSupplierAction"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { rootState } from "../../../app/store/store"

const ProductSuppliers = () => {

  const {suppliers} = useAppSelector((state: rootState) => state.productSupplier)

  const dispatch = useAppDispatch()

  useEffect(() => {

    getAllProductSuppliersAction(dispatch)

  }, [suppliers])

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
        {suppliers.map((pSupplier: productSupplier) => {
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

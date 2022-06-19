import { productSupplier, selectAllSuppliers, getSuppliersErrors, getSuppliersStatus } from "./ProductSupplierSlice"
import { Alert, Button, Table } from "react-bootstrap"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { useEffect, useState } from "react";
import { deleteProductSupplierAction, getAllProductSuppliersAction, getProductsByProductSupplierId } from "./ProductSupplierAction";
import AddProductSupplierDetail from "./ProductSupplierDetail";
import { Product } from "../product/ProductAction";

const ProductSuppliersList = () => {
  const dispatch = useAppDispatch();

  const suppliers = useAppSelector(selectAllSuppliers)
  const suppliersStatus = useAppSelector(getSuppliersStatus)
  const suppliersErrors = useAppSelector(getSuppliersErrors)

  const [haveProducts, setHaveProducts] = useState<Boolean>(false)
  const [listProducts, setListProducts] = useState<Product[]>([])

  useEffect(() => {
    if (suppliersStatus === 'idle') {
      dispatch(getAllProductSuppliersAction())
    }
  }, [suppliersStatus, dispatch])

  const removeProductSupplier = async (productSupplierId: string) => {
    const products: Product[] = await getProductsByProductSupplierId(productSupplierId)
    if (products.length === 0) {
      setHaveProducts(false)
      dispatch(deleteProductSupplierAction(productSupplierId))
      return
    }
    setListProducts(products)
    setHaveProducts(true)
  }

  return (
    <>
      <AddProductSupplierDetail />
      <Table striped bordered hover size="sm" responsive>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((pSupplier: productSupplier) => {
            return (
              <tr key={pSupplier.id}>
                <td>{pSupplier.taxPayerId}</td>
                <td>{pSupplier.supplierName}</td>
                <td>{pSupplier.supplierPhone}</td>
                <td align="center" width={10}><button className="tableBtn" onClick={() => removeProductSupplier(pSupplier.id as string)} ><img style={{ width: "40%", height: "40%" }} src="https://firebasestorage.googleapis.com/v0/b/raul-s-hardware-store.appspot.com/o/assets%2FFalse.svg?alt=media&token=435aaf5a-9351-412f-84d4-cc5b5d68dec4" alt="Delete Product Provider" /></button></td>
              </tr>);
          })}
        </tbody>
      </Table>
      <>
        {haveProducts &&
          <Alert variant="warning">
            <Alert.Heading>
              <h5>Alert message!!!</h5>
            </Alert.Heading>
            <p>You cannot delete this product supplier because it has the following products associated with it:</p>
            <Table striped bordered hover size="sm" responsive>
              <thead>
                <th>Name</th>
                <th>Description</th>
                <th>Units</th>
              </thead>
              <tbody>
                {listProducts.map((product: Product) => {
                  return (
                    <tr>
                      <td>{product.name}</td>
                      <td>{product.description}</td>
                      <td style={{ textAlign: 'center' }}>{product.units}</td>
                    </tr>)
                })}
              </tbody>
            </Table>
            <Button onClick={() => setHaveProducts(false)}>Close</Button>
          </Alert>
        }
      </>
    </>
  )
}

export default ProductSuppliersList

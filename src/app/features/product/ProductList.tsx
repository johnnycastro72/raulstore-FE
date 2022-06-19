import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../hooks'
import { getAllProductsAction, Product } from './productAction';
import AddProductForm from './ProductDetail';
import { getProductsErrors, getProductsStatus, selectAllProducts } from './productSlice';

const ProductList = () => {
    const dispatch = useAppDispatch();

    const products = useAppSelector(selectAllProducts)
    const productsStatus = useAppSelector(getProductsStatus)
    const productsErrors = useAppSelector(getProductsErrors)

    useEffect(() => {
        if (productsStatus === 'idle') {
            dispatch(getAllProductsAction())
        }
    }, [productsStatus, dispatch])

    return (
        <>
            <AddProductForm />
            <Table striped bordered hover size="sm" responsive>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Units</th>
                        <th>View</th>
                        <th>Del</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product: Product) => {
                        return (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td align='center'>{product.units}</td>
                                <td align='center' width={15}><button className="tableBtn"><img style={{ width: "100%", height: "100%" }} src="https://firebasestorage.googleapis.com/v0/b/raul-s-hardware-store.appspot.com/o/assets%2Fview_icon.svg?alt=media&token=fcb028da-2de8-46ca-acfb-c1edc55d5872" alt="View Product" /></button></td>
                                <td align='center' width={15}><button className="tableBtn"><img style={{ width: "110%", height: "110%" }} src="https://firebasestorage.googleapis.com/v0/b/raul-s-hardware-store.appspot.com/o/assets%2FFalse.svg?alt=media&token=435aaf5a-9351-412f-84d4-cc5b5d68dec4" alt="Delete Product" /></button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </>
    )
}

export default ProductList

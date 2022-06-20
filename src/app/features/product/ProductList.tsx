import React, { useEffect, useState } from 'react'
import { Alert, Button, Form, Modal, Table } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../hooks'
import { deleteProductAction, getAllProductsAction, getProductsById, Product } from './productAction';
import ProductCreate from './ProductCreate';
import { getProductsErrors, getProductsStatus, selectAllProducts } from './productSlice';

const ProductList = () => {
    const dispatch = useAppDispatch();

    const products = useAppSelector(selectAllProducts)
    const productsStatus = useAppSelector(getProductsStatus)
    const productsErrors = useAppSelector(getProductsErrors)

    const [haveUnits, setHaveUnits] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [actualProduct, setActualProduct] = useState<Product>({
        name: "",
        description: "",
        units: 0,
        price: 0,
        minimumUnits: 0,
        maximumUnits: 0,
        productSupplierDTO: {
            id: "",
            taxPayerId: "",
            supplierName: "",
            supplierPhone: "",
            supplierNotes: ""
        }
    })
    const showOff = () => setShowModal(false)
    const showOn = () => setShowModal(true)

    useEffect(() => {
        if (productsStatus === 'idle') {
            dispatch(getAllProductsAction())
        }
    }, [productsStatus, dispatch])

    const removeProduct = async (productId: string) => {
        const productToDelete: Product = await getProductsById(productId)
        if (productToDelete.units <= 0) {
            setHaveUnits(false)
            dispatch(deleteProductAction(productId))
            return
        }
        setHaveUnits(true)
    }


    return (
        <>
            <ProductCreate />
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
                                <td align='center' width={15}><button className="tableBtn" onClick={() => { showOn(); setActualProduct(product); }}><img style={{ width: "100%", height: "100%" }} src="https://firebasestorage.googleapis.com/v0/b/raul-s-hardware-store.appspot.com/o/assets%2Fview_icon.svg?alt=media&token=fcb028da-2de8-46ca-acfb-c1edc55d5872" alt="View Product" /></button></td>
                                <td align='center' width={15}><button className="tableBtn" onClick={() => removeProduct(product.id as string)}><img style={{ width: "110%", height: "110%" }} src="https://firebasestorage.googleapis.com/v0/b/raul-s-hardware-store.appspot.com/o/assets%2FFalse.svg?alt=media&token=435aaf5a-9351-412f-84d4-cc5b5d68dec4" alt="Delete Product" /></button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <>
                {haveUnits &&
                    <Alert variant="warning">
                        <Alert.Heading>
                            <h5>Alert message!!!</h5>
                        </Alert.Heading>
                        <p>You cannot delete this product because you have units in stock</p>
                        <Button onClick={() => setHaveUnits(false)}>Close</Button>
                    </Alert>
                }
            </>
            <>
                <Modal
                    show={showModal}
                    size="lg"
                    onHide={showOff}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Product Details</Modal.Title>
                    </Modal.Header>
                    <form>
                        <Modal.Body>
                            <div>
                                <label>Product Name</label>
                                <input
                                    id="productName"
                                    type="text"
                                    name="productName"
                                    className="titleInput"
                                    placeholder="Product Name"
                                    value={actualProduct.name}
                                    style={{ marginLeft: '1rem', marginRight: '10%' }}
                                    required
                                    disabled
                                />
                                <label style={{ marginLeft: '10%' }}>Product Price</label>
                                <input
                                    id="price"
                                    type="number"
                                    name="price"
                                    className="titleInput"
                                    placeholder="Product Price"
                                    value={actualProduct.price}
                                    style={{ marginLeft: '1rem', marginRight: '0' }}
                                    disabled
                                    required
                                />
                            </div>
                            <br />
                            <label>Product Description</label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                id="description"
                                name="description"
                                placeholder="Product Description"
                                value={actualProduct.description}
                                style={{ marginLeft: '0', marginRight: '0' }}
                                disabled
                                required
                            />
                            <br />
                            <div>
                                <label>Minimum Units</label>
                                <input
                                    id="min"
                                    type="number"
                                    name="min"
                                    className="titleInput"
                                    placeholder="Minimum Units"
                                    value={actualProduct.minimumUnits}
                                    style={{ marginLeft: '1rem', marginRight: '8%' }}
                                    disabled
                                    required
                                />
                                <label style={{ marginLeft: '8.5%' }}>Maximum Units</label>
                                <input
                                    id="max"
                                    type="number"
                                    name="max"
                                    className="titleInput"
                                    placeholder="Maximum Units"
                                    value={actualProduct.maximumUnits}
                                    style={{ marginLeft: '1rem', marginRight: '0' }}
                                    disabled
                                    required
                                />
                            </div>
                            <br />
                            <div>
                                <label>Product Supplier</label>
                                <input
                                    id="productSupplierDTO"
                                    type="text"
                                    name="productSupplierDTO"
                                    className="titleInput"
                                    placeholder="Produc Supplier"
                                    value={actualProduct.productSupplierDTO.supplierName.toString()}
                                    style={{ marginLeft: '1rem', marginRight: '0' }}
                                    disabled
                                    required
                                />
                                <label style={{ marginLeft: '16%' }}>Available Units</label>
                                <input
                                    id="units"
                                    type="number"
                                    name="units"
                                    className="titleInput"
                                    placeholder="Available Units"
                                    value={actualProduct.units}
                                    style={{ marginLeft: '1rem', marginRight: '0' }}
                                    disabled
                                    required
                                />
                            </div>
                        </Modal.Body>
                    </form>
                </Modal>
            </>

        </>
    )
}

export default ProductList

import { ChangeEvent, FormEvent, FunctionComponent, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { productSupplier, selectAllSuppliers } from "../productSupplier/ProductSupplierSlice";
import { createProductAction } from "./productAction";

interface IProductDetailProps { }

const ProductCreate: FunctionComponent<IProductDetailProps> = () => {
    const [productName, setProductName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [min, setMin] = useState<number>(0);
    const [max, setMax] = useState<number>(0);
    const [productSupplierDto, setProductSupplierDto] = useState<productSupplier>({
        id: "",
        taxPayerId: "",
        supplierName: "",
        supplierPhone: "",
        supplierNotes: ""
    });
    const [showModal, setShowModal] = useState(false);
    const showOff = () => setShowModal(false);
    const showOn = () => setShowModal(true);
    const dispatch = useAppDispatch();
    const productSuppliers = useAppSelector(selectAllSuppliers)

    const createProductEvent = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (productName && description && price && max && productSupplierDto) {
            dispatch(createProductAction({
                name: productName,
                description,
                units: 0,
                price,
                minimumUnits: min,
                maximumUnits: max,
                productSupplierDTO: {
                    id: productSupplierDto.id,
                    taxPayerId: productSupplierDto.taxPayerId,
                    supplierName: productSupplierDto.supplierName,
                    supplierPhone: productSupplierDto.supplierPhone,
                    supplierNotes: productSupplierDto.supplierNotes
                }
            }))
            setProductName("")
            setDescription("")
            setPrice(0)
            setMin(0)
            setMax(0)
            setProductSupplierDto({
                id: "",
                taxPayerId: "",
                supplierName: "",
                supplierPhone: "",
                supplierNotes: ""
            })
            showOff()
        }
    }

    const setProductSupplier = (e: ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        const selectSupplier: productSupplier = productSuppliers.find((productSupplier) => productSupplier.supplierName === e.target.value) as productSupplier
        setProductSupplierDto(selectSupplier)
    }

    return (
        <>
            <Button variant="primary" onClick={showOn}>
                Create Product
            </Button>
            <Modal
                show={showModal}
                size="lg"
                onHide={showOff}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Create a Product</Modal.Title>
                </Modal.Header>
                <form onSubmit={(e) => createProductEvent(e)}>
                    <Modal.Body>
                        <div>
                            <label>Product Name</label>
                            <input
                                id="productName"
                                type="text"
                                name="productName"
                                className="titleInput"
                                placeholder="Product Name"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                style={{ marginLeft: '1rem', marginRight: '10%' }}
                                required
                            />
                            <label style={{ marginLeft: '10%' }}>Product Price</label>
                            <input
                                id="price"
                                type="number"
                                name="price"
                                className="titleInput"
                                placeholder="Product Price"
                                value={price}
                                min={0}
                                onChange={(e) => setPrice(parseFloat(e.target.value))}
                                style={{ marginLeft: '1rem', marginRight: '0' }}
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
                            value={description}
                            minLength={5}
                            onChange={(e) => setDescription(e.target.value)}
                            style={{ marginLeft: '0', marginRight: '0' }}
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
                                value={min}
                                min={0}
                                onChange={(e) => setMin(parseInt(e.target.value))}
                                style={{ marginLeft: '1rem', marginRight: '8%' }}
                                required
                            />
                            <label style={{ marginLeft: '8.5%' }}>Maximum Units</label>
                            <input
                                id="max"
                                type="number"
                                name="max"
                                className="titleInput"
                                placeholder="Maximum Units"
                                value={max}
                                min={min}
                                onChange={(e) => setMax(parseInt(e.target.value))}
                                style={{ marginLeft: '1rem', marginRight: '0' }}
                                required
                            />
                        </div>
                        <br />
                        <div>
                            <label>Product Supplier</label>
                            <select
                                id="productSupplierDto"
                                name="productSupplierDto"
                                defaultValue="none"
                                onChange={(e) => setProductSupplier(e)}
                                style={{ marginLeft: '0', width: '99%' }}
                                required
                            >
                                <option value="none" disabled hidden>Select an Product Provider</option>
                                {productSuppliers.map((productSupplier, index) =>
                                    <option key={index} value={productSupplier.supplierName.toString()}>{productSupplier.supplierName}</option>)}
                            </select>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={showOff}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary">
                            Create
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
};

export default ProductCreate


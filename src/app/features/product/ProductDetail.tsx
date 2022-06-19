import { FormEvent, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { productSupplier } from "../productSupplier/productSupplierSlice";
import { createProductAction } from "./productAction";


interface IAddProductFormProps { }

const AddProductForm: React.FunctionComponent<IAddProductFormProps> = () => {
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
                        <label className="formLabel">Product Name</label>
                        <input
                            id="productName"
                            type="text"
                            name="productName"
                            className="titleInput"
                            placeholder="Product Name"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            style={{ marginLeft: '4px', marginRight: '4px' }}
                            required
                        />
                        <label className="formLabel">Product Price</label>
                        <input
                            id="price"
                            type="number"
                            name="price"
                            className="titleInput"
                            placeholder="Product Price"
                            value={price}
                            onChange={(e) => setPrice(parseFloat(e.target.value))}
                            style={{ marginLeft: '4px', marginRight: '4px' }}
                            required
                        />
                        <br />
                        <label className="formLabel">Product Description</label>
                        <Form.Control
                            as="textarea"
                            rows={2}
                            id="description"
                            name="description"
                            placeholder="Product Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            style={{ marginLeft: '4px', marginRight: '4px' }}
                            required
                        />
                        <label className="formLabel">Minimun Units</label>
                        <input
                            id="min"
                            type="number"
                            name="min"
                            className="titleInput"
                            placeholder="Minimum Units"
                            value={min}
                            onChange={(e) => setMin(parseInt(e.target.value))}
                            style={{ marginLeft: '4px', marginRight: '4px' }}
                            required
                        />
                        <label className="formLabel">Maximun Units</label>
                        <input
                            id="max"
                            type="number"
                            name="max"
                            className="titleInput"
                            placeholder="Maximum Units"
                            value={max}
                            onChange={(e) => setMax(parseInt(e.target.value))}
                            style={{ marginLeft: '4px', marginRight: '4px' }}
                            required
                        />
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

export default AddProductForm

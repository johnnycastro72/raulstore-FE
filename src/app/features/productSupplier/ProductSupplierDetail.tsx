import * as React from "react";
import { Button, Modal } from "react-bootstrap";
import { useAppDispatch } from "../../hooks";
import { createProductSupplierAction } from "./ProductSupplierAction";

interface IAddProductSupplierFormProps { }

const AddProductSupplierForm: React.FunctionComponent<IAddProductSupplierFormProps> = () => {
    const [productSupplierId, SetProductSupplierId] = React.useState("");
    const [productSupplierName, SetProductSupplierName] = React.useState("");
    const [productSupplierPhone, SetProductSupplierPhone] = React.useState("");
    const [showModal, setShowModal] = React.useState(false);
    const showOff = () => setShowModal(false);
    const showOn = () => setShowModal(true);
    const dispatch = useAppDispatch();

    const createProductSupplierEvent = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (productSupplierId && productSupplierName && productSupplierPhone) {
            dispatch(createProductSupplierAction({
                taxPayerId: productSupplierId,
                supplierName: productSupplierName,
                supplierPhone: productSupplierPhone,
                supplierNotes: ""
            }))
            SetProductSupplierId("")
            SetProductSupplierName("")
            SetProductSupplierPhone("")
            showOff()
        }
    };

    return (
        <>
            <Button variant="primary" onClick={showOn}>
                Create Product Supplier
            </Button>

            <Modal
                show={showModal}
                size="lg"
                onHide={showOff}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Create a Product Supplier</Modal.Title>
                </Modal.Header>
                <form onSubmit={(e) => createProductSupplierEvent(e)}>
                    <Modal.Body>
                        <label className="formLabel">Tax Payer Id</label>
                        <input
                            id="productSupplierId"
                            type="text"
                            name="productSupplierId"
                            className="titleInput"
                            placeholder="Supplier Tax Payer Id"
                            value={productSupplierId}
                            onChange={(e) => SetProductSupplierId(e.target.value)}
                            style={{ marginLeft: '4px', marginRight: '4px' }}
                            required
                        />
                        <label className="formLabel">Name</label>
                        <input
                            id="productSupplierName"
                            type="text"
                            name="productSupplierName"
                            className="titleInput"
                            placeholder="Supplier Name"
                            value={productSupplierName}
                            onChange={(e) => SetProductSupplierName(e.target.value)}
                            style={{ marginLeft: '4px', marginRight: '4px' }}
                            required
                        />
                        <label className="formLabel">Phone</label>
                        <input
                            id="productSupplierPhone"
                            type="text"
                            name="productSupplierPhone"
                            className="titleInput"
                            placeholder="Supplier Phone"
                            value={productSupplierPhone}
                            onChange={(e) => SetProductSupplierPhone(e.target.value)}
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
    );
};

export default AddProductSupplierForm;
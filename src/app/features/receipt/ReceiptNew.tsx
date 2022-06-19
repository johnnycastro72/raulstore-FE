import moment from "moment";
import { ChangeEvent, FormEvent, FunctionComponent, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getProductsById, Product } from "../product/ProductAction";
import { selectAllProducts } from "../product/productSlice";
import { productSupplier, selectAllSuppliers } from "../productSupplier/ProductSupplierSlice";
import ReceiptNoteSlice, { receiptProduct, selectAllReceipts } from "./ReceiptNoteSlice";

interface IReceiptNoteProps { }

const ReceiptNew: FunctionComponent<IReceiptNoteProps> = () => {
    const [receiptNumber, setReceiptNumber] = useState<string>("")
    const [productSupplier, setProductSupplier] = useState<productSupplier>()
    const [receiptDate, setReceiptDate] = useState<string>(moment().format("YYYY-MM-DD HH:mmZ"));
    const [items, setItems] = useState<receiptProduct[]>([]);

    const [showModal, setShowModal] = useState<boolean>(false);
    const showOff = () => setShowModal(false);
    const showOn = () => setShowModal(true);
    const dispatch = useAppDispatch();
    const productSuppliers = useAppSelector(selectAllSuppliers);
    const products = useAppSelector(selectAllProducts);

    const createReceiptEvent = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    const selectProductSupplier = (e: ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        const selectSupplier: productSupplier = productSuppliers.find((productSupplier) => productSupplier.supplierName === e.target.value) as productSupplier
        setProductSupplier(selectSupplier)
    }

    const removeItem = (productId: string) => {
        dispatch(deleteItemAction(productId))
    }

    return (
        <>
            <Button variant="primary" onClick={showOn}>
                New Receipt Note
            </Button>
            <Modal
                show={showModal}
                size="lg"
                onHide={showOff}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>New Receipt Note</Modal.Title>
                </Modal.Header>
                <form onSubmit={(e) => createReceiptEvent(e)}>
                    <Modal.Body>
                        <div>
                            <label>Receipt Number</label>
                            <input
                                id="receiptNumber"
                                type="text"
                                name="receiptNumber"
                                className="titleInput"
                                placeholder="Product Supplier Receipt Number"
                                value={receiptNumber}
                                onChange={(e) => setReceiptNumber(e.target.value)}
                                style={{ marginLeft: '1rem', marginRight: '10%' }}
                                required
                            />
                            <label style={{ marginLeft: '9%' }}>Receipt Date</label>
                            <input
                                id="receiptDate"
                                type="datetime"
                                name="receiptDate"
                                className="titleInput"
                                placeholder="Receipt Date"
                                value={receiptDate}
                                style={{ marginLeft: '1rem', marginRight: '0' }}
                                disabled
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
                                onChange={(e) => selectProductSupplier(e)}
                                style={{ marginLeft: '0', width: '99%' }}
                                required
                            >
                                <option value="none" disabled hidden>Select an Product Provider</option>
                                {productSuppliers.map((productSupplier, index) =>
                                    <option key={index} value={productSupplier.supplierName.toString()}>{productSupplier.supplierName}</option>)}
                            </select>
                        </div>
                        <div>
                            <Table striped bordered hover size="sm" responsive>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Quantity</th>
                                        <th>Del</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((receiptProduct: receiptProduct) => {
                                        return (
                                            <tr key={receiptProduct.productId}>
                                                <td>{receiptProduct.productName}</td>
                                                <td align='center'>{receiptProduct.productUnits}</td>
                                                <td align='center'>{receiptProduct.quantity}</td>
                                                <td align='center' width={15}>
                                                    <button className="tableBtn" onClick={
                                                        () => removeItem(receiptProduct.productId as string)}><img style={
                                                            { width: "110%", height: "110%" }}
                                                            src="https://firebasestorage.googleapis.com/v0/b/raul-s-hardware-store.appspot.com/o/assets%2FFalse.svg?alt=media&token=435aaf5a-9351-412f-84d4-cc5b5d68dec4"
                                                            alt="Delete Product" />
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={showOff}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary">
                            Register
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}

export default ReceiptNew
/*
{
  "id": "string",
  "receiptNumber": "string",
  "productSupplier": {
    "id": "string",
    "taxPayerId": "string",
    "supplierName": "string",
    "supplierPhone": "string",
    "supplierNotes": "string"
  },
  "receiptDate": "2022-06-19T19:49:03.467Z",
  "items": [
    {
      "productId": "string",
      "productName": "string",
      "quantity": 0,
      "productUnits": 0,
      "maximumUnits": 0
    }
  ]
}    */

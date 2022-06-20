import moment from "moment";
import { ChangeEvent, FormEvent, FunctionComponent, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Product } from "../product/ProductAction";
import { productSupplier, selectAllSuppliers } from "../productSupplier/ProductSupplierSlice";
import { getProductsByProductSupplierId } from "./ReceiptNoteAction";
import { receiptProduct } from "./ReceiptNoteSlice";

interface IReceiptNoteProps { }

const ReceiptNew: FunctionComponent<IReceiptNoteProps> = () => {
    const [receiptNumber, setReceiptNumber] = useState<string>("")
    const [receiptProductSupplier, setReceiptProductSupplier] = useState<productSupplier>({
        id: "",
        supplierName: "",
        supplierNotes: "",
        supplierPhone: "",
        taxPayerId: ""
    })

    const [receiptDate, setReceiptDate] = useState<string>(moment().format("YYYY-MM-DD HH:mmZ"));
    const [items, setItems] = useState<receiptProduct[]>([]);

    const [itemName, setItemName] = useState("");
    const [itemQuantity, setItemQuantity] = useState(0);

    const [showModal, setShowModal] = useState<boolean>(false);
    const [showItem, setShowItem] = useState<boolean>(false);
    const [supplierProducts, setSupplierProducts] = useState<Product[]>([] as Product[])
    const showOff = () => setShowModal(false);
    const showOn = () => setShowModal(true);
    const showItemOn = () => setShowItem(true);
    const showItemOff = () => setShowItem(false);
    const dispatch = useAppDispatch();
    const productSuppliers = useAppSelector(selectAllSuppliers);

    const createReceiptEvent = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    const selectProductSupplier = async (e: ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        const selectSupplier: productSupplier = productSuppliers.find((productSupplier) => productSupplier.supplierName === e.target.value) as productSupplier;
        if (selectSupplier)
        setReceiptProductSupplier(selectSupplier);
        console.log(receiptProductSupplier);

        const receiptSupplierId = receiptProductSupplier.id as string
        const supplierProductsList: Product[] = await getProductsByProductSupplierId(receiptSupplierId) as Product[];
        setSupplierProducts(supplierProductsList);
        console.log(receiptSupplierId)
        console.log(supplierProductsList)
    }

    const selectItemProduct = (e: ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setItemName(e.target.value)
    }

    const removeItem = (productId: string) => {
        const itemsWithoutDeletedItem = items.filter((item) => item.productId != productId)
        setItems(itemsWithoutDeletedItem)
    }

    const cleanReceipt = () => {
        setReceiptNumber("");
        setReceiptDate(moment().format("YYYY-MM-DD HH:mmZ"));
        setReceiptProductSupplier({
            id: "",
            supplierName: "",
            supplierNotes: "",
            supplierPhone: "",
            taxPayerId: ""
        } as productSupplier);
        setItems([]);
    }

    return (
        <>
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
                                <Button variant="primary" disabled={!(receiptProductSupplier?.supplierName)} onClick={showItemOn}>
                                    Add an Item
                                </Button>
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
                                                                alt="Delete Item" />
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
                            <Button variant="secondary" onClick={() => {
                                showOff();
                                cleanReceipt();
                            }}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="primary">
                                Register
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </>
            <>
                <Modal
                    show={showItem}
                    size="sm"
                    onHide={showItemOff}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Add an Item</Modal.Title>
                    </Modal.Header>
                    <form>
                        <Modal.Body>
                            <div>
                                <label>Select a Product</label>
                                <select
                                    id="itemName"
                                    name="itemName"
                                    defaultValue="none"
                                    onChange={(e) => selectItemProduct(e)}
                                    style={{ marginLeft: '0', width: '99%' }}
                                    required
                                >
                                    <option value="none" disabled hidden>Select an Product</option>
                                    {supplierProducts.map((supplierProduct, index) =>
                                        <option key={index} value={supplierProduct.name.toString()}>{supplierProduct.name}</option>)}
                                </select>
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                            </div>
                        </Modal.Body>
                    </form>
                </Modal>
            </>
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

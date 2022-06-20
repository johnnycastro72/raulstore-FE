import moment from "moment";
import { ChangeEvent, FormEvent, FunctionComponent, useEffect, useState } from "react";
import { Alert, Button, Modal, Table } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Product } from "../product/productAction";
import { productSupplier, selectAllSuppliers } from "../productSupplier/ProductSupplierSlice";
import { getProductsByProductSupplierId, newReceiptNoteAction } from "./ReceiptNoteAction";
import { receiptProduct } from "./ReceiptNoteSlice";

interface IReceiptNoteProps { }

const ReceiptNew: FunctionComponent<IReceiptNoteProps> = () => {
    const [receiptNumber, setReceiptNumber] = useState<string>("")
    const [receiptSupplierName, setReceiptSupplierName] = useState<string>("")
    const [receiptDate, setReceiptDate] = useState<string>(moment().format("YYYY-MM-DD HH:mmZ"));
    const [items, setItems] = useState<receiptProduct[]>([]);

    const [itemName, setItemName] = useState("");
    const [itemQuantity, setItemQuantity] = useState(0);
    const [tooMuch, setTooMuch] = useState(false);

    const [showModal, setShowModal] = useState<boolean>(false);
    const [showItem, setShowItem] = useState<boolean>(false);
    const [supplierProducts, setSupplierProducts] = useState<Product[]>([] as Product[])
    const showOff = () => setShowModal(false);
    const showOn = () => setShowModal(true);
    const showItemOn = () => setShowItem(true);
    const showItemOff = () => setShowItem(false);
    const productSuppliers: productSupplier[] = useAppSelector(selectAllSuppliers);
    const dispatch = useAppDispatch();

    useEffect(() => {

    }, [receiptNumber, receiptSupplierName, receiptDate, items, supplierProducts])


    const createReceiptEvent = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (receiptNumber && receiptSupplierName && receiptDate && items) {
            const productSupplierDto = productSuppliers.find((supplier) => supplier.supplierName === receiptSupplierName) as productSupplier;
           dispatch(newReceiptNoteAction({
                receiptNumber,
                productSupplier: productSupplierDto,
                receiptDate: moment().format("YYYY-mm-ddTHH:MM:ss"),
                items
            }))
            setReceiptNumber("");
            setReceiptSupplierName("");
            setReceiptDate("")
            setItems([])
            showOff()
        }
    }

    const addReceiptItemEvent = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const actualProduct = supplierProducts.find((product) => product.name === itemName) as Product;
        const actualItem: receiptProduct = {
            productId: actualProduct.id as string,
            productName: itemName,
            quantity: itemQuantity,
            productUnits: actualProduct.units,
            maximumUnits: actualProduct.maximumUnits
        }
        if (actualItem.maximumUnits >= (actualItem.productUnits + actualItem.quantity)) {
            const listOfAddedItems = items.map((item) => {
                if (item.productId != actualItem.productId) {
                    return item;
                }
                return { ...item, quantity: (item.quantity + actualItem.quantity) }
            })
            const haveActualItem = listOfAddedItems.find((product) => product.productId === actualItem.productId)?.productId as string
            const finalItemList = (haveActualItem) ? listOfAddedItems : [...listOfAddedItems, actualItem];
            const newActualItem = finalItemList.find((product) => product.productId === actualItem.productId) as receiptProduct;
            if (newActualItem.maximumUnits >= (newActualItem.productUnits + newActualItem.quantity)) {
                setItems(finalItemList);
                cleanItem();
                return
            }
        }
        setShowItem(true);
        setTooMuch(true);
    }

    const removeItem = (productId: string) => {
        const itemsWithoutDeletedItem = items.filter((item) => item.productId != productId)
        setItems(itemsWithoutDeletedItem)
    }

    const selectProductSupplier = (e: ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setReceiptSupplierName(e.target.value);
    }

    const productsBySupplier = async () => {
        const selectSupplier = productSuppliers.find((productSupplier) => productSupplier.supplierName === receiptSupplierName) as productSupplier
        const supplierProductsList: Product[] = await getProductsByProductSupplierId(selectSupplier.id as string);
        setSupplierProducts(supplierProductsList);
    }

    const selectItemProduct = (e: ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setItemName(e.target.value)
    }

    const cleanReceipt = () => {
        setReceiptNumber("");
        setReceiptDate(moment().format("YYYY-MM-DD HH:mmZ"));
        setReceiptSupplierName("");
        setItems([]);
    }

    const cleanItem = () => {
        setItemName("");
        setItemQuantity(0);
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
                                <Button variant="primary" disabled={!(receiptSupplierName)} onClick={() => { showItemOn(); productsBySupplier(); }}>
                                    Add an Item
                                </Button>
                                <Table striped bordered hover size="sm" responsive>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Units</th>
                                            <th>Maximum</th>
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
                                                    <td align='center'>{receiptProduct.maximumUnits}</td>
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
                    <form onSubmit={(e) => addReceiptItemEvent(e)}>
                        <Modal.Body>
                            <div>
                                <label>Received Product</label>
                                <select
                                    id="itemName"
                                    name="itemName"
                                    defaultValue="none"
                                    onChange={(e) => selectItemProduct(e)}
                                    style={{ marginLeft: '0', width: '99%' }}
                                    required
                                >
                                    <option value="none" disabled hidden>Select a Product</option>
                                    {supplierProducts.map((supplierProduct, index) =>
                                        <option key={index} value={supplierProduct.name.toString()}>{supplierProduct.name}</option>)}
                                </select>
                            </div>
                            <br />
                            <div>
                                <label>Received Units</label>
                                <input
                                    id="itemQuantity"
                                    type="number"
                                    name="itemQuantity"
                                    className="titleInput"
                                    placeholder="Received Units"
                                    value={itemQuantity}
                                    min={1}
                                    onChange={(e) => setItemQuantity(parseInt(e.target.value))}
                                    style={{ width: '98%' }}
                                    required
                                />
                            </div>
                            <br />
                            <>
                                {tooMuch &&
                                    <Alert variant="warning">
                                        <Alert.Heading>
                                            <h5>Alert message!!!</h5>
                                        </Alert.Heading>
                                        <p>You are receiving more units than the maximum allowed</p>
                                        <Button onClick={() => setTooMuch(false)}>Close</Button>
                                    </Alert>
                                }
                            </>
                            <br />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => { showItemOff(); cleanItem(); }}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="primary" onClick={showItemOff}>
                                Add Item
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </>
        </>
    )
}

export default ReceiptNew

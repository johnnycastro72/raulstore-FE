import moment from "moment"
import { ChangeEvent, FormEvent, FunctionComponent, useEffect, useState } from "react"
import { Alert, Button, Modal, Table } from "react-bootstrap"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { rootState } from "../../store/store"
import { addUnitsToInventoryAction, Product } from "../product/productAction"
import { getProductsInStockGreaterThanAction, newBillNoteAction } from "./BillNoteAction"
import { billProduct } from "./BillNoteSlice"
import { v4 as uuidv4 } from 'uuid'

interface IBillNoteProps { }

const BillNew: FunctionComponent<IBillNoteProps> = () => {
    const { user } = useAppSelector((state: rootState) => state.logged)
    const [billId, setBillId] = useState<string>(uuidv4())
    const [billDate, setBillDate] = useState<string>(moment().format("YYYY-MM-DD HH:mmZ"))
    const [customerName, setCustomerName] = useState<string>("")
    const [salesPerson, setSalesPerson] = useState<string>(user?.displayName as string)
    const [billTotal, setBillTotal] = useState<number>(0)
    const [items, setItems] = useState<billProduct[]>([] as billProduct[])

    const [itemName, setItemName] = useState("");
    const [itemQuantity, setItemQuantity] = useState(0);
    const [itemPrice, setItemPrice] = useState(0);
    const [tooLow, setTooLow] = useState(false);

    const [showModal, setShowModal] = useState<boolean>(false);
    const [showItem, setShowItem] = useState<boolean>(false);
    const showOff = () => setShowModal(false);
    const showOn = () => setShowModal(true);
    const showItemOn = () => setShowItem(true);
    const showItemOff = () => setShowItem(false);

    const [inStockProducts, setInStockProducts] = useState<Product[]>([] as Product[])
    const dispatch = useAppDispatch();

    useEffect(() => {

    }, [billId, customerName, billDate, items, inStockProducts])

    const productsInStock = async () => {
        const inStockProductList: Product[] = await getProductsInStockGreaterThanAction(1 as number);
        setInStockProducts(inStockProductList);
    }

    const cleanBill = () => {
        setBillId("");
        setBillDate(moment().format("YYYY-MM-DD HH:mmZ"));
        setBillTotal(0);
        setCustomerName("");
        setSalesPerson("");
        setItems([]);
    }

    const cleanItem = () => {
        setItemName("");
        setItemPrice(0);
        setItemQuantity(0);
    }

    const createBillEvent = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (customerName && items) {
            dispatch(newBillNoteAction({
                billId,
                billDate: moment().toISOString(),
                customerName,
                salesPerson,
                billTotal,
                items
            }))
            items.map((item) => {
                const productToChange = inStockProducts.find((product) => product.id === item.productId) as Product;
                const productUpated = { ...productToChange, units: (productToChange.units - item.billQuantity) }
                dispatch(addUnitsToInventoryAction(productUpated))
            })
            setBillId("");
            setBillDate("");
            setCustomerName("");
            setSalesPerson("");
            setBillTotal(0);
            setItems([]);
            showOff();
        }
    }

    const addBillItemEvent = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const actualProduct = inStockProducts.find((product) => product.name === itemName) as Product;
        const actualItem: billProduct = {
            productId: actualProduct.id as string,
            productName: actualProduct.name,
            billQuantity: itemQuantity,
            productMinimumUnits: actualProduct.minimumUnits,
            productUnits: actualProduct.units,
            productPrice: actualProduct.price
        }
        if (actualItem.productMinimumUnits <= (actualItem.productUnits - actualItem.billQuantity)) {
            const listOfAddedItems = items.map((item) => {
                if (item.productId != actualItem.productId) {
                    return item;
                }
                return {
                    ...item, billQuantity: (item.billQuantity + actualItem.billQuantity)
                }
            })
            const haveActualItem = listOfAddedItems.find((product) => product.productId === actualItem.productId)?.productId as string;
            const finalItemList = (haveActualItem) ? listOfAddedItems : [...listOfAddedItems, actualItem];
            const newActualItem = finalItemList.find((product) => product.productId === actualItem.productId) as billProduct;
            if (newActualItem.productMinimumUnits > (newActualItem.productUnits - newActualItem.billQuantity)) {
                alert("This product is running out of stock, it is suggested to order more from the supplier")
            }
            if (newActualItem.productUnits >= newActualItem.billQuantity) {
                const newBillTotal = finalItemList.reduce((accumulator, obj) => {
                    return accumulator + (obj.billQuantity * obj.productPrice);
                }, 0);
                setBillTotal(newBillTotal);
                setItems(finalItemList);
                cleanItem();
                return
            }
        }
        setShowItem(true);
        setTooLow(true);
    }

    const removeItem = (productId: string) => {
        const itemsWithoutDeletedItem = items.filter((item) => item.productId != productId)
        const newBillTotal = itemsWithoutDeletedItem.reduce((accumulator, obj) => {
            return accumulator + (obj.billQuantity * obj.productPrice);
        }, 0);
        setBillTotal(newBillTotal);
        setItems(itemsWithoutDeletedItem)
    }

    const selectItemProduct = (e: ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setItemName(e.target.value)
        const actualItemPrice = inStockProducts.find((product) => product.name === e.target.value)?.price as number;
        setItemPrice(actualItemPrice);
    }

    return (
        <>
            <>
                <Button variant="primary" onClick={showOn}>
                    New Bill Note
                </Button>
                <Modal
                    show={showModal}
                    size="lg"
                    onHide={showOff}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <b style={{ textAlign: 'left' }}>New Bill Note</b>
                        </Modal.Title>
                    </Modal.Header>
                    <form onSubmit={(e) => createBillEvent(e)}>
                        <Modal.Body>
                            <div>
                                <label>Bill Id</label>
                                <input
                                    id="billId"
                                    type="text"
                                    name="billId"
                                    className="titleInput"
                                    placeholder="Bill Id"
                                    value={billId}
                                    style={{ marginLeft: '1rem', marginRight: '8%', width: '40%' }}
                                    disabled
                                    required
                                />
                                <label style={{ marginLeft: '9%' }}>Bill Date</label>
                                <input
                                    id="billDate"
                                    type="datetime"
                                    name="billDate"
                                    className="titleInput"
                                    placeholder="Bill Date"
                                    value={billDate}
                                    style={{ marginLeft: '1rem', marginRight: '0' }}
                                    disabled
                                    required
                                />
                            </div>
                            <div>
                                <label>Sales Person</label>
                                <input
                                    id="salesPerson"
                                    type="text"
                                    name="salesPerson"
                                    className="titleInput"
                                    placeholder="Sales Person"
                                    value={salesPerson}
                                    style={{ width: '99%' }}
                                    disabled
                                    required
                                />
                            </div>
                            <br />
                            <div>
                                <label>Customer Name</label>
                                <input
                                    id="customerName"
                                    type="text"
                                    name="customerName"
                                    className="titleInput"
                                    placeholder="Customer Name"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    style={{ width: '99%' }}
                                    required
                                />
                            </div>
                            <br />
                            <Button variant="primary" disabled={!(customerName)} onClick={() => { showItemOn(); productsInStock(); }}>
                                Add an Item
                            </Button>
                            <Table striped bordered hover size="sm" responsive>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Units</th>
                                        <th>Minimum</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Total</th>
                                        <th>Del</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((billProduct: billProduct) => {
                                        return (
                                            <tr key={billProduct.productId}>
                                                <td>{billProduct.productName}</td>
                                                <td align="center">{billProduct.productUnits}</td>
                                                <td align="center">{billProduct.productMinimumUnits}</td>
                                                <td align="center">{billProduct.billQuantity}</td>
                                                <td align="right">{billProduct.productPrice}</td>
                                                <td align="right">{billProduct.billQuantity * billProduct.productPrice}</td>
                                                <td align='center' width={15}>
                                                    <button className="tableBtn" onClick={
                                                        () => removeItem(billProduct.productId as string)}><img style={
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
                        </Modal.Body>
                        <Modal.Footer>
                            <label style={{ marginRight: '10%', fontWeight: 'bold', fontSize: '24px' }}>Bill Total:</label>
                            <input
                                id="billTotal"
                                type="number"
                                name="billTotal"
                                className="titleInput"
                                placeholder="Bill Total"
                                value={billTotal}
                                style={{ fontSize: '24px', marginLeft: '1rem', marginRight: '21%', width: '30%' }}
                                disabled
                                required
                            />

                            <Button variant="secondary" onClick={() => {
                                showOff();
                                cleanBill();
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
                    <form onSubmit={(e) => addBillItemEvent(e)}>
                        <Modal.Body>
                            <div>
                                <label>Select a Product to Sale</label>
                                <select
                                    id="itemName"
                                    name="itemName"
                                    defaultValue="none"
                                    onChange={(e) => selectItemProduct(e)}
                                    style={{ marginLeft: '0', width: '99%' }}
                                    required
                                >
                                    <option value="none" disabled hidden>Select a Product</option>
                                    {inStockProducts.map((inStockProduct, index) =>
                                        <option key={index} value={inStockProduct.name.toString()}>{inStockProduct.name}</option>)}
                                </select>
                            </div>
                            <br />
                            <div>
                                <label>Units to Sale</label>
                                <input
                                    id="itemQuantity"
                                    type="number"
                                    name="itemQuantity"
                                    className="titleInput"
                                    placeholder="Units to Sale"
                                    value={itemQuantity}
                                    min={1}
                                    onChange={(e) => setItemQuantity(parseInt(e.target.value))}
                                    style={{ width: '98%' }}
                                    required
                                />
                            </div>
                            <div>
                                <label>Unit Price</label>
                                <input
                                    id="itemPrice"
                                    type="number"
                                    name="itemPrice"
                                    className="titleInput"
                                    placeholder="Unit Price"
                                    value={itemPrice}
                                    min={1}
                                    onChange={(e) => setItemPrice(parseInt(e.target.value))}
                                    style={{ width: '98%' }}
                                    required
                                />
                            </div>
                            <div>
                                <label>Amount</label>
                                <input
                                    id="itemAmount"
                                    type="number"
                                    name="itemAmount"
                                    className="titleInput"
                                    placeholder="Amount"
                                    value={itemQuantity * itemPrice}
                                    style={{ width: '98%' }}
                                    disabled
                                    required
                                />
                            </div>
                            <br />
                            <>
                                {tooLow &&
                                    <Alert variant="warning">
                                        <Alert.Heading>
                                            <h5>Alert message!!!</h5>
                                        </Alert.Heading>
                                        <p>You are trying to sell more than the quantity available</p>
                                        <Button onClick={() => setTooLow(false)}>Close</Button>
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

export default BillNew
import moment from "moment"
import { FormEvent, FunctionComponent, useEffect, useState } from "react"
import { Button, Modal, Table } from "react-bootstrap"
import { useAppSelector } from "../../hooks"
import { rootState } from "../../store/store"
import { Product } from "../product/productAction"
import { getProductsInStockGreaterThanAction } from "./BillNoteAction"
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
                            <Button variant="primary" disabled={!(customerName && billId)} onClick={() => { showItemOn(); productsInStock(); }}>
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
        </>
    )
}

export default BillNew

{/* {
  "id": "string",
  "billId": "string",
  "billDate": "2022-06-20T14:40:48.489Z",
  "customerName": "string",
  "salesPerson": "string",
  "billTotal": 0,
  "items": [
    {
      "productId": "string",
      "productName": "string",
      "billQuantity": 0,
      "productPrice": 0,
      "productUnits": 0,
      "productMinimumUnits": 0
    }
  ]
} */}
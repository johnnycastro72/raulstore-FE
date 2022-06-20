import { useEffect, useState } from "react";
import { Modal, Table } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../hooks"
import BillNew from "./BillNew";
import { getAllBillNotesAction } from "./BillNoteAction";
import { billNote, getBillsErrors, getBillsStatus, selectAllBills } from "./BillNoteSlice";

const BillNotesList = () => {
    const dispatch = useAppDispatch();

    const bills = useAppSelector(selectAllBills);
    const billsStatus = useAppSelector(getBillsStatus);
    const billsErrors = useAppSelector(getBillsErrors);

    const [actualBill, setActualBill] = useState<billNote>();
    const [showModal, setShowModal] = useState(false)
    const showOff = () => setShowModal(false)
    const showOn = () => setShowModal(true)

    useEffect(() => {
        if (billsStatus === 'idle') {
            dispatch(getAllBillNotesAction())
        }
    }, [billsStatus, dispatch])

    return (
        <>
            <h1 style={{backgroundColor: '#e8e6e6'}}>Bill Notes List</h1>
            <BillNew />
            <Table striped bordered hover size="sm" responsive>
                <thead>
                    <tr>
                        <th>Bill Id</th>
                        <th>Bill Date</th>
                        <th>Customer Name</th>
                        <th>Sales Person</th>
                        <th>Bill Total</th>
                        <th>Items</th>
                        <th>View</th>
                    </tr>
                </thead>
                <tbody>
                    {bills.map((bill: billNote) => {
                        return (
                            <tr key={bill.id}>
                                <td>{bill.billId}</td>
                                <td>{bill.billDate}</td>
                                <td>{bill.customerName}</td>
                                <td>{bill.salesPerson}</td>
                                <td>{bill.billTotal}</td>
                                <td>{bill.items.length}</td>
                                <td align='center' width={15}>
                                    <button
                                        className="tableBtn"
                                        onClick={() => { showOn(); setActualBill(bill); }}>
                                        <img style={{ width: "100%", height: "100%" }}
                                            src="https://firebasestorage.googleapis.com/v0/b/raul-s-hardware-store.appspot.com/o/assets%2Fview_icon.svg?alt=media&token=fcb028da-2de8-46ca-acfb-c1edc55d5872"
                                            alt="View Product"
                                        />
                                    </button>
                                </td>
                            </tr>);
                    })}
                </tbody>
            </Table>
            <Modal
                show={showModal}
                size="lg"
                onHide={showOff}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Bill Note Details</Modal.Title>
                </Modal.Header>
                <form>
                    <Modal.Body>
                        <div>
                            <label>Bill Id</label>
                            <input
                                id="billId"
                                type="text"
                                name="billId"
                                className="titleInput"
                                placeholder="Bill Id"
                                value={actualBill?.billId}
                                style={{ marginLeft: '1rem', marginRight: '10%' }}
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
                                value={actualBill?.billDate}
                                style={{ marginLeft: '1rem', marginRight: '0' }}
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
                                placeholder="Bill Id"
                                value={actualBill?.customerName}
                                style={{ marginLeft: '1rem', marginRight: '10%' }}
                                disabled
                                required
                            />
                            <label>Sales Person</label>
                            <input
                                id="salesPerson"
                                type="text"
                                name="salesPerson"
                                value={actualBill?.salesPerson}
                                style={{ marginLeft: '0', width: '99%' }}
                                disabled
                                required
                            />
                            <label>Bill Total</label>
                            <input
                                id="billTotal"
                                type="text"
                                name="billTotal"
                                value={actualBill?.billTotal}
                                style={{ marginLeft: '0', width: '99%' }}
                                disabled
                                required
                            />
                        </div>
                        <div>
                            <Table striped bordered hover size="sm" responsive>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Units</th>
                                        <th>Minimum</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {actualBill?.items.map((billProduct) => {
                                        return (
                                            <tr key={billProduct.productId}>
                                                <td>{billProduct.productName}</td>
                                                <td align='center'>{billProduct.productUnits}</td>
                                                <td align='center'>{billProduct.productMinimumUnits}</td>
                                                <td align='center'>{billProduct.billQuantity}</td>
                                                <td align='center'>{billProduct.productPrice}</td>
                                                <td align='center'>{billProduct.billQuantity*billProduct.productPrice}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </div>
                    </Modal.Body>
                </form>
            </Modal>
        </>
    )
}

export default BillNotesList

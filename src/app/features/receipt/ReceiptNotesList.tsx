import { useEffect, useState } from "react";
import { Modal, Table } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../hooks"
import ReceiptNew from "./ReceiptNew";
import { getAllReceiptNotesAction } from "./ReceiptNoteAction";
import { getReceiptsErrors, getReceiptsStatus, receiptNote, selectAllReceipts } from "./ReceiptNoteSlice";

const ReceiptNotesList = () => {
    const dispatch = useAppDispatch();

    const receipts = useAppSelector(selectAllReceipts);
    const receiptsStatus = useAppSelector(getReceiptsStatus);
    const receiptsErrors = useAppSelector(getReceiptsErrors);

    const [actualReceipt, setActualReceipt] = useState<receiptNote>();
    const [showModal, setShowModal] = useState(false)
    const showOff = () => setShowModal(false)
    const showOn = () => setShowModal(true)

    useEffect(() => {
        if (receiptsStatus === 'idle') {
            dispatch(getAllReceiptNotesAction())
        }
    }, [receiptsStatus, dispatch])

    return (
        <>
            <ReceiptNew />
            <Table striped bordered hover size="sm" responsive>
                <thead>
                    <tr>
                        <th>Receipt Number</th>
                        <th>Receipt Date</th>
                        <th>Product Supplier</th>
                        <th>Items</th>
                        <th>View</th>
                    </tr>
                </thead>
                <tbody>
                    {receipts.map((receipt: receiptNote) => {
                        return (
                            <tr key={receipt.receiptNumber}>
                                <td>{receipt.receiptNumber}</td>
                                <td>{receipt.receiptDate}</td>
                                <td>{receipt.productSupplier.supplierName}</td>
                                <td>{receipt.items.length}</td>
                                <td align='center' width={15}>
                                    <button
                                        className="tableBtn"
                                        onClick={() => { showOn(); setActualReceipt(receipt); }}>
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
                    <Modal.Title>Receipt Note Details</Modal.Title>
                </Modal.Header>
                <form>
                    <Modal.Body>
                        <div>
                            <label>Receipt Number</label>
                            <input
                                id="receiptNumber"
                                type="text"
                                name="receiptNumber"
                                className="titleInput"
                                placeholder="Product Supplier Receipt Number"
                                value={actualReceipt?.receiptNumber}
                                style={{ marginLeft: '1rem', marginRight: '10%' }}
                                disabled
                                required
                            />
                            <label style={{ marginLeft: '9%' }}>Receipt Date</label>
                            <input
                                id="receiptDate"
                                type="datetime"
                                name="receiptDate"
                                className="titleInput"
                                placeholder="Receipt Date"
                                value={actualReceipt?.receiptDate}
                                style={{ marginLeft: '1rem', marginRight: '0' }}
                                disabled
                                required
                            />
                        </div>
                        <br />
                        <div>
                            <label>Product Supplier</label>
                            <input
                                id="productSupplierDto"
                                type="text"
                                name="productSupplierDto"
                                value={actualReceipt?.productSupplier.supplierName}
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
                                        <th>Maximum</th>
                                        <th>Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {actualReceipt?.items.map((receiptProduct) => {
                                        return (
                                            <tr key={receiptProduct.productId}>
                                                <td>{receiptProduct.productName}</td>
                                                <td align='center'>{receiptProduct.productUnits}</td>
                                                <td align='center'>{receiptProduct.maximumUnits}</td>
                                                <td align='center'>{receiptProduct.quantity}</td>
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

export default ReceiptNotesList

import { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../hooks"
import ReceiptNew from "./ReceiptNew";
import { getAllReceiptNotesAction } from "./ReceiptNoteAction";
import { getReceiptsErrors, getReceiptsStatus, receiptNote, selectAllReceipts } from "./ReceiptNoteSlice";

const ReceiptNotesList = () => {
    const dispatch = useAppDispatch();

    const receipts = useAppSelector(selectAllReceipts);
    const receiptsStatus = useAppSelector(getReceiptsStatus);
    const receiptsErrors = useAppSelector(getReceiptsErrors);

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
                                <td>{receipt.receiptDate}</td>
                                <td>{receipt.productSupplier.supplierName}</td>
                                <td>{receipt.items.length}</td>
                            </tr>);
                    })}
                </tbody>
            </Table>
        </>
    )
}

export default ReceiptNotesList

import { appDispatch } from "../app/store/store"
import { getAllProductSupplier } from "../app/features/productSupplierSlice"

const APIURL = "https://raulstorebe.herokuapp.com/api/v1/productsuppliers"
const CONTENT = {"Content-type":"application/json"}

const getAllProductSuppliersAction = async (dispatch:appDispatch) => {
    let result = await fetch(`${APIURL}`, {method: "GET"});
    result.ok ? 
    dispatch(getAllProductSupplier(await result.json())) : 
    console.log("Error getting all product providers" );
}

export {getAllProductSuppliersAction}

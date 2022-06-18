import { getAllProductSupplier } from "../features/productSupplier/productSupplierSlice"
import { createAsyncThunk } from "@reduxjs/toolkit"

const APIURL = "https://raulstorebe.herokuapp.com/api/v1/productsuppliers"
const CONTENT = { "Content-type": "application/json" }

const getAllProductSuppliersAction = createAsyncThunk('get/allproductsuppliers',
    async () => {
        try {
            const response = await fetch(`${APIURL}`, { method: "GET" });
            const data = await response.json();
            return [...data]
        } catch (err) {
            return err; //.message;
        }
/*     result.ok ? 
    dispatch(getAllProductSupplier(await result.json())) : 
    console.log("Error getting all product providers" );
 */})

export { getAllProductSuppliersAction }
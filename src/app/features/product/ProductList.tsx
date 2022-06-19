import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { getAllProductsAction } from './productAction';
import { getProductsErrors, getProductsStatus, selectAllProducts } from './productSlice';

const ProductList = () => {
    const dispatch = useAppDispatch();

    const products = useAppSelector(selectAllProducts)
    const productsStatus = useAppSelector(getProductsStatus)
    const productsErrors = useAppSelector(getProductsErrors)
 
    useEffect(() => {
        if (productsStatus === 'idle') {
            dispatch(getAllProductsAction())
        }
    }, [productsStatus, dispatch])

    return (
        <>
        
        </>
    )
}

export default ProductList

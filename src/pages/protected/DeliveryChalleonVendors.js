
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import DeliveryChalleonVendors from '../../features/outbound/DeliveryChallanVendors'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title :"Delivery Challan Vendors "}))
      }, [])

    return(
        <DeliveryChalleonVendors />
    )
}

export default InternalPage
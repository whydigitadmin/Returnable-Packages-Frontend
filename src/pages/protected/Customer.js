
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Customer from '../../features/master/Customer'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Customer"}))
      }, [])


    return(
        <Customer />
    )
}

export default InternalPage
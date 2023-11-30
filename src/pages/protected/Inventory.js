import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Inventory from '../../features/Reports/Inventory'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Inventory"}))
      }, [])


    return(
        <Inventory />
    )
}

export default InternalPage
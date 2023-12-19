import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import WarehouseLocation from '../../features/master/WarehouseLocation'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Warehouse Location"}))
      }, [])


    return(
        <WarehouseLocation />
    )
}

export default InternalPage
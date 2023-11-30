import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Warehouse from '../../features/master/Warehouse'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Warehouse"}))
      }, [])


    return(
        <Warehouse />
    )
}

export default InternalPage
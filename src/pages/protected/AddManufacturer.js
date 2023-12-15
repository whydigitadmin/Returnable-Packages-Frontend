import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import AddManufacturer from '../../features/master/AddManufacturer'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Add Manufacturer"}))
      }, [])


    return(
        <AddManufacturer />
    )
}

export default InternalPage
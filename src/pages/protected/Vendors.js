import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Vendors from '../../features/master/Vendors'


function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Vendors"}))
      }, [])


    return(
        <Vendors />
    )
}

export default InternalPage
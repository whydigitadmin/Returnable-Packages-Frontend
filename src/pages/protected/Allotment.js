
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Allotment from '../../features/outbound/Allotment'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title :"Allotment"}))
      }, [])

    return(
        <Allotment />
    )
}

export default InternalPage
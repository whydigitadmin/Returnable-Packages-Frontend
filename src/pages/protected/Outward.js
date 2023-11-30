import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Outward from '../../features/outbound/Outward'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Outward"}))
      }, [])


    return(
        <Outward />
    )
}

export default InternalPage
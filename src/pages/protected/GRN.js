import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import GRN from '../../features/inbound/GRN'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "GRN"}))
      }, [])


    return(
        <GRN />
    )
}

export default InternalPage
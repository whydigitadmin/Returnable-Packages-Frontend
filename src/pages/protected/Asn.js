import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import ASN from '../../features/inbound/ASN'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Asn"}))
      }, [])


    return(
        <ASN />
    )
}

export default InternalPage
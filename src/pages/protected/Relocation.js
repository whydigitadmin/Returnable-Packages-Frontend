import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Relocation from '../../features/outbound/Relocation'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Relocation"}))
      }, [])


    return(
        <Relocation />
    )
}

export default InternalPage
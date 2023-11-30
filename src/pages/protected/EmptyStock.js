
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import EmptyStock from '../../features/outbound/EmptyStock'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title :"Empty Stock "}))
      }, [])

    return(
        <EmptyStock />
    )
}

export default InternalPage
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Roles from '../../features/admin/Roles'
import { setPageTitle } from '../../features/common/headerSlice'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Roles"}))
      }, [])


    return(
        <Roles />
    )
}

export default InternalPage
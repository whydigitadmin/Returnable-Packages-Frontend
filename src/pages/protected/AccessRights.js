import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AccessRights from '../../features/admin/AccessRights'
import { setPageTitle } from '../../features/common/headerSlice'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Access Rights"}))
      }, [])


    return(
        <AccessRights />
    )
}

export default InternalPage
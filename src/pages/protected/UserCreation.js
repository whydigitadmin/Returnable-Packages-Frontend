import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import UserCreation from '../../features/admin/UserCreation'
import { setPageTitle } from '../../features/common/headerSlice'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "UserCreation"}))
      }, [])

    return(
        <UserCreation />
    )
}

export default InternalPage
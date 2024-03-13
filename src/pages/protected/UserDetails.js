import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import { UserDetails } from '../../features/admin/UserDetails'


function InternalPage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title: "Users Details" }))
    }, [])


    return (
        <UserDetails />
    )
}

export default InternalPage
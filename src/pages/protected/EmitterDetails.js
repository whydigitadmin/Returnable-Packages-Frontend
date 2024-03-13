import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import EmitterDetails from '../../features/admin/EmitterDetails'


function InternalPage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title: "Emitter Details" }))
    }, [])


    return (
        <EmitterDetails />
    )
}

export default InternalPage
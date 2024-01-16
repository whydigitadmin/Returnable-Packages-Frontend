import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Branch from '../../features/admin/Branch'
import { setPageTitle } from '../../features/common/headerSlice'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Branch"}))
      }, [])


    return(
        <Branch />
    )
}

export default InternalPage
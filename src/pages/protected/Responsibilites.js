import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Responsibilities from '../../features/admin/Responsibilities'
import { setPageTitle } from '../../features/common/headerSlice'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Responsibilities"}))
      }, [])


    return(
        <Responsibilities />
    )
}

export default InternalPage
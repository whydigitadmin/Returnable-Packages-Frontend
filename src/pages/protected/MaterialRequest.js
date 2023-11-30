import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import MaterialRequest from '../../features/outbound/MaterialRequest'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Material Request"}))
      }, [])


    return(
        <MaterialRequest />
    )
}

export default InternalPage
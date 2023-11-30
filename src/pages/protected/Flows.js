
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Flows from '../../features/master/Flows'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Flows"}))
      }, [])

    return(
        <Flows />
    )
}

export default InternalPage
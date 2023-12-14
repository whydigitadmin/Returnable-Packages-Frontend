import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import CreateKit from '../../features/master/CreateKit'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Create Kit"}))
      }, [])


    return(
        <CreateKit />
    )
}

export default InternalPage
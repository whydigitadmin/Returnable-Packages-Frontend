import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import ItemGroup from '../../features/master/ItemGroup'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Asset Group"}))
      }, [])


    return(
        <ItemGroup />
    )
}

export default InternalPage
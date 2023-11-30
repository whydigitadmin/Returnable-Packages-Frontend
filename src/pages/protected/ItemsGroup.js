import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import ItemsGroup from '../../features/master/ItemsGroup'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Item Groups"}))
      }, [])


    return(
        <ItemsGroup />
    )
}

export default InternalPage
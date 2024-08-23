import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import AllocatorCreation from "../../features/admin/AllocatorCreation";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Allocator Creators" }));
  }, []);

  return <AllocatorCreation />;
}

export default InternalPage;

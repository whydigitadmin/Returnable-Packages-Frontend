import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import AllocatorDetails from "../../features/admin/AllocatorDetails";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Allocator Details" }));
  }, []);

  return <AllocatorDetails />;
}

export default InternalPage;

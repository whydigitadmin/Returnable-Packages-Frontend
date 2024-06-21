import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import Oemuser from "../../features/admin/Oemuser";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "OEM Receiver / User" }));
  }, []);

  return <Oemuser />;
}

export default InternalPage;

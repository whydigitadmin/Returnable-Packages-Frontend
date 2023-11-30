import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import Scs from "../../features/sales/SCS";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "SCS" }));
  }, []);

  return <Scs />;
}

export default InternalPage;

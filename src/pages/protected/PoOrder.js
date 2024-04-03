import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import { PoOrder } from "../../features/services/PoOrder";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "PO Order" }));
  }, []);

  return <PoOrder />;
}

export default InternalPage;

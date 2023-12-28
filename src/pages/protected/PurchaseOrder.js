import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import PurchaseOrder from "../../features/inbound/PurchaseOrder";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Inbound" }));
  }, []);

  return <PurchaseOrder />;
}

export default InternalPage;

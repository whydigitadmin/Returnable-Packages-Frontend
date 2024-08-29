import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import PoManifest from "../../features/PurchaseOrderProvider/PoManifest";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Purchase Order" }));
  }, []);

  return <PoManifest />;
}

export default InternalPage;

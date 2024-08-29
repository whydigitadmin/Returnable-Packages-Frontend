import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import InvoiceManifest from "../../features/InvoiceProvider/InvoiceManifest";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Invoice" }));
  }, []);

  return <InvoiceManifest />;
}

export default InternalPage;

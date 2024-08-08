import { useEffect } from "react";
import { useDispatch } from "react-redux";
import InvoiceGeneratorOrginal from "../../features/admin/InvoiceGeneratorOrginal.tsx";
import { setPageTitle } from "../../features/common/headerSlice.js";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Invoice" }));
  }, []);

  return <InvoiceGeneratorOrginal />;
}

export default InternalPage;

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import InvoiceGenerator from "../../features/admin/InvoiceGenerator.tsx";
import { setPageTitle } from "../../features/common/headerSlice";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Purchase Order" }));
  }, []);

  return <InvoiceGenerator />;
}

export default InternalPage;

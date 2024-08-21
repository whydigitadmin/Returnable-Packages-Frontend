import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import DocumentDetails from "../../features/admin/DocumentDetails";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Document Details" }));
  }, []);

  return <DocumentDetails />;
}

export default InternalPage;

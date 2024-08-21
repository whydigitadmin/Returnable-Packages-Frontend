import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import DocumentCreation from "../../features/admin/DocumentCreation";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Document Creators" }));
  }, []);

  return <DocumentCreation />;
}

export default InternalPage;

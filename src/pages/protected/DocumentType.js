import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import { DocumentType } from "../../features/DocumentType/DocumentType";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Document Type" }));
  }, []);

  return <DocumentType />;
}

export default InternalPage;

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import RetrievalIssueManifest from "../../features/RetrievalIssueManifest/RetrievalIssueManifest";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Retrieval Issue Manifest" }));
  }, []);

  return <RetrievalIssueManifest />;
}

export default InternalPage;

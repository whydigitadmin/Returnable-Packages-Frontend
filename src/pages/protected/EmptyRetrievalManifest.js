import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";

import { EmptyRetrievalManifest } from "../../features/IssueManifest/EmptyRetrievalManifest";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "EmptyRetrievalManifest" }));
  }, []);

  return <EmptyRetrievalManifest />;
}

export default InternalPage;

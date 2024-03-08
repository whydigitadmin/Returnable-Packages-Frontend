import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import { IssueManifestReport } from "../../features/issueManifestReport/IssueManifestReport";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Issue Manifest" }));
  }, []);

  return <IssueManifestReport />;
}

export default InternalPage;

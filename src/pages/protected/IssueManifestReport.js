import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import { IssueManifestReport } from "../../features/issueManifestReport/IssueManifestReport";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Bin Allotment" }));
  }, []);

  return <IssueManifestReport />;
}

export default InternalPage;

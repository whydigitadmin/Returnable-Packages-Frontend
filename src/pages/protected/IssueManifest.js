import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import IssueManifest from "../../features/IssueManifest/IssueManifest";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Issue Manifest" }));
  }, []);

  return <IssueManifest />;
}

export default InternalPage;

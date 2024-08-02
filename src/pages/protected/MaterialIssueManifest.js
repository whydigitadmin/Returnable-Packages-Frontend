import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import MaterialIssueManifest from "../../features/MaterialIssueManifest/MaterialIssueManifest";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Material Issue Manifest" }));
  }, []);

  return <MaterialIssueManifest />;
}

export default InternalPage;

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import IssueManifestProvider from "../../features/IssueManifestProvider/IssueManifestProvider";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "MIM Generator" }));
  }, []);

  return <IssueManifestProvider />;
}

export default InternalPage;

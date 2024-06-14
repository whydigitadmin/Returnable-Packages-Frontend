import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import RetrievalManifestReport from "../../features/oem/RetrievalManifestReport/RetrievalManifestReport";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Bin Allotment" }));
  }, []);

  return <RetrievalManifestReport />;
}

export default InternalPage;

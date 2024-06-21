import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import InwardManifestDetails from "../../features/inwardManifest/InwardManifestDetails";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Asset Inward / Transfer" }));
  }, []);

  return <InwardManifestDetails />;
}

export default InternalPage;

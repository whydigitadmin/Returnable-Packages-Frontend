import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import { InwardManifest } from "../../features/inwardManifest/InwardManifest";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Bin Inward" }));
  }, []);

  return <InwardManifest />;
}

export default InternalPage;

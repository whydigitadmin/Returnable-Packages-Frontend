import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import { RetrivalManifest } from "../../features/oem/RetrivalManifest";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Retrival Manifest" }));
  }, []);

  return <RetrivalManifest />;
}

export default InternalPage;

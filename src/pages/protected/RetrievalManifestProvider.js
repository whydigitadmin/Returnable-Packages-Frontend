import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import RetrievalManifestProvider from "../../features/RetrievalManifestProvider/RetrievalManifestProvider";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "RIM Generator" }));
  }, []);

  return <RetrievalManifestProvider />;
}

export default InternalPage;

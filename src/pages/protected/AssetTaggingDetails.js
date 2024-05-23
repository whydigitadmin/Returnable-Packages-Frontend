import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import AssetTaggingDetails from "../../features/asstTagging/AssetTaggingDetails";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Asset Tagging" }));
  }, []);

  return <AssetTaggingDetails />;
}

export default InternalPage;

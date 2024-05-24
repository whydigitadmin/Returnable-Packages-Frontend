import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import AssetCategory from "../../features/master/AssetCategory";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Asset Category" }));
  }, []);

  return <AssetCategory />;
}

export default InternalPage;

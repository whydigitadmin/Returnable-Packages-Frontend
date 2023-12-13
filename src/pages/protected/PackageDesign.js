import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import PackageDesign from "../../features/partstudy/PackageDesign";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Package Design" }));
  }, []);

  return <PackageDesign />;
}

export default InternalPage;

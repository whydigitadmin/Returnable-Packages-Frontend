import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import KitReport from "../../features/KITReport/kitReport";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Kit Distribution Report" }));
  }, []);

  return <KitReport />;
}

export default InternalPage;

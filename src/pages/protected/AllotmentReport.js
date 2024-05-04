import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import AllotmentReport from "../../features/Reports/AllotmentReport";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Bin Allotment Report" }));
  }, []);

  return <AllotmentReport />;
}

export default InternalPage;

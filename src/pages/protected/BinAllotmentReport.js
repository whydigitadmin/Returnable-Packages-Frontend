import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import BinAllotmentReport from "../../features/MimReport/BinAllotmentReport";


function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Allotment Report" }));
  }, []);

  return <BinAllotmentReport />;
}

export default InternalPage;

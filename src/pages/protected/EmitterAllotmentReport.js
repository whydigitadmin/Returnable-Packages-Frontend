import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import EmitterAllotmentReport from "../../features/emitter/EmitterAllotmentReport";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Bin Allotment Report" }));
  }, []);

  return <EmitterAllotmentReport />;
}

export default InternalPage;

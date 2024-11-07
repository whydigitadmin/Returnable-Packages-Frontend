import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import RimReport from "../../features/RimReport/RimReport";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Rim Report" }));
  }, []);

  return <RimReport />;
}

export default InternalPage;

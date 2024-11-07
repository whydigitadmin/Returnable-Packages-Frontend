import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import { MimReport } from "../../features/MimReport/MimReport";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "MIM Report" }));
  }, []);

  return <MimReport />;
}

export default InternalPage;

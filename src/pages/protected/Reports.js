import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import Reports from "../../features/Reports/Reports";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Reports" }));
  }, []);

  return <Reports />;
}

export default InternalPage;

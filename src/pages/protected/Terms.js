import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import { Terms } from "../../features/services/Terms";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Terms" }));
  }, []);

  return <Terms />;
}

export default InternalPage;

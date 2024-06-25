import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";

import { FlowCard } from "../../features/master/FlowCard";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Flow Card" }));
  }, []);

  return <FlowCard />;
}

export default InternalPage;

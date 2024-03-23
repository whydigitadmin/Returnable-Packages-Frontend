import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import IssueReq from "../../features/emitter/IssueReq";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Bin Request" }));
  }, []);

  return <IssueReq />;
}

export default InternalPage;

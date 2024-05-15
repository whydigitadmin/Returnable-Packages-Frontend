import { useEffect } from "react";
import { useDispatch } from "react-redux";
import BranchDetail from "../../features/master/BranchDetail";
import { setPageTitle } from "../../features/common/headerSlice";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Branch" }));
  }, []);

  return <BranchDetail />;
}

export default InternalPage;

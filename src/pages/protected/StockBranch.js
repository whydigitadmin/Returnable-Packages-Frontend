import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";

import { StockBranch } from "../../features/master/StockBranch";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Stock Branch" }));
  }, []);

  return <StockBranch />;
}

export default InternalPage;

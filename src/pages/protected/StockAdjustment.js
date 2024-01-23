import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import StockAdjustment from "../../features/emitter/StockAdjustment";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Stock Details" }));
  }, []);

  return <StockAdjustment />;
}

export default InternalPage;

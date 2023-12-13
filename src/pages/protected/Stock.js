import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import StockDetails from "../../features/partstudy/StockDetails";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Stock Details" }));
  }, []);

  return <StockDetails />;
}

export default InternalPage;

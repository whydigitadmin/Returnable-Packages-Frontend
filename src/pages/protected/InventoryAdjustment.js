import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import InventoryAdjustment from "../../features/Reports/InventoryAdjustments";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Inventory Adjustments" }));
  }, []);

  return <InventoryAdjustment />;
}

export default InternalPage;

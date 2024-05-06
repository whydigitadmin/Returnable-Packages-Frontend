import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import EmitterStockLedgerReport from "../../features/emitter/EmitterStockLedgerReport";


function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Stock Ledger Report" }));
  }, []);

  return <EmitterStockLedgerReport />;
}

export default InternalPage;

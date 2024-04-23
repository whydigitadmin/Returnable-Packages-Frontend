import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import BinInwardOem from "../../features/emitter/BinInwardOem";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "BinInward" }));
  }, []);

  return <BinInwardOem />;
}

export default InternalPage;

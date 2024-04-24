import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import BinOutwardOem from "../../features/emitter/BinOutwardOem";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "BinOutward" }));
  }, []);

  return <BinOutwardOem />;
}

export default InternalPage;

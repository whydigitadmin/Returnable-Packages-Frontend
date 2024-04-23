import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import BinOutward from "../../features/emitter/BinOutward";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Emitter Outward" }));
  }, []);

  return <BinOutward />;
}

export default InternalPage;

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import { EmitterLanding } from "../../features/emitter/EmitterLanding";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "BIN BEE" }));
  }, []);

  return <EmitterLanding />;
}

export default InternalPage;

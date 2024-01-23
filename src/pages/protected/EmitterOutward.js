import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import { EmitterOutward } from "../../features/emitter/EmitterOutward";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Emitter Outward" }));
  }, []);

  return <EmitterOutward />;
}

export default InternalPage;

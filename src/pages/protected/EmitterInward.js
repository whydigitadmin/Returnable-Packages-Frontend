import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import EmitterInward from "../../features/emitter/EmitterInward";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Emitter Inward" }));
  }, []);

  return <EmitterInward />;
}

export default InternalPage;

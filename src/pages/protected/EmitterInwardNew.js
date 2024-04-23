import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import EmitterInwardNew from "../../features/emitter/EmitterInwardNew";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Emitter Inward" }));
  }, []);

  return <EmitterInwardNew />;
}

export default InternalPage;

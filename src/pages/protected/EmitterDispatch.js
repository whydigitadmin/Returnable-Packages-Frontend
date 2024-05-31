import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import { EmitterDispatch } from "../../features/emitter/EmitterDispatch";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Emitter Dispatch" }));
  }, []);

  return <EmitterDispatch />;
}

export default InternalPage;

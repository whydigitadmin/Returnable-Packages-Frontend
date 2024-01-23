import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import { EmptyCount } from "../../features/emitter/EmptyCount";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Empty Count Manifest" }));
  }, []);

  return <EmptyCount />;
}

export default InternalPage;

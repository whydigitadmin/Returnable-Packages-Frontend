import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import EmitterCreation from "../../features/admin/EmitterCreation";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Emitter Creation" }));
  }, []);

  return <EmitterCreation />;
}

export default InternalPage;

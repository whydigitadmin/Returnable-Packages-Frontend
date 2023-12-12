import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import Partstudy from "../../features/partstudy/partstudy";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Partstudy" }));
  }, []);

  return <Partstudy />;
}

export default InternalPage;

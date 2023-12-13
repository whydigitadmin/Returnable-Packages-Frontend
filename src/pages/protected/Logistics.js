import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import Logistics from "../../features/partstudy/Logistics";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Logistics Details" }));
  }, []);

  return <Logistics />;
}

export default InternalPage;

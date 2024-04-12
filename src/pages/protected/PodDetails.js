import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import PodDetails from "../../features/services/PodDetails";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Proof of Delivery" }));
  }, []);

  return <PodDetails />;
}

export default InternalPage;

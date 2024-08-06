import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import ChargeTypeRequest from "../../features/master/ChargeTypeRequest";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Charge Type Request" }));
  }, []);

  return <ChargeTypeRequest />;
}

export default InternalPage;

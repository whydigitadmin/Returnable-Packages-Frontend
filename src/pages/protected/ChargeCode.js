import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import { ChargeCode } from "../../features/master/ChargeCode";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Charge Code" }));
  }, []);

  return <ChargeCode />;
}

export default InternalPage;

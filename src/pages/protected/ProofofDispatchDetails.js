import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import ProofofDispatchDetails from "../../features/services/ProofofDispatchDetails";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Proof of Dispatch" }));
  }, []);

  return <ProofofDispatchDetails />;
}

export default InternalPage;

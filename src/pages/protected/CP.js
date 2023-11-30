import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import CommercialProposal from "../../features/sales/CP";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Commercial Proposal" }));
  }, []);

  return <CommercialProposal />;
}

export default InternalPage;

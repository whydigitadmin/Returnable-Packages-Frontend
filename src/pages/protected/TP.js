import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import TechnicalProposals from "../../features/sales/TP";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Technical Proposals" }));
  }, []);

  return <TechnicalProposals />;
}

export default InternalPage;

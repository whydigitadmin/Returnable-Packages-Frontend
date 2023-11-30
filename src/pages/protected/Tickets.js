import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import Tickets from "../../features/Tickets/Tickets";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Tickets " }));
  }, []);

  return <Tickets />;
}

export default InternalPage;

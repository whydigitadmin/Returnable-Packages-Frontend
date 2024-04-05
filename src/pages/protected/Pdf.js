import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import { Pdf } from "../../features/services/Pdf";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Invoice Generator" }));
  }, []);

  return <Pdf />;
}

export default InternalPage;

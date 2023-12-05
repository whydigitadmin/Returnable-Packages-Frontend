import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import Perfrences from "../../features/settings/Perfrences";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Perferences" }));
  }, []);

  return <Perfrences />;
}

export default InternalPage;

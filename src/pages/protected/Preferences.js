import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import Preferences from "../../features/settings/Preferences";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Perferences" }));
  }, []);

  return <Preferences />;
}

export default InternalPage;

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";

import { KitCard } from "../../features/master/KitCard";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Kit Card" }));
  }, []);

  return <KitCard />;
}

export default InternalPage;

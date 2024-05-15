import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import { GatheringEmpty } from "../../features/oem/GatheringEmpty";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Gathering Empty" }));
  }, []);

  return <GatheringEmpty />;
}

export default InternalPage;

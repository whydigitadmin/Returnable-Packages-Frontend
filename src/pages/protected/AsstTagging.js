import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import { AsstTagging } from "../../features/asstTagging/AsstTagging";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Asset Tagging" }));
  }, []);

  return <AsstTagging />;
}

export default InternalPage;

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import AdminBinRetrieval from "../../features/AdminBinRetrieval/AdminBinRetrieval";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Bin Retrieval Inward" }));
  }, []);

  return <AdminBinRetrieval />;
}

export default InternalPage;

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import AdminBinRetrieval from "../../features/admin/AdminBinRetrieval";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Bin Retrieval" }));
  }, []);

  return <AdminBinRetrieval />;
}

export default InternalPage;

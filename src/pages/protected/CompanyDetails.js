import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
// import { AsstTagging } from "../../features/asstTagging/AsstTagging";
import CompanyDetails from "../../features/owner/CompanyDetails";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Company Details" }));
  }, []);

  return <CompanyDetails />;
}

export default InternalPage;

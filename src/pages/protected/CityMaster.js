import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import { CityMaster } from "../../features/master/CityMaster";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "City Master" }));
  }, []);

  return <CityMaster />;
}

export default InternalPage;

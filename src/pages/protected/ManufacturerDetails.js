import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import ManufacturerDetails from "../../features/master/ManufacturerDetails";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Manufacture" }));
  }, []);

  return <ManufacturerDetails />;
}

export default InternalPage;

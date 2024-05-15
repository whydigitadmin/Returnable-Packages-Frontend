import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import TransporterPickup from "../../features/oem/TransporterPickup";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Transporter Pickup" }));
  }, []);

  return <TransporterPickup />;
}

export default InternalPage;

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";

import PaymentAdvice from "../../features/PaymentAdvice/paymentAdvice";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Payment Advice" }));
  }, []);

  return <PaymentAdvice />;
}

export default InternalPage;

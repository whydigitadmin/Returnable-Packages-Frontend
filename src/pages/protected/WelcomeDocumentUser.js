import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import WelcomeDocumentUser from "../../features/user/WelcomeDocumentUser";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setPageTitle({
        title: (
          <img
            src="/BIN_BEE.png"
            alt="BIN BEE"
            style={{ width: "150px", height: "auto" }}
          />
        ),
      })
    );
  }, [dispatch]);

  return <WelcomeDocumentUser />;
}

export default InternalPage;

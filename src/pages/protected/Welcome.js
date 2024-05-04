import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setPageTitle } from "../../features/common/headerSlice";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Home" }));
  }, []);

  return (
    <div className="row">
      <div className="col-lg-4 col-md-6 col-sm-4">
        <Link to="/app/binallotmentdetails">
          <div
            className="card bg-base-100 shadow-xl mb-4 p-3 mt-3"
            // style={{ width: "14rem" }}
          >
            <div className="">
              <div className="d-flex flex-row">
                {/* <FaArrowCircleUp
              className="text-xl font-semibold me-2 w-7 h-7"
              style={{ marginTop: 2 }}
            /> */}
                <img
                  src="/issue.png"
                  style={{
                    width: "32px",
                    height: "32px",
                    marginRight: "6px",
                  }}
                />
                <h4 className="text-xl font-semibold">Bin Request</h4>
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div className="col-lg-4 col-md-6 col-sm-4">
        <Link to="/app/inwardManifestDetails">
          <div
            className="card bg-base-100 shadow-xl mb-4 p-3 mt-3"
            // style={{ width: "14rem" }}
          >
            <div className="">
              <div className="d-flex flex-row">
                <img
                  src="/incoming.png"
                  style={{
                    width: "32px",
                    height: "32px",
                    marginRight: "6px",
                  }}
                />
                <h4 className="text-xl font-semibold">Bin Inward</h4>
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div className="col-lg-4 col-md-6 col-sm-4">
        <Link to="/app/EmptyRetrievalManifest">
          <div
            className="card bg-base-100 shadow-xl mb-4 p-3 mt-3"
            // style={{ width: "14rem" }}
          >
            <div className="">
              <div className="d-flex flex-row">
                {/* <MdOutbound
              className="text-xl font-semibold me-2 w-7 h-7"
              style={{ marginTop: 2 }}
            /> */}
                <img
                  src="/outgoing.png"
                  style={{
                    width: "30px",
                    height: "30px",
                    marginRight: "6px",
                  }}
                />
                <h4 className="text-xl font-semibold">Bin Outward</h4>
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div className="col-lg-4 col-md-6 col-sm-4">
        {/* <Link to="/app/StockAdjustment"> */}
        <div
          className="card bg-base-100 shadow-xl mb-4 p-3 mt-3"
          // style={{ width: "14rem" }}
        >
          <div className="">
            <div className="d-flex flex-row">
              {/* <TbChartInfographic
              className="text-xl font-semibold me-2 w-8 h-8"
              style={{ marginTop: -6 }}
            /> */}
              <img
                src="/stock.png"
                style={{
                  width: "30px",
                  height: "30px",
                  marginRight: "6px",
                  marginTop: "-6",
                }}
              />
              <h4 className="text-xl font-semibold">Reports</h4>
            </div>
          </div>
        </div>
        {/* </Link> */}
      </div>
    </div>
  );
}

export default InternalPage;

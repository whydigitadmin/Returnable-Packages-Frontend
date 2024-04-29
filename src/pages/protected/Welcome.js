import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setPageTitle } from "../../features/common/headerSlice";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "" }));
  }, []);

  return (
    <div className=" h-4/5 bg-base-200">
      <div className="">
        <div className="">
          {/* <TemplatePointers /> */}
          {/* <Link to="/app/dashboard">
            <button className="btn bg-base-100 btn-outline">Get Started</button>
          </Link> */}
          <div className="row col-lg-12">
            <div className="col-lg-3">
              <Link to="/app/binallotmentdetails">
                <div
                  className="card bg-base-100 shadow-xl mb-4 mt-3 position-relative"
                  style={{ width: "12rem", minHeight: "50px", padding: "10px" }} // Add minHeight to prevent collapsing
                >
                  {/* Chip with count */}
                  <div
                    className="position-absolute end-0 text-white indicator-item badge badge-sm"
                    style={{
                      fontSize: "16px",
                      marginTop: "-20px",
                      marginRight: "-11px",
                      padding: "8px",
                      borderRadius: "10px",
                      backgroundColor: "#30db5e",
                      borderWidth: "0px",
                    }} // Adjust font size as needed
                  >
                    12
                  </div>

                  <div className="">
                    <div className="d-flex flex-row">
                      <img
                        src="/issue.png"
                        style={{
                          width: "32px",
                          height: "32px",
                          marginRight: "6px",
                        }}
                        alt="Issue Icon"
                      />
                      <h4 className="text-xl font-semibold">Bin Request</h4>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-lg-3">
              <Link to="/app/inwardManifestDetails">
                <div
                  className="card bg-base-100 shadow-xl mb-4 mt-3 position-relative"
                  style={{ width: "12rem", minHeight: "50px", padding: "10px" }} // Add minHeight to prevent collapsing
                >
                  {/* Chip with count */}
                  <div
                    className="position-absolute end-0 text-white indicator-item badge badge-sm"
                    style={{
                      fontSize: "16px",
                      marginTop: "-20px",
                      marginRight: "-11px",
                      padding: "8px",
                      borderRadius: "10px",
                      backgroundColor: "#30db5e",
                      borderWidth: "0px",
                    }} // Adjust font size as needed
                  >
                    14
                  </div>

                  <div className="">
                    <div className="d-flex flex-row">
                      <img
                        src="/incoming.png"
                        style={{
                          width: "32px",
                          height: "32px",
                          marginRight: "6px",
                        }}
                        alt="Issue Icon"
                      />
                      <h4 className="text-xl font-semibold">Bin Inward</h4>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-lg-3">
              <Link to="/app/EmptyRetrievalManifest">
                <div
                  className="card bg-base-100 shadow-xl mb-4 mt-3 position-relative"
                  style={{ width: "12rem", minHeight: "50px", padding: "10px" }} // Add minHeight to prevent collapsing
                >
                  {/* Chip with count */}
                  <div
                    className="position-absolute end-0 text-white indicator-item badge badge-sm"
                    style={{
                      fontSize: "16px",
                      marginTop: "-20px",
                      marginRight: "-11px",
                      padding: "8px",
                      borderRadius: "10px",
                      backgroundColor: "#30db5e",
                      borderWidth: "0px",
                    }} // Adjust font size as needed
                  >
                    4
                  </div>

                  <div className="">
                    <div className="d-flex flex-row">
                      <img
                        src="/outgoing.png"
                        style={{
                          width: "32px",
                          height: "32px",
                          marginRight: "6px",
                        }}
                        alt="Issue Icon"
                      />
                      <h4 className="text-xl font-semibold">Bin Outward</h4>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InternalPage;

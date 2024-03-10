import React, { useEffect } from "react";
import axios from "axios";
import { FaLocationDot } from "react-icons/fa6";
import { MdDoubleArrow } from "react-icons/md";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import EmitterOutwardDetails from "./EmitterOutwardDetails";

export const EmitterOutward = () => {
  const [selectedFlow, setSelectedFlow] = React.useState("");
  const [flowNames, setFlowNames] = React.useState([]);
  const [address, setAddress] = React.useState({});
  const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));
  const [userId, setUserId] = React.useState(localStorage.getItem("userId"));

  useEffect(() => {
    getAddressById();
  }, []);

  const getAddressById = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/flow?emitterId=${userId}&orgId=${orgId}`
      );

      if (response.status === 200) {
        setAddress(response.data.paramObjectsMap.flowVO);
        const validFlowNames = response.data.paramObjectsMap.flowVO
          .map((flow) => flow.flowName)
          .filter((flowName) => typeof flowName === "string");

        setFlowNames(validFlowNames);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div className="container-sm">
        <div className="card bg-base-100 shadow-xl">
          <div className="row">
            <p className="ml-5 mt-3 text-2xl">
              <strong>Outward</strong>
            </p>

            <div className="col-lg-1">
              <div className="d-flex justify-content-center">
                <Link to="/app/EmitterLanding">
                  <FaArrowCircleLeft className="cursor-pointer w-8 h-8 mt-4" />
                </Link>
              </div>
            </div>
            {/* <div className="col-lg-4 card bg-base-100 shadow-xl ms-4 mt-3 me-2">
              <div className="p-1">
                <div className="d-flex flex-row">
                  <FaLocationDot
                    className="text-xl font-semibold w-5 h-5"
                    style={{ marginTop: 14 }}
                  />
                  <h4 className="text-xl font-semibold pt-1 mt-2 ms-1 mb-2">
                    Location -
                  </h4>
                  <h4 className="text-2xl font-semibold ms-1 mt-2">Gabriel</h4>
                </div>
              </div>
              <p className="mb-3">
                29, Milestone Village, Kuruli, Pune Nasik Highway, Taluk Khed,
                Pune, Maharashtra, 410501 India
              </p>
            </div> */}
            {/* <div className="col-lg-1">
              <MdDoubleArrow
                className="text-xl font-semibold w-16  h-16 "
                style={{ marginTop: 70 }}
              />
            </div> */}
            <div className="col-lg-5 card bg-base-100 shadow-xl mt-3 h-28">
              <div className="p-2">
                <div className="d-flex flex-row">
                  {/* <FaLocationDot
                    className="text-xl font-semibold w-5 h-5"
                    style={{ marginTop: 11 }}
                  /> */}
                  <img src="/destination.png" alt="Favorite" 
                    style={{
                      width: "30px",
                      height: "25px",
                      marginRight: "6px",
                      marginTop: "12px",
                    }}/>
                  <h4 className="text-xl font-semibold mt-2 ms-1 me-2 mb-2">
                    Issued To -
                  </h4>
                  <select
                    className="form-select w-72 h-10 mt-1 mb-2"
                    value={selectedFlow}
                    onChange={(e) => setSelectedFlow(e.target.value)}
                  >
                    <option value="">Select a Flow</option>
                    {flowNames &&
                      flowNames.map((flowName) => (
                        <option key={flowName} value={flowName}>
                          {flowName}
                        </option>
                      ))}
                  </select>
                </div>

                <h4 className="text-xl dark:text-slate-300 font-semibold ms-1">
                  {selectedFlow}
                </h4>
                {/* <p className="ms-1 mb-2">
                  29, Milestone Village, Kuruli, Pune Nasik Highway, Taluk Khed,
                  Pune, Maharashtra, 410501 India
                </p> */}
              </div>
            </div>
          </div>
          <EmitterOutwardDetails />
        </div>
      </div>
    </>
  );
};

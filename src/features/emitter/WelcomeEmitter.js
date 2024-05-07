import CircleStackIcon from "@heroicons/react/24/outline/CircleStackIcon";
import CreditCardIcon from "@heroicons/react/24/outline/CreditCardIcon";
import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardStats from "../dashboard/components/DashboardStats";

const statsData = [
  {
    title: "On Arrival",
    value: "20",
    icon: <UserGroupIcon className="w-8 h-8" />,
    description: "↗︎ 2300 (22%)",
  },
  {
    title: "On Consumption",
    value: "20",
    icon: <CreditCardIcon className="w-8 h-8" />,
    description: "Current month",
  },
  {
    title: "Empty Retrival",
    value: "22",
    icon: <CircleStackIcon className="w-8 h-8" />,
    description: "50 in hot leads",
  },
  {
    title: "Yet To Transfer",
    value: "11",
    icon: <UsersIcon className="w-8 h-8" />,
    description: "↙ 300 (18%)",
  },
];

function WelcomeEmitter() {
  const [userDetail, setUserDetail] = useState(
    JSON.parse(localStorage.getItem("userDto"))
  );
  const [displayName, setDisplayName] = useState("");

  const [userDetails, setUserDetails] = useState(
    localStorage.getItem("userDetails")
  );

  useEffect(() => {
    getDisplayName();
    console.log(userDetail);
  }, [userDetail]);

  const getDisplayName = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/auth/user/${userDetail.userId}`
      );

      if (response.status === 200) {
        setDisplayName(
          response.data.paramObjectsMap.userVO.customersVO.displayName
        );
        localStorage.setItem(
          "emitterId",
          response.data.paramObjectsMap.userVO.customersVO.id
        );
        localStorage.setItem(
          "emitterId",
          response.data.paramObjectsMap.userVO.customersVO.id
        );
        console.log("userVO", response.data.paramObjectsMap.userVO);
      }
    } catch (error) {
      toast.error("Network Error!");
    }
  };

  return (
    <>
      <div>
        <ToastContainer />
      </div>
      <div className="row" style={{ gap: "3%" }}>
        <div
          className="col-lg-3 col-md-3 card bg-base-100 shadow-xl mb-4 pe-2"
          style={{ height: "400px" }}
        >
          <div className="">
            <h4 className="text-2xl font-semibold mt-4 mb-2 text-center">
              WELCOME TO
            </h4>
            {/* <h4 className="text-4xl font-bold mt-2 ms-2 mb-4">AIPACKS</h4> */}
            <img
              src="/ai.png"
              style={{ width: "100px", margin: "auto" }}
              className="text-center mb-3"
            />
            <h4 className="text-lg dark:text-slate-300 font-semibold ms-2 mb-1">
              {userDetail.firstName}
            </h4>
            {/* <p className="text-sm ms-2 mb-2">
              Last login{" "}
              <span>
                {moment(userDetail.lastLogin).format("MMMM Do YYYY, h:mm:ss a")}
              </span>
            </p> */}
            <p className="text-sm ms-2 mb-2">
              Last login{" "}
              <span>
                {userDetail.lastLogin === null
                  ? moment().format("MMMM Do YYYY, h:mm:ss a")
                  : moment(userDetail.lastLogin).format(
                    "MMMM Do YYYY, h:mm:ss a"
                  )}
              </span>
            </p>
            {/* <p className="text-2xl ms-2">Tue</p>
            <p className="text-5xl ms-5">Jan</p>
            <p className="text-9xl text-right me-2 mb-3">17</p> */}
          </div>
          <div className="">
            <div className="d-flex flex-row">
              {/* <FaLocationDot
                className="text-xl font-semibold ms-2 w-7 h-7"
                style={{ marginTop: 30 }}
              /> */}
              <img
                src="/location.png"
                style={{
                  width: "28px",
                  height: "28px",
                  marginTop: "30px",
                  marginRight: "4px",
                }}
              />

              <h4 className="text-2xl font-semibold mt-4 pt-1 ms-1 mb-4">
                {displayName}
              </h4>
            </div>
            {/* <h4 className="text-xl dark:text-slate-300 font-semibold ms-2 mb-3">
              Gabriel
            </h4> */}
            {/* <p className="ms-2 mb-3">1
              29, Milestone Village, Kuruli, Pune Nasik Highway, Taluk Khed,
              Pune, Maharashtra, 410501 India
            </p> */}
          </div>
        </div>
        <div className="col-lg-8 col-md-8 card bg-base-100 shadow-xl mb-4">
          {userDetails === "ROLE_OEM" ? (
            <>
              <div className="col-lg-12">
                <div className="grid lg:grid-cols-2 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
                  {statsData.map((d, k) => {
                    return <DashboardStats key={k} {...d} colorIndex={k} />;
                  })}
                </div>
              </div>
              <div className="col-lg-4">
                <Link to="/app/EmptyCount">
                  <div
                    className="card bg-base-100 shadow-xl mb-4 p-3 mt-3"
                    style={{ width: "14rem" }}
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
                        <h4 className="text-xl font-semibold">Bin Empty</h4>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </>
          ) : (
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-4">
                <Link to="/app/IssueReq">
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
                <Link to="/app/EmitterInwardNew">
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
                <Link to="/app/BinOutward">
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
                <Link to="/app/StockAdjustment">
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
                        <h4 className="text-xl font-semibold">Stock Report</h4>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="col-lg-4 col-md-6 col-sm-4">
                <Link to="/app/emitterstockledgerreport">
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
                        <h4 className="text-xl font-semibold">Stock Ledger</h4>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-4">
                <Link to="/app/emitterallotmentreport">
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
                        <h4 className="text-xl font-semibold">
                          Allotment Detail
                        </h4>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-4">
                <Link to="/app/StockAdjustment">
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
                        <h4 className="text-xl font-semibold">Finance</h4>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* <div className="col-lg-9 card bg-base-100 shadow-xl mb-4"></div>
        <div className="col-lg-3 card bg-base-100 shadow-xl mb-4 pe-2"></div> */}
        {/* <div className="col-lg-9 card bg-base-100 shadow-xl mb-4"> */}
        {/* <div className="row">
            <div className="col-lg-4">
              <Link to="/app/IssueReq">
                <div className="w-60 card bg-base-100 shadow-xl mb-4 p-3 mt-3">
                  <div className="">
                    <div className="d-flex flex-row">
                      <FaArrowCircleUp
                        className="text-xl font-semibold me-2 w-7 h-7"
                        style={{ marginTop: 2 }}
                      />
                      <h4 className="text-xl font-semibold">Issue Request</h4>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-lg-4">
              <Link to="/app/EmitterInward">
                <div className="w-60 card bg-base-100 shadow-xl mb-4 p-3 mt-3">
                  <div className="">
                    <div className="d-flex flex-row">
                      <FaArrowCircleDown
                        className="text-xl font-semibold me-2 w-7 h-7"
                        style={{ marginTop: 2 }}
                      />
                      <h4 className="text-xl font-semibold">Inward</h4>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-lg-4">
              <Link to="/app/EmitterOutward">
                <div className="w-60 card bg-base-100 shadow-xl mb-4 p-3 mt-3">
                  <div className="">
                    <div className="d-flex flex-row">
                      <MdOutbound
                        className="text-xl font-semibold me-2 w-7 h-7"
                        style={{ marginTop: 2 }}
                      />
                      <h4 className="text-xl font-semibold">Outward</h4>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-lg-4">
              <Link to="/app/StockAdjustment">
                <div className="w-60 card bg-base-100 shadow-xl mb-4 p-3 mt-3">
                  <div className="">
                    <div className="d-flex flex-row">
                      <TbChartInfographic
                        className="text-xl font-semibold me-2 w-8 h-8"
                        style={{ marginTop: -6 }}
                      />
                      <h4 className="text-xl font-semibold">Stock Report</h4>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div> */}
        {/* <h4 className="text-xl dark:text-slate-300 font-semibold mt-3 ms-3">
            Recent transfer IN
          </h4>
          <h4 className="text-xl dark:text-slate-300 font-semibold mt-3 ms-3">
            Recent transfer OUT
          </h4> */}
        {/* </div> */}
      </div>
    </>
  );
}

export default WelcomeEmitter;

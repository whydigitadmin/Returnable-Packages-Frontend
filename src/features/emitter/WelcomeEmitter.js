import CircleStackIcon from "@heroicons/react/24/outline/CircleStackIcon";
import CreditCardIcon from "@heroicons/react/24/outline/CreditCardIcon";
import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import DownloadingIcon from "@mui/icons-material/Downloading";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BadgeWithIcon from "../../utils/BadgeWithIcon";
import LastLogin from "../../utils/LastLogin";
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

const requestData = [
  {
    status: "Pending",
    reqNo: "REQ001",
    reqDate: "2024-06-12",
    demandDate: "2024-06-20",
    partName: "Part A",
    partNo: "P001",
    partQty: 5,
    kitNo: "KIT001",
    kitQty: 1,
  },
  {
    status: "Completed",
    reqNo: "REQ002",
    reqDate: "2024-06-13",
    demandDate: "2024-06-22",
    partName: "Part B",
    partNo: "P002",
    partQty: 3,
    kitNo: "KIT002",
    kitQty: 2,
  },
  // Add more rows as needed
];

function WelcomeEmitter() {
  const [userDetail, setUserDetail] = useState(
    JSON.parse(localStorage.getItem("userDto"))
  );
  const [displayName, setDisplayName] = useState("");

  const [userDetails, setUserDetails] = useState(
    localStorage.getItem("userDetails")
  );

  const [completedData, setCompletedData] = useState([]);
  const [pendingData, setPendingData] = useState([]);
  const [completedInwardData, setCompletedInwardData] = useState([]);
  const [pendingInwardData, setPendingInwardData] = useState([]);
  const [completedOutwardData, setCompletedOutwardData] = useState([]);
  const [emitterId, setEmitterId] = useState(localStorage.getItem("emitterId"));
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));

  useEffect(() => {
    if (emitterId && orgId) {
      fetchAllData();
    }
  }, [emitterId, orgId]);

  useEffect(() => {
    getDisplayName();
  }, [userDetail]);

  const fetchAllData = () => {
    getAllIssueRequest();
    getAllInwardRequest();
    getAllBinOutward();
  };

  const [open, setOpen] = useState(false);
  const [badgeType, setBadgeType] = useState("");
  const [reqData, setReqData] = useState([]);

  const handleOpen = (type) => {
    setBadgeType(type);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const getDisplayName = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/auth/user/${userDetail.userId}`
      );

      if (response.status === 200) {
        const userVO = response.data.paramObjectsMap.userVO;
        setDisplayName(userVO.customersVO.displayName);
        localStorage.setItem("displayName", userVO.customersVO.displayName);
        localStorage.setItem("emitterId", userVO.customersVO.id);
        setEmitterId(userVO.customersVO.id);
      }
    } catch (error) {
      toast.error("Network Error!");
    }
  };

  const getAllIssueRequest = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/emitter/getBinRequestStatusCount?orgId=${orgId}&emitterId=${emitterId}`
      );

      if (response.status === 200) {
        setReqData(response.data.paramObjectsMap.binreqStatusDetails);
        console.log(
          "Testtt",
          response.data.paramObjectsMap.binreqStatusDetails
        );
        const completed =
          response.data.paramObjectsMap.binreqStatusDetails.filter(
            (item) => item.status === "Completed"
          );
        const pending =
          response.data.paramObjectsMap.binreqStatusDetails.filter(
            (item) => item.status === "Pending"
          );

        setCompletedData(completed);
        setPendingData(pending);

        console.log("completed", completed);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getAllInwardRequest = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/emitter/getBinInwardStatus?orgId=${orgId}&emitterId=${emitterId}`
      );

      if (response.status === 200) {
        // setReqData(response.data.paramObjectsMap.binInwardStatus);
        console.log(
          "Testtt",
          response.data.paramObjectsMap.binreqStatusDetails
        );
        const completed = response.data.paramObjectsMap.binInwardStatus.filter(
          (item) => item.status === "Completed"
        );
        const pending = response.data.paramObjectsMap.binInwardStatus.filter(
          (item) => item.status === "Pending"
        );

        setCompletedInwardData(completed);
        setPendingInwardData(pending);

        console.log("completed", completed);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getAllBinOutward = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/emitter/getAllBinOutward?emitterId=${emitterId}&orgId=${orgId}`
      );

      if (response.status === 200) {
        setCompletedOutwardData(response.data.paramObjectsMap.binOutwardVO);
      } else {
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div style={{ padding: "0% 5% 0% 5%" }}>
      <div>
        <ToastContainer />
      </div>

      <div className="row" style={{ gap: "3%" }}>
        <div
          className="col-lg-3 col-md-3 card bg-white shadow-xl mb-4 p-3 rounded-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out"
          style={{ height: "350px" }}
        >
          <div className="">
            <h4 className="text-xl font-semibold mt-4 mb-2 text-center">
              WELCOME TO
            </h4>
            {/* <h4 className="text-4xl font-bold mt-2 ms-2 mb-4">AIPACKS</h4> */}
            <img
              src="/ai.png"
              style={{ width: "100px", margin: "auto" }}
              className="text-center mb-3"
            />
            {/* <h4 className="text-md dark:text-slate-300 font-semibold ms-2 mb-2 text-center">
              {userDetail.firstName}
            </h4> */}
            {/* <p className="text-sm ms-2 mb-2">
              Last login{" "}
              <span>
                {moment(userDetail.lastLogin).format("MMMM Do YYYY, h:mm:ss a")}
              </span>
            </p> */}
            {/* <p className="text-sm ms-2 mb-2">
              Last login{" "}
              <span>
                {userDetail.lastLogin === null
                  ? moment().format("MMMM Do YYYY, h:mm:ss a")
                  : moment(userDetail.lastLogin).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )}
              </span>
            </p> */}
            <LastLogin userDetail={userDetail} />

            {/* <p className="text-2xl ms-2">Tue</p>
            <p className="text-5xl ms-5">Jan</p>
            <p className="text-9xl text-right me-2 mb-3">17</p> */}
          </div>
          <div className="">
            <div className="d-flex flex-row">
              {/* <FaLocationDot
                className="text-md font-semibold ms-2 w-7 h-7"
                style={{ marginTop: 30 }}
              /> */}
              <img
                src="/location.png"
                style={{
                  width: "28px",
                  height: "28px",
                  marginTop: "26px",
                  marginRight: "4px",
                }}
              />

              <h4 className="text-xl font-semibold mt-4 pt-1 ms-1 mb-4 text-center">
                {displayName}
              </h4>
            </div>
            {/* <h4 className="text-md dark:text-slate-300 font-semibold ms-2 mb-3">
              Gabriel
            </h4> */}
            {/* <p className="ms-2 mb-3">1
              29, Milestone Village, Kuruli, Pune Nasik Highway, Taluk Khed,
              Pune, Maharashtra, 410501 India
            </p> */}
          </div>
        </div>
        <div className="col-lg-8 col-md-8 card bg-white shadow-xl mb-4 p-3 rounded-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
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
                        className="text-md font-semibold me-2 w-7 h-7"
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
                        <h4 className="text-md font-semibold">Bin Empty</h4>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </>
          ) : (
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-4 ">
                <Link to="/app/IssueReq">
                  <div
                    className="card bg-base-100 shadow-xl mb-3 pt-3 pb-3 pl-3 mt-3 transition duration-300 ease-in-out hover:scale-105 duration-500"
                    style={{
                      "--tw-bg-opacity": "1",
                      "--tw-hover-bg-color": "#d2fbd0",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#d2fbd0")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                  >
                    <div>
                      <div className="d-flex flex-row align-items-center">
                        <div className="d-flex flex-row align-items-center">
                          <img
                            src="/issue.png"
                            style={{
                              width: "32px",
                              height: "32px",
                              marginRight: "6px",
                            }}
                            alt="Issue"
                          />
                          <h4 className="text-md font-semibold">
                            {" "}
                            {/* Bin */}Bin Request
                          </h4>
                        </div>
                        <div
                          className="d-flex flex-row align-items-center"
                          style={{ marginLeft: "0.4rem" }}
                        >
                          {pendingData && (
                            <BadgeWithIcon
                              badgeContent={
                                pendingData ? pendingData.length : 0
                              }
                              color="primary"
                              tooltipTitle="Pending Requests"
                              IconComponent={DownloadingIcon}
                              pendingReqData={pendingData}
                              type="Pending"
                            />
                          )}
                          <BadgeWithIcon
                            badgeContent={completedData.length}
                            color="primary"
                            tooltipTitle="Completed Requests"
                            IconComponent={CheckCircleIcon}
                            completedReqData={completedData}
                            type="Completed"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
                {/* <BadgeDialog
                  open={open}
                  onClose={handleClose}
                  completedReqData={completedData}
                  pendingReqData={pendingData}
                /> */}
              </div>

              <div className="col-lg-4 col-md-6 col-sm-4">
                <Link to="/app/EmitterInwardNew">
                  <div
                    className="card bg-base-100 shadow-xl mb-3 pt-3 pb-3 pl-3 mt-3 transition duration-300 ease-in-out hover:scale-105 duration-500"
                    style={{
                      "--tw-bg-opacity": "1",
                      "--tw-hover-bg-color": "#d2fbd0",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#d2fbd0")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                  >
                    <div className="">
                      <div className="d-flex flex-row align-items-center">
                        <img
                          src="/incoming.png"
                          style={{
                            width: "32px",
                            height: "32px",
                            marginRight: "6px",
                          }}
                          alt="Incoming"
                        />
                        <h4 className="text-md font-semibold">Bin Inward</h4>
                        <div
                          className="d-flex flex-row align-items-center"
                          style={{ marginLeft: "0.4rem" }}
                        >
                          {/* <BadgeWithIcon
                            badgeContent={5}
                            color="primary"
                            tooltipTitle="Completed Inwards"
                            onClick={() => handleOpen("Completed Inwards")}
                            IconComponent={VerifiedIcon}
                            style={{ marginLeft: "0.4rem" }}
                          /> */}
                          <BadgeWithIcon
                            badgeContent={pendingInwardData.length}
                            color="primary"
                            tooltipTitle="Pending inward"
                            IconComponent={DownloadingIcon}
                            pendingReqData={pendingInwardData}
                            type="Pending"
                            inward="Inward"
                          />
                          <BadgeWithIcon
                            badgeContent={completedInwardData.length}
                            color="primary"
                            tooltipTitle="Completed inward"
                            IconComponent={CheckCircleIcon}
                            completedReqData={completedInwardData}
                            type="Completed"
                            inward="Inward"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="col-lg-4 col-md-6 col-sm-4">
                <Link to="/app/BinOutward">
                  <div
                    className="card bg-base-100 shadow-xl mb-3 pt-3 pb-3 pl-3 mt-3 transition duration-300 ease-in-out hover:scale-105 duration-500"
                    style={{
                      "--tw-bg-opacity": "1",
                      "--tw-hover-bg-color": "#d2fbd0",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#d2fbd0")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                  >
                    <div className="">
                      <div className="d-flex flex-row align-items-center">
                        <img
                          src="/outgoing.png"
                          style={{
                            width: "30px",
                            height: "30px",
                            marginRight: "6px",
                          }}
                          alt="Outgoing"
                        />
                        <h4 className="text-md font-semibold">Bin Outward</h4>
                        <div
                          className="d-flex flex-row align-items-center"
                          style={{ marginLeft: "1rem" }}
                        >
                          {/* <BadgeWithIcon
                            badgeContent={pendingData.length}
                            color="secondary"
                            tooltipTitle="Pending Requests"
                            IconComponent={HourglassEmptyIcon}
                            pendingReqData={pendingData}
                            type="Pending"
                          /> */}
                          <BadgeWithIcon
                            badgeContent={completedOutwardData.length}
                            color="primary"
                            tooltipTitle="Completed Requests"
                            IconComponent={CheckCircleIcon}
                            completedReqData={completedOutwardData}
                            type="Completed"
                            outward="Outward"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="col-lg-4 col-md-6 col-sm-4">
                <Link to="/app/emitterdispatch">
                  <div
                    className="card bg-base-100 shadow-xl mb-4 pt-3 pb-3 pl-3 mt-3 transition duration-300 ease-in-out hover:scale-105 duration-500"
                    style={{
                      "--tw-bg-opacity": "1",
                      "--tw-hover-bg-color": "#d2fbd0",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#d2fbd0")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                    // style={{ width: "14rem" }}
                  >
                    <div className="">
                      <div className="d-flex flex-row">
                        {/* <TbChartInfographic
                        className="text-md font-semibold me-2 w-8 h-8"
                        style={{ marginTop: -6 }}
                      /> */}
                        <img
                          src={
                            "https://cdn-icons-png.flaticon.com/128/6734/6734037.png"
                          }
                          style={{
                            width: "30px",
                            height: "30px",
                            marginRight: "6px",
                            marginTop: "-6",
                          }}
                        />
                        <h4 className="text-md font-semibold mt-2">
                          Emitter Dispatch
                        </h4>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="col-lg-4 col-md-6 col-sm-4">
                <Link to="/app/StockAdjustment">
                  <div
                    className="card bg-base-100 shadow-xl mb-4 pt-3 pb-3 pl-3 mt-3 transition duration-300 ease-in-out hover:scale-105 duration-500"
                    style={{
                      "--tw-bg-opacity": "1",
                      "--tw-hover-bg-color": "#d2fbd0",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#d2fbd0")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                    // style={{ width: "14rem" }}
                  >
                    <div className="">
                      <div className="d-flex flex-row">
                        {/* <TbChartInfographic
                        className="text-md font-semibold me-2 w-8 h-8"
                        style={{ marginTop: -6 }}
                      /> */}
                        <img
                          src={
                            "https://cdn-icons-png.flaticon.com/128/2782/2782163.png"
                          }
                          style={{
                            width: "30px",
                            height: "30px",
                            marginRight: "6px",
                            marginTop: "-6",
                          }}
                        />
                        <h4 className="text-md font-semibold mt-1">
                          Stock Report
                        </h4>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="col-lg-4 col-md-6 col-sm-4">
                <Link to="/app/emitterstockledgerreport">
                  <div
                    className="card bg-base-100 shadow-xl mb-4 pt-3 pb-3 pl-3 mt-3 transition duration-300 ease-in-out hover:scale-105 duration-500"
                    style={{
                      "--tw-bg-opacity": "1",
                      "--tw-hover-bg-color": "#d2fbd0",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#d2fbd0")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                    // style={{ width: "14rem" }}
                  >
                    <div className="">
                      <div className="d-flex flex-row">
                        {/* <TbChartInfographic
                        className="text-md font-semibold me-2 w-8 h-8"
                        style={{ marginTop: -6 }}
                      /> */}
                        <img
                          src={
                            "https://cdn-icons-png.flaticon.com/128/5571/5571780.png"
                          }
                          style={{
                            width: "30px",
                            height: "30px",
                            marginRight: "6px",
                            marginTop: "-6",
                          }}
                        />
                        <h4 className="text-md font-semibold mt-2">
                          Stock Ledger
                        </h4>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-4">
                <Link to="/app/emitterallotmentreport">
                  <div
                    className="card bg-base-100 shadow-xl mb-4 pt-3 pb-3 pl-3 mt-3 transition duration-300 ease-in-out hover:scale-105 duration-500"
                    style={{
                      "--tw-bg-opacity": "1",
                      "--tw-hover-bg-color": "#d2fbd0",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#d2fbd0")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                    // style={{ width: "14rem" }}
                  >
                    <div className="">
                      <div className="d-flex flex-row">
                        {/* <TbChartInfographic
                        className="text-md font-semibold me-2 w-8 h-8"
                        style={{ marginTop: -6 }}
                      /> */}
                        <img
                          src={
                            "https://cdn-icons-png.flaticon.com/128/3163/3163235.png"
                          }
                          style={{
                            width: "30px",
                            height: "30px",
                            marginRight: "6px",
                            marginTop: "-6",
                          }}
                        />
                        <h4 className="text-md font-semibold mt-2">
                          Allotment Register
                        </h4>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-4">
                <Link to="#">
                  <div
                    className="card bg-base-100 shadow-xl mb-4 pt-3 pb-3 pl-3 mt-3 transition duration-300 ease-in-out hover:scale-105 duration-500"
                    style={{
                      "--tw-bg-opacity": "1",
                      "--tw-hover-bg-color": "#d2fbd0",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#d2fbd0")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                    // style={{ width: "14rem" }}
                  >
                    <div className="">
                      <div className="d-flex flex-row">
                        {/* <TbChartInfographic
                        className="text-md font-semibold me-2 w-8 h-8"
                        style={{ marginTop: -6 }}
                      /> */}
                        <img
                          src={
                            "https://cdn-icons-png.flaticon.com/128/10050/10050999.png"
                          }
                          style={{
                            width: "30px",
                            height: "30px",
                            marginRight: "6px",
                            marginTop: "-6",
                          }}
                        />
                        <h4 className="text-md font-semibold mt-2">Finance</h4>
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
                        className="text-md font-semibold me-2 w-7 h-7"
                        style={{ marginTop: 2 }}
                      />
                      <h4 className="text-md font-semibold">Issue Request</h4>
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
                        className="text-md font-semibold me-2 w-7 h-7"
                        style={{ marginTop: 2 }}
                      />
                      <h4 className="text-md font-semibold">Inward</h4>
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
                        className="text-md font-semibold me-2 w-7 h-7"
                        style={{ marginTop: 2 }}
                      />
                      <h4 className="text-md font-semibold">Outward</h4>
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
                        className="text-md font-semibold me-2 w-8 h-8"
                        style={{ marginTop: -6 }}
                      />
                      <h4 className="text-md font-semibold">Stock Report</h4>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div> */}
        {/* <h4 className="text-md dark:text-slate-300 font-semibold mt-3 ms-3">
            Recent transfer IN
          </h4>
          <h4 className="text-md dark:text-slate-300 font-semibold mt-3 ms-3">
            Recent transfer OUT
          </h4> */}
        {/* </div> */}
      </div>
    </div>
  );
}

export default WelcomeEmitter;

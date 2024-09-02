import CircleStackIcon from "@heroicons/react/24/outline/CircleStackIcon";
import CreditCardIcon from "@heroicons/react/24/outline/CreditCardIcon";
import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LastLogin from "../../utils/LastLogin";

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

function WelcomeDocumentUser() {
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
          "receiverId",
          response.data.paramObjectsMap.userVO.customersVO.id
        );
        console.log("userVO", response.data.paramObjectsMap.userVO);
      }
    } catch (error) {}
  };

  return (
    <>
      <div style={{ padding: "0% 5% 0% 5%" }}>
        <div>
          <ToastContainer />
        </div>
        <div className="row" style={{ gap: "3%" }}>
          <div
            className="col-lg-3 card bg-base-100 shadow-xl mb-4 pe-2 d-none d-lg-block mt-2"
            style={{ height: "400px" }}
          >
            <div className="">
              <h4 className="text-2xl font-semibold mt-4 mb-2 text-center">
                WELCOME TO
              </h4>
              <img
                src="/ai.png"
                style={{ width: "100px", margin: "auto" }}
                className="text-center mb-3"
              />

              <LastLogin userDetail={userDetail} />
            </div>
          </div>

          <div className="col-lg-3 col-md-3 card bg-white shadow-xl mb-4 p-3 rounded-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out d-block d-lg-none">
            <div className="text-center">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginLeft: "15%",
                }}
              >
                <h4 className="text-lg font-semibold mt-4 mb-2 ">Welcome</h4>
                <h4
                  className="text-lg font-bold mt-4 mb-2 ml-2"
                  style={{ color: "green" }}
                >
                  {userDetail.firstName} !
                </h4>
              </div>
              <b>
                <p className="text-sm ms-2 mb-2">
                  Last login
                  <span>
                    {userDetail.lastLogin === null
                      ? moment().format("MMMM Do YYYY, h:mm:ss a")
                      : moment(userDetail.lastLogin).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}
                  </span>
                </p>
              </b>
            </div>
          </div>

          <div className="col-lg-8 col-md-8 card bg-white shadow-xl mb-4 p-3 rounded-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <>
              <div className="grid lg:grid-cols-2 mt-2 md:grid-cols-2 grid-cols-1 gap-3">
                <div className="col-lg-12">
                  <Link to="/app/materialissuemanifest">
                    <div
                      className="card bg-base-100 shadow-xl mb-2  pt-3 pb-3 pl-3 mt-2 transition duration-300 ease-in-out"
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
                      <div className="d-flex flex-row">
                        <img
                          src="/outgoing.png"
                          style={{
                            width: "35px",
                            height: "35px",
                            marginRight: "6px",
                          }}
                        />
                        <h4 className="text-lg font-semibold">
                          Material Issue Manifest
                        </h4>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="col-lg-12">
                  <Link to={"/app/retrievalissuemanifest"}>
                    <div
                      className="card bg-base-100 shadow-xl mb-2  pt-3 pb-3 pl-3 mt-2 transition duration-300 ease-in-out"
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
                      <div className="d-flex flex-row">
                        <img
                          src="/incoming.png"
                          style={{
                            width: "32px",
                            height: "32px",
                            marginRight: "6px",
                          }}
                        />
                        <h4 className="text-lg font-semibold">
                          Retrieval Issue Manifest
                        </h4>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-lg-12">
                  <Link to="/app/purchaseorder">
                    <div
                      className="card bg-base-100 shadow-xl mb-2  pt-3 pb-3 pl-3 mt-2 transition duration-300 ease-in-out"
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
                      <div className="d-flex flex-row">
                        <img
                          src="https://cdn-icons-png.flaticon.com/128/3143/3143218.png"
                          style={{
                            width: "32px",
                            height: "32px",
                            marginRight: "6px",
                          }}
                        />
                        <h4 className="text-lg font-semibold">
                          Purchase Order
                        </h4>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-lg-12">
                  <Link to="/app/invoice">
                    <div
                      className="card bg-base-100 shadow-xl mb-2  pt-3 pb-3 pl-3 mt-2 transition duration-300 ease-in-out"
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
                      <div className="d-flex flex-row">
                        <img
                          src="https://cdn-icons-png.flaticon.com/128/3143/3143218.png"
                          style={{
                            width: "32px",
                            height: "32px",
                            marginRight: "6px",
                          }}
                        />
                        <h4 className="text-lg font-semibold">Invoice</h4>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="col-lg-12">
                  <Link to="/app/paymentAdvice">
                    <div
                      className="card bg-base-100 shadow-xl mb-2  pt-3 pb-3 pl-3 mt-2 transition duration-300 ease-in-out"
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
                      <div className="d-flex flex-row">
                        <img
                          src="https://cdn-icons-png.flaticon.com/128/3143/3143218.png"
                          style={{
                            width: "32px",
                            height: "32px",
                            marginRight: "6px",
                          }}
                        />
                        <h4 className="text-lg font-semibold">
                          Payment Advice
                        </h4>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </>
          </div>
        </div>
      </div>
    </>
  );
}

export default WelcomeDocumentUser;

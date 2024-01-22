import React from "react";
import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

function WelcomeEmitter() {
  return (
    <>
      <div className="row">
        <div className="col-lg-3 card bg-base-100 shadow-xl mb-4 pe-2">
          <div className="">
            <h4 className="text-2xl font-semibold mt-4 ms-2 mb-4">
              WELCOME TO
            </h4>
            <img src="/binbee.png" className="mb-3" />
            <h4 className="text-xl dark:text-slate-300 font-semibold ms-2 mb-1">
              Senthil
            </h4>
            <p className="ms-2 mb-2">Last login 12-01-2024 09:43</p>
            <p className="text-2xl ms-2">Tue</p>
            <p className="text-5xl ms-5">Jan</p>
            <p className="text-9xl text-right me-2 mb-3">17</p>
          </div>
        </div>
        <div className="col-lg-9 card bg-base-100 shadow-xl mb-4"></div>
        <div className="col-lg-3 card bg-base-100 shadow-xl mb-4 pe-2">
          <div className="">
            <div className="d-flex flex-row">
              <FaLocationDot
                className="text-xl font-semibold ms-2 w-7 h-7"
                style={{ marginTop: 30 }}
              />
              <h4 className="text-2xl font-semibold mt-4 pt-1 ms-1 mb-4">
                Location
              </h4>
            </div>
            <h4 className="text-xl dark:text-slate-300 font-semibold ms-2 mb-3">
              Gabriel
            </h4>
            <p className="ms-2 mb-3">
              29, Milestone Village, Kuruli, Pune Nasik Highway, Taluk Khed,
              Pune, Maharashtra, 410501 India
            </p>
          </div>
        </div>
        <div className="col-lg-9 flex-row d-flex card bg-base-100 shadow-xl mb-4">
          <div className="col-lg-4">
            <Link to="/app/IssueReq">
              <div className="w-60 card bg-base-100 shadow-xl mb-4 p-3 mt-3">
                <div className="">
                  <div className="d-flex flex-row">
                    <FaArrowCircleUp
                      className="text-xl font-semibold me-2 w-7 h-7"
                      style={{ marginTop: 4 }}
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
                      style={{ marginTop: 4 }}
                    />
                    <h4 className="text-xl font-semibold">Emitter Inward</h4>
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
                    <FaArrowCircleDown
                      className="text-xl font-semibold me-2 w-7 h-7"
                      style={{ marginTop: 4 }}
                    />
                    <h4 className="text-xl font-semibold">Emitter Outward</h4>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* <h4 className="text-xl dark:text-slate-300 font-semibold mt-3 ms-3">
            Recent transfer IN
          </h4>
          <h4 className="text-xl dark:text-slate-300 font-semibold mt-3 ms-3">
            Recent transfer OUT
          </h4> */}
        </div>
      </div>
    </>
  );
}

export default WelcomeEmitter;

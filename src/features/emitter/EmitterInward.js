import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { MdDoubleArrow } from "react-icons/md";
import EmitterInwardDetails from "./EmitterInwardDetails";

function EmitterInward() {
  return (
    <>
      <div className="container-sm">
        <div className="card bg-base-100 shadow-xl">
          <div className="row">
            <div className="col-lg-2"></div>
            <div className="col-lg-3 card bg-base-100 shadow-xl m-3">
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
            <div className="col-lg-1">
              <MdDoubleArrow
                className="text-xl font-semibold w-16  h-16 "
                style={{ marginTop: 100 }}
              />
            </div>
            <div className="col-lg-3 card bg-base-100 shadow-xl m-3">
              <div className="">
                <div className="d-flex flex-row">
                  <FaLocationDot
                    className="text-xl font-semibold ms-2 w-7 h-7"
                    style={{ marginTop: 30 }}
                  />
                  <h4 className="text-2xl font-semibold mt-4 pt-1 ms-1 mb-4">
                    Flow To
                  </h4>
                </div>
                <select className="form-select w-10/12 ms-1 mb-2">
                  <option value="Tata Motors-Pune">Tata Motors-Pune</option>
                  <option value="Tata Motors-Chennai">
                    Tata Motors-Chennai
                  </option>
                  <option value="Tata Motors-Mumbai">Tata Motors-Mumbai</option>
                </select>
                <h4 className="text-xl dark:text-slate-300 font-semibold ms-2 mb-3">
                  Tata Motors- Pune
                </h4>
                <p className="ms-2 mb-3">
                  29, Milestone Village, Kuruli, Pune Nasik Highway, Taluk Khed,
                  Pune, Maharashtra, 410501 India
                </p>
              </div>
            </div>
          </div>
          <EmitterInwardDetails />
        </div>
      </div>
    </>
  );
}
export default EmitterInward;

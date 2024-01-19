import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { FaLocationDot } from "react-icons/fa6";
import { MdDoubleArrow } from "react-icons/md";
import Billing from "../settings/billing";

function IssueManifest() {
  const [dateValue, setDateValue] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleDatePickerValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setDateValue(newValue);
  };
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
                  SCM AI-PACKS PVT LTD
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
                    Issued To
                  </h4>
                </div>
                <select className="form-select w-10/12 ms-1 mb-2">
                  <option value="Gabriel India Ltd">Gabriel India Ltd</option>
                  <option value="Tata Motors-Pune">Tata Motors-Pune</option>
                  <option value="Tata Motors-Chennai">
                    Tata Motors-Chennai
                  </option>
                  <option value="Tata Motors-Mumbai">Tata Motors-Mumbai</option>
                </select>
                <h4 className="text-xl dark:text-slate-300 font-semibold ms-2 mb-3">
                  Gabriel India Ltd
                </h4>
                <p className="ms-2 mb-3">
                  29, Milestone Village, Kuruli, Pune Nasik Highway, Taluk Khed,
                  Pune, Maharashtra, 410501 India
                </p>
              </div>
            </div>
          </div>
          <div className="ms-4">
            <div className="text-xl font-semibold mb-3">Select Date Range</div>
            <Datepicker
              containerClassName="w-72"
              value={dateValue}
              theme={"light"}
              inputClassName="input input-bordered w-72"
              popoverDirection="down"
              toggleClassName="invisible"
              onChange={handleDatePickerValueChange}
              showShortcuts={true}
              primaryColor={"white"}
            />
          </div>
          <Billing />
        </div>
      </div>
    </>
  );
}
export default IssueManifest;

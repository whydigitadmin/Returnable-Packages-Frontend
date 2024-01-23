import { Button } from "@mui/material";
import React from "react";
import { FaStarOfLife } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

export const EmptyCount = () => {
  return (
    <>
      <div className="row" style={{ padding: "0% 8% 0% 8%" }}>
        <div className="col-lg-3 card bg-base-100 shadow-xl mb-4 pe-2">
          <div className="">
            {/* <h4 className="text-2xl font-semibold mt-4 ms-2 mb-4">
              WELCOME TO
            </h4>
            <img src="/binbee.png" className="mb-3" />
            <h4 className="text-xl dark:text-slate-300 font-semibold ms-2 mb-1">
              Senthil
            </h4>
            <p className="ms-2 mb-2">Last login 12-01-2024 09:43</p> */}
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
        <div className="col-lg-1"></div>
        <div className="col-lg-7 card bg-base-100 shadow-xl mb-4">
          <div>
            <div className="row mt-4">
              <div className="col-lg-3 col-md-6 mb-2">
                <label className="label">
                  <span
                    className={
                      "label-text label-font-size text-base-content d-flex flex-row"
                    }
                  >
                    Asset Code :
                    <FaStarOfLife className="must" />
                  </span>
                </label>
              </div>
              <div className="col-lg-4 col-md-6 mb-2">
                <input
                  className="form-control form-sz mb-2"
                  type={"text"}
                  placeholder={""}
                  // name="storageMapping"
                  // value={storageMapping}
                  // onChange={handleInputChange}
                />
                {/* {errors.storageMapping && (
              <span className="error-text">{errors.storageMapping}</span>
            )} */}
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3 col-md-6 mb-2">
                <label className="label">
                  <span
                    className={
                      "label-text label-font-size text-base-content d-flex flex-row"
                    }
                  >
                    Asset Name :
                    <FaStarOfLife className="must" />
                  </span>
                </label>
              </div>
              <div className="col-lg-4 col-md-6 mb-2">
                <input
                  className="form-control form-sz mb-2"
                  type={"text"}
                  placeholder={""}
                  // name="storageMapping"
                  // value={storageMapping}
                  // onChange={handleInputChange}
                />
                {/* {errors.storageMapping && (
              <span className="error-text">{errors.storageMapping}</span>
            )} */}
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3 col-md-6">
                <label className="label">
                  <span
                    className={
                      "label-text label-font-size text-base-content d-flex flex-row"
                    }
                  >
                    Day empty count :
                    <FaStarOfLife className="must" />
                  </span>
                </label>
              </div>
              <div className="col-lg-4 col-md-6">
                <input
                  className="form-control form-sz mb-2"
                  type={"text"}
                  placeholder={""}
                  // name="storageMapping"
                  // value={storageMapping}
                  // onChange={handleInputChange}
                />
                {/* {errors.storageMapping && (
              <span className="error-text">{errors.storageMapping}</span>
            )} */}
              </div>
            </div>
            <div className="d-flex justify-content-center mb-4 mt-2">
              <Button component="label" variant="contained">
                Confirm
              </Button>
            </div>
          </div>
        </div>
        {/* <div className="col-lg-3 card bg-base-100 shadow-xl mb-4 pe-2">
          <div className=""></div>
        </div> */}
      </div>
    </>
  );
};

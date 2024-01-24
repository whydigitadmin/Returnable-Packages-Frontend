import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import EmptyCountDetails from "./EmptyCountDetail";
export const EmptyCount = () => {
  return (
    <>
      {/* <div className="row" style={{ padding: "0% 8% 0% 8%" }}>
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
                    Day Opening Stock
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
                    Day Retrieval stock
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
                    Day closing stock
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
        
              </div>
            </div>
            <div className="d-flex justify-content-center mb-4 mt-2">
              <Button component="label" variant="contained">
                Confirm
              </Button>
            </div>
          </div>
        </div>
      
      </div> */}
      <div className="container-sm">
        <div className="card bg-base-100 shadow-xl">
          <div className="row">
            <div className="col-lg-5 card bg-base-100 shadow-xl ms-4 mt-3 me-2">
              <div className="p-1">
                <div className="d-flex flex-row">
                  <FaLocationDot
                    className="text-xl font-semibold w-5 h-5"
                    style={{ marginTop: 14 }}
                  />
                  {/* <h4 className="text-xl font-semibold pt-1 mt-2 ms-1 mb-2">
                    Location -
                  </h4> */}
                  <h4 className="text-2xl font-semibold ms-1 mt-2">
                    Tata Motors
                  </h4>
                </div>
              </div>
              <p className="mb-3">
                29, Milestone Village, Kuruli, Pune Nasik Highway, Taluk Khed,
                Pune, Maharashtra, 410501 India
              </p>
            </div>
            {/* <div className="col-lg-1">
              <MdDoubleArrow
                className="text-xl font-semibold w-16  h-16 "
                style={{ marginTop: 70 }}
              />
            </div>
            <div className="col-lg-5 card bg-base-100 shadow-xl ms-2 mt-3">
              <div className="p-1">
                <div className="d-flex flex-row">
                  <FaLocationDot
                    className="text-xl font-semibold w-5 h-5"
                    style={{ marginTop: 11 }}
                  />
                  <h4 className="text-xl font-semibold mt-2 ms-1 me-1 mb-2">
                    Issued To -
                  </h4>
                  <select className="form-select w-56 h-10 mt-1 mb-2">
                    <option value="Tata Motors-Pune">Tata Motors-Pune</option>
                    <option value="Tata Motors-Chennai">
                      Tata Motors-Chennai
                    </option>
                    <option value="Tata Motors-Mumbai">
                      Tata Motors-Mumbai
                    </option>
                  </select>
                </div>

                <h4 className="text-xl dark:text-slate-300 font-semibold ms-1 mb-2">
                  Tata Motors- Pune
                </h4>
                <p className="ms-1 mb-2">
                  29, Milestone Village, Kuruli, Pune Nasik Highway, Taluk Khed,
                  Pune, Maharashtra, 410501 India
                </p>
              </div>
            </div> */}
          </div>
          <EmptyCountDetails />
        </div>
      </div>
    </>
  );
};

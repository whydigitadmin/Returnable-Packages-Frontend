import * as React from "react";
import moment from "moment";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { FaCloudUploadAlt } from "react-icons/fa";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../../components/Cards/TitleCard";
import { showNotification } from "../../common/headerSlice";
import { FaArrowCircleLeft, FaStarOfLife } from "react-icons/fa";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IoMdClose } from "react-icons/io";
import InputText from "../../../components/Input/InputText";
import TextAreaInput from "../../../components/Input/TextAreaInput";
import ToogleInput from "../../../components/Input/ToogleInput";
import { Link } from "react-router-dom";

function ProfileSettings() {
  const [openModal, setOpenModal] = React.useState(false);
  const [name, setName] = useState(localStorage.getItem("userName"));
  const [role, setRole] = useState(localStorage.getItem("userDetails"));
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };
  // Call API to update profile settings changes
  const updateProfile = () => {
    dispatch(showNotification({ message: "Profile Updated", status: 1 }));
  };

  const updateFormValue = ({ updateType, value }) => {
    console.log(updateType);
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <>
      <div>
        {(role === "ROLE_USER" ||
          role === "ROLE_ADMIN" ||
          role === "ROLE_DOCUMENT" ||
          role === "ROLE_ALLOCATOR") && (
          <div className="card p-6 bg-base-100 shadow-xl">
            <div className="row">
              <div className="col-lg-3 col-md-6 mb-2">
                <label className="label">
                  <span className="label-text label-font-size text-base-content d-flex flex-row">
                    User ID:
                    {/* <FaStarOfLife className="must" /> */}
                  </span>
                </label>
              </div>
              <div className="col-lg-3 col-md-6 mb-2">
                <input
                  className="form-control form-sz mb-2"
                  type="text"
                  value={name}
                  disabled
                />
              </div>
              <div className="col-lg-6 col-md-12 mb-2"></div>
              <div className="col-lg-3 col-md-6 mb-2">
                <label className="label">
                  <span className="label-text label-font-size text-base-content d-flex flex-row">
                    Role:
                    {/* <FaStarOfLife className="must" /> */}
                  </span>
                </label>
              </div>
              <div className="col-lg-3 col-md-6 mb-2">
                <input
                  className="form-control form-sz mb-2"
                  type="text"
                  value={role}
                  disabled
                />
              </div>
            </div>
          </div>
        )}

        {(role === "ROLE_EMITTER" || role === "ROLE_OEM") && (
          <div className="container-sm">
            <div className="card p-6 bg-emitter shadow-xl">
              <div className="row">
                <div className="d-flex flex-row mb-3">
                  {role === "ROLE_EMITTER" ? (
                    <Link to="/app/welcomeemitter">
                      <FaArrowCircleLeft className="cursor-pointer w-8 h-8" />
                    </Link>
                  ) : (
                    <Link to="/app/welcomeoem">
                      <FaArrowCircleLeft className="cursor-pointer w-8 h-8" />
                    </Link>
                  )}
                  <p className="ms-2 text-2xl">
                    <strong>My Profile</strong>
                  </p>
                </div>
                <div className="col-lg-3 col-md-6 mb-2">
                  <label className="label">
                    <span className="label-text label-font-size text-emitter d-flex flex-row">
                      User ID:
                      {/* <FaStarOfLife className="must" /> */}
                    </span>
                  </label>
                </div>
                <div className="col-lg-3 col-md-6 mb-2">
                  <input
                    className="form-control form-sz mb-2"
                    type="text"
                    value={name}
                    disabled
                  />
                </div>
                <div className="col-lg-6 col-md-12 mb-2"></div>
                <div className="col-lg-3 col-md-6 mb-2">
                  <label className="label">
                    <span className="label-text label-font-size text-emitter d-flex flex-row">
                      Role:
                      {/* <FaStarOfLife className="must" /> */}
                    </span>
                  </label>
                </div>
                <div className="col-lg-3 col-md-6 mb-2">
                  <input
                    className="form-control form-sz mb-2"
                    type="text"
                    value={role}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* <TitleCard title="My Profile" topMargin="mt-2">
      <div className="row mb-4">
          <div className="col-lg-3 col-md-6">
            <label className="label label-text label-font-size text-base-content">
              Organization Logo:
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <Button
              component="label"
              variant="contained"
              className="text-form"
              startIcon={<FaCloudUploadAlt />}
            >
              Upload Logo
              <VisuallyHiddenInput type="file" />
            </Button>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-lg-3 col-md-6">
            <label className="label label-text label-font-size text-base-content">
              Organization Name:
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <input
              style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
              type={"text"}
              disabled
              // value={value}
              placeholder={"ABC"}
              // onChange={(e) => updateInputValue(e.target.value)}
              className="input input-bordered p-2"
            />
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-lg-3 col-md-6">
            <label className="label label-text label-font-size text-base-content">
              Subscription Type:
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <p>RTI</p>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-lg-3 col-md-6">
            <label className="label label-text label-font-size text-base-content">
              Email Address:
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <input
              style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
              type={"text"}
              disabled
              // value={value}
              placeholder={"ABC"}
              // onChange={(e) => updateInputValue(e.target.value)}
              className="input input-bordered p-2"
            />
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-lg-3 col-md-6">
            <label className="label label-text label-font-size text-base-content">
              Phone No:
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <input
              style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
              type={"number"}
              // value={value}
              placeholder={"9807654321"}
              // onChange={(e) => updateInputValue(e.target.value)}
              className="input input-bordered p-2"
            />
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-lg-3 col-md-6">
            <label className="label label-text label-font-size text-base-content">
              Billing Address:
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <Button
              variant="outlined"
              size="small"
              className="white-btn label px-4"
              onClick={handleClickOpen}
            >
              Billing Address 1
            </Button>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-lg-3 col-md-6"></div>
          <div className="col-lg-3 col-md-6">
            <button
              type="button"
              className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              + Add Billing Address 1
            </button>
          </div>
        </div>
        <div className="d-flex flex-row mt-3">
          <button
            type="button"
            className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Save
          </button>
          <Link to="/">
            <button
              type="button"
              className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Cancel
            </button>
          </Link>
        </div>
        <Dialog
          fullWidth={true}
          maxWidth={"sm"}
          open={openModal}
          onClose={handleClose}
        >
          <div className="d-flex justify-content-between">
            <DialogTitle>Add Billing Address</DialogTitle>
            <IoMdClose
              onClick={handleClose}
              className="cursor-pointer w-8 h-8 mt-3 me-3"
            />
          </div>
          <DialogContent>
            <DialogContentText className="d-flex flex-column">
              <div className="row mb-3">
                <div className="col-lg-6 col-md-6">
                  <label className="label label-text label-font-size text-base-content">
                    GST Registration Status
                  </label>
                </div>
                <div className="col-lg-6 col-md-6">
                  <select
                    name="Select Item"
                    style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
                    className="input input-bordered ps-2"
                  >
                    <option value=""></option>
                    <option value="">Registered</option>
                    <option value="">Unregistered</option>
                  </select>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-lg-6 col-md-6">
                  <label className="label label-text label-font-size text-base-content">
                    GST Number
                  </label>
                </div>
                <div className="col-lg-6 col-md-6">
                  <input
                    style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
                    type={"number"}
                    // value={value}
                    placeholder={"GST Number"}
                    // onChange={(e) => updateInputValue(e.target.value)}
                    className="input input-bordered p-2"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-lg-6 col-md-6">
                  <label className="label label-text label-font-size text-base-content">
                    Street 1
                  </label>
                </div>
                <div className="col-lg-6 col-md-6">
                  <textarea
                    style={{ fontSize: "0.800rem" }}
                    className="form-control label label-text label-font-size text-base-content"
                    placeholder="Street 1"
                  ></textarea>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-lg-6 col-md-6">
                  <label className="label label-text label-font-size text-base-content">
                    Street 2
                  </label>
                </div>
                <div className="col-lg-6 col-md-6">
                  <textarea
                    style={{ fontSize: "0.800rem" }}
                    className="form-control label label-text label-font-size text-base-content"
                    placeholder="Street 2"
                  ></textarea>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-lg-6 col-md-6">
                  <label className="label label-text label-font-size text-base-content">
                    State
                  </label>
                </div>
                <div className="col-lg-6 col-md-6">
                  <select
                    name="Select Item"
                    style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
                    className="input input-bordered ps-2"
                  >
                    <option value=""></option>
                    <option value="">Tamil Nadu</option>
                    <option value="">Goa</option>
                  </select>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-lg-6 col-md-6">
                  <label className="label label-text label-font-size text-base-content">
                    City
                  </label>
                </div>
                <div className="col-lg-6 col-md-6">
                  <input
                    style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
                    type={"text"}
                    // value={value}
                    placeholder={"City"}
                    // onChange={(e) => updateInputValue(e.target.value)}
                    className="input input-bordered p-2"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-lg-6 col-md-6">
                  <label className="label label-text label-font-size text-base-content">
                    Pin Code
                  </label>
                </div>
                <div className="col-lg-6 col-md-6">
                  <input
                    style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
                    type={"number"}
                    // value={value}
                    placeholder={"Pin Code"}
                    // onChange={(e) => updateInputValue(e.target.value)}
                    className="input input-bordered p-2"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-lg-6 col-md-6">
                  <label className="label label-text label-font-size text-base-content">
                    Contact Name
                  </label>
                </div>
                <div className="col-lg-6 col-md-6">
                  <input
                    style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
                    type={"text"}
                    // value={value}
                    placeholder={"Contact Name"}
                    // onChange={(e) => updateInputValue(e.target.value)}
                    className="input input-bordered p-2"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-lg-6 col-md-6">
                  <label className="label label-text label-font-size text-base-content">
                    Phone
                  </label>
                </div>
                <div className="col-lg-6 col-md-6">
                  <input
                    style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
                    type={"number"}
                    // value={value}
                    placeholder={"Phone"}
                    // onChange={(e) => updateInputValue(e.target.value)}
                    className="input input-bordered p-2"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-lg-6 col-md-6">
                  <div className="d-flex flex-row">
                    <input
                      style={{ marginTop: 10 }}
                      className="form-check-input me-1"
                      type="checkbox"
                      id="flexCheckDefault"
                    />
                    <label
                      className="label label-text label-font-size text-base-content"
                      for="flexCheckDefault"
                    >
                      Mark as Primary
                    </label>
                  </div>
                </div>
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions className="mb-2 me-2">
            <Button onClick={handleClose}>Cancel</Button>
            <Button component="label" variant="contained">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputText labelTitle="Name" defaultValue="Alex" updateFormValue={updateFormValue}/>
                    <InputText labelTitle="Email Id" defaultValue="alex@dashwind.com" updateFormValue={updateFormValue}/>
                    <InputText labelTitle="Title" defaultValue="UI/UX Designer" updateFormValue={updateFormValue}/>
                    <InputText labelTitle="Place" defaultValue="California" updateFormValue={updateFormValue}/>
                    <TextAreaInput labelTitle="About" defaultValue="Doing what I love, part time traveller" updateFormValue={updateFormValue}/>
                </div>
                <div className="divider" ></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputText labelTitle="Language" defaultValue="English" updateFormValue={updateFormValue}/>
                    <InputText labelTitle="Timezone" defaultValue="IST" updateFormValue={updateFormValue}/>
                    <ToogleInput updateType="syncData" labelTitle="Sync Data" defaultValue={true} updateFormValue={updateFormValue}/>
                </div>

                <div className="mt-16"><button className="btn btn-primary float-right" onClick={() => updateProfile()}>Update</button></div> 
      </TitleCard>*/}
    </>
  );
}

export default ProfileSettings;

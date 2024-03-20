import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { FaStarOfLife } from "react-icons/fa";
import { AiFillSave, AiOutlineSearch, AiOutlineWallet } from "react-icons/ai";
import { BsListTask } from "react-icons/bs";
import TableComponent from "../user/TableComponent";

const DOCDATA = [
  {
    id: 1,
    SID: "IR",
    Prefix: "AI",
    Sequence: "00001",
    Suffix: "ABC",
    Type: "KT",
  },
];

export const DocumentType = () => {
  const buttonStyle = {
    fontSize: "20px", // Adjust the font size as needed
  };
  const [docdata, setDocData] = React.useState(DOCDATA);
  const [fromDate, setFromDate] = React.useState(null);
  const [toDate, setToDate] = React.useState(null);
  const [extDate, setExtDate] = React.useState(null);
  const [clientCode, setClientCode] = React.useState("");
  const [branch, setBranch] = React.useState(localStorage.getItem("branch"));
  const [active, setActive] = React.useState(true);
  const [errors, setErrors] = React.useState({});
  const [savedData, setSavedData] = React.useState("");
  const [view, setView] = React.useState(false);
  const [warehouseList, setWarehouseList] = React.useState([]);
  //   const currentDate = dayjs();
  const [value, setValue] = React.useState(0);
  const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));
  const [branchCode, setBranchCode] = React.useState(
    localStorage.getItem("branchCode")
  );
  const [allWarehouse, setAllWarehouse] = React.useState("");
  const docType = ["SID", "Prefix", "Sequence", "Suffix", "Type"]; // Define your column names
  const [rootData, setRootData] = React.useState({
    clientTableColumn: ["SID", "Prefix", "Sequence", "Suffix", "Type"],
    clientTableData: [
      {
        id: 1,
        SID: "IR",
        Prefix: "AI",
        Sequence: "00001",
        Suffix: "ABC",
        Type: "KT",
      },
    ],
  });

  // const branchfield = ["CustomerBranchCode"];
  // const branchData = [
  //   {
  //     id: 1,
  //     CustomerBranchCode: "MAA001",
  //   },
  // ];

  //   const handleWarehouseChange = (event) => {
  //     setWarehouse(event.target.value);
  //   };

  const handleBranchChange = (event) => {
    setBranch(event.target.value);
  };

  const handleActiveChange = (event) => {
    setActive(event.target.checked);
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  //   const handleSave = () => {
  //     const clientVOArray = rootData.clientTableData.map((client) => ({
  //       client: client.client,
  //       clientcode: client.clientcode,
  //       active: true,
  //       userid: userId, // Replace with the actual value
  //     }));
  //     if (handleValidation()) {
  //       // Replace this with your logic to save the data to a backend or database
  //       const dataToSave = {
  //         warehouse: warehouse,
  //         branch: branch,
  //         branchcode: branchCode,
  //         active: true,
  //         orgId: orgId, // Replace with the actual value
  //         updatedby: userId, // Replace with the actual value
  //         userid: userId,
  //         warehouseClientVO: clientVOArray,
  //         createdby: userId, // Replace with the actual value
  //       };
  //       setSavedData(dataToSave);
  //       console.log(dataToSave);
  //       const token = localStorage.getItem("token");

  //       if (token) {
  //         const headers = {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         };

  //         axios
  //           .post(`${process.env.REACT_APP_API_URL}/api/warehouse`, dataToSave, {
  //             headers,
  //           })
  //           .then((response) => {
  //             console.log("Data saved successfully:", response.data);
  //             setSavedData(response.data);
  //             handleNew();
  //           })
  //           .catch((error) => {
  //             console.error("Error saving data:", error);
  //           });
  //       } else {
  //         console.error("User is not authenticated. Please log in.");
  //       }
  //     }
  //   };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleView = () => {
    setView(!view);
  };

  const handleNew = () => {
    // setWarehouse("");
    // setClient("");
    // setClientCode("");
    //setBranch("");
    setActive(true);
    setErrors("");
    setView(true ? false : true);
  };

  return (
    <>
      <div className="pt-8 card w-full p-3 bg-base-100 shadow-xl mt-2">
        {/* <div className="d-flex justify-content-start mb-2 flex-wrap">
          <button
            className="btn btn-ghost btn-sm normal-case col-xs-2"
            onClick={handleNew}
          >
            <AiOutlineWallet style={buttonStyle} />
            <span className="ml-1">New</span>
          </button>
          <button className="btn btn-ghost btn-sm normal-case col-xs-2">
            <AiOutlineSearch style={buttonStyle} />
            <span className="ml-1">Search</span>
          </button>
          <button
            className="btn btn-ghost btn-sm normal-case col-xs-2"
            // onClick={handleSave}
          >
            <AiFillSave style={buttonStyle} />
            <span className="ml-1">Save</span>
          </button>
          <button
            className="btn btn-ghost btn-sm normal-case col-xs-2"
            onClick={handleView}
          >
            <BsListTask style={buttonStyle} />
            <span className="ml-1">List View</span>
          </button>
        </div> */}
        {view ? (
          //   <TableComponent fieldNames={warehouseField} data={allWarehouse} />
          <TableComponent fieldNames={docType} data={docdata} />
        ) : (
          <>
            <div className="row mt-3">
              <div className="col-lg-3 col-md-6">
                <label className="label mb-4">
                  <span
                    className={
                      "label-text label-font-size text-base-content d-flex flex-row"
                    }
                  >
                    Fin Year:
                    <FaStarOfLife className="must" />
                  </span>
                </label>
              </div>
              <div className="col-lg-3 col-md-6">
                <input
                  className="form-control form-sz mb-2"
                  placeholder={""}
                  //   name="finyear"
                  //   value={finyear}
                  //   onChange={handleInputChange}
                />
                {/* {errors.flowName && (
                  <span className="error-text mb-1">{errors.flowName}</span>
                )} */}
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3 col-md-6">
                <label className="label mb-4">
                  <span
                    className={
                      "label-text label-font-size text-base-content d-flex flex-row"
                    }
                  >
                    From Date:
                    <FaStarOfLife className="must" />
                  </span>
                </label>
              </div>
              <div className="col-lg-3 col-md-6">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    value={fromDate}
                    // onChange={handleIssueDateChange}
                    // minDate={currentDate}
                    slotProps={{
                      textField: { size: "small", clearable: true },
                    }}
                    format="DD/MM/YYYY"
                  />
                </LocalizationProvider>
                {/* {errors.flowName && (
                  <span className="error-text mb-1">{errors.flowName}</span>
                )} */}
              </div>
              <div className="col-lg-3 col-md-6">
                <label className="label mb-4">
                  <span
                    className={
                      "label-text label-font-size text-base-content d-flex flex-row"
                    }
                  >
                    To Date:
                    <FaStarOfLife className="must" />
                  </span>
                </label>
              </div>
              <div className="col-lg-3 col-md-6">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    value={toDate}
                    // onChange={handleIssueDateChange}
                    // minDate={currentDate}
                    slotProps={{
                      textField: { size: "small", clearable: true },
                    }}
                    format="DD/MM/YYYY"
                  />
                </LocalizationProvider>
                {/* {errors.flowName && (
                  <span className="error-text mb-1">{errors.flowName}</span>
                )} */}
              </div>
              <div className="col-lg-3 col-md-6">
                <label className="label mb-4">
                  <span
                    className={
                      "label-text label-font-size text-base-content d-flex flex-row"
                    }
                  >
                    Ext Date:
                    <FaStarOfLife className="must" />
                  </span>
                </label>
              </div>
              <div className="col-lg-3 col-md-6">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    value={extDate}
                    // onChange={handleIssueDateChange}
                    // minDate={currentDate}
                    slotProps={{
                      textField: { size: "small", clearable: true },
                    }}
                    format="DD/MM/YYYY"
                  />
                </LocalizationProvider>
                {/* {errors.flowName && (
                  <span className="error-text mb-1">{errors.flowName}</span>
                )} */}
              </div>
            </div>
            <div className="mb-4">
              <button
                type="button"
                className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                // onClick={handleSave}
              >
                Save
              </button>
            </div>
            <TableComponent
              fieldNames={rootData.clientTableColumn}
              data={rootData.clientTableData}
              rootData={rootData}
              setRootData={setRootData}
            />
          </>
        )}
      </div>
    </>
  );
};

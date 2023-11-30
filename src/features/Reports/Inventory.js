import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, quantity, action) {
  return { name, quantity, action };
}

const rows = [createData("One", 1)];

function Inventory() {
  return (
    <>
      <div className="card w-full p-6 bg-base-100 shadow-xl">
        <div className="mt-3">
          <div className="container">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a className="nav-link active" href="#1" data-bs-toggle="tab">
                  Inventory
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#2" data-bs-toggle="tab">
                  In Transits
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#3" data-bs-toggle="tab">
                  Customer
                </a>
              </li>
            </ul>
            <div className="tab-content">
              <div className="tab-pane active fade in show" id="1">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <form className="row mt-3">
                      <div className="col-md-8 col-lg-8">
                        <label for="validationCustom04" className="form-label">
                          Warehouse Type
                        </label>
                        <FormControl fullWidth size="small">
                          <InputLabel id="w-label">Select</InputLabel>
                          <Select
                            label="w-label"
                            // value={corporate}
                            // onChange={handleCorporateChange}
                          >
                            <MenuItem value="one">One</MenuItem>
                            <MenuItem value="two">Two</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                      <div className="col-md-4 col-lg-4">
                        <button
                          type="button"
                          style={{ marginTop: 33 }}
                          className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                        >
                          Get Inventory
                        </button>
                      </div>
                      <div className="d-flex flex-row">
                        <h1 className="text-2xl font-semibold mt-5 mb-3">
                          Inventory
                        </h1>
                        <button
                          type="button"
                          // style={{ marginTop: 33 }}
                          className="bg-blue mt-5 ms-3 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                        >
                          Download CSV
                        </button>
                      </div>
                      <div className="pe-3">
                        <TableContainer component={Paper}>
                          <Table
                            sx={{ minWidth: 300 }}
                            aria-label="simple table"
                          >
                            <TableHead>
                              <TableRow>
                                <TableCell>Product Info</TableCell>
                                <TableCell align="right">Quantity</TableCell>
                                <TableCell align="right">Action</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {rows.map((row) => (
                                <TableRow
                                  key={row.name}
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell component="th" scope="row">
                                    {row.name}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </div>
                    </form>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="flex justify-end" style={{ marginTop: 84 }}>
                      <div className="w-64">
                        <div className="relative flex w-full flex-wrap items-stretch">
                          <input
                            type="search"
                            className="relative h-fit m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-white bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                            placeholder="Search"
                            aria-label="Search"
                            aria-describedby="button-addon1"
                          />

                          <button
                            className="bg-blue h-fit relative z-[2] flex items-center rounded-r bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                            type="button"
                            id="button-addon1"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="h-4 w-4"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <h1 className="text-2xl font-semibold my-3">Details</h1>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 300 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Transaction No</TableCell>
                            <TableCell align="right">Date</TableCell>
                            <TableCell align="right">
                              Transaction Quantity
                            </TableCell>
                            <TableCell align="right">
                              Balance Quantity
                            </TableCell>
                            <TableCell align="right">Type</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row) => (
                            <TableRow
                              key={row.name}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {row.name}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="2">
                <h3>
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <form className="row mt-3">
                        <div className="col-md-8 col-lg-8">
                          <label
                            for="validationCustom04"
                            className="form-label mb-3"
                          >
                            Type
                          </label>
                          <FormControl fullWidth size="small">
                            <InputLabel id="w-label">Type</InputLabel>
                            <Select
                              label="w-label"
                              // value={corporate}
                              // onChange={handleCorporateChange}
                            >
                              <MenuItem value="one">Purchase Order</MenuItem>
                              <MenuItem value="two">Return</MenuItem>
                              <MenuItem value="two">Relocation</MenuItem>
                              <MenuItem value="two">Sales Return</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                        <div className="col-md-4 col-lg-4">
                          <button
                            type="button"
                            style={{ marginTop: 37 }}
                            className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                          >
                            Get Inventory
                          </button>
                        </div>
                        <div className="d-flex flex-row">
                          <h1 className="text-2xl font-semibold mt-3 mb-5">
                            Inbound InTransits
                          </h1>
                        </div>
                        <div className="pe-3">
                          <TableContainer component={Paper}>
                            <Table
                              sx={{ minWidth: 300 }}
                              aria-label="simple table"
                            >
                              <TableHead>
                                <TableRow>
                                  <TableCell>Product</TableCell>
                                  <TableCell align="right">Quantity</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {rows.map((row) => (
                                  <TableRow
                                    key={row.name}
                                    sx={{
                                      "&:last-child td, &:last-child th": {
                                        border: 0,
                                      },
                                    }}
                                  >
                                    <TableCell component="th" scope="row">
                                      {row.name}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </div>
                      </form>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <form className="row mt-3">
                        <div className="col-md-8 col-lg-8">
                          <label
                            for="validationCustom04"
                            className="form-label mb-3"
                          >
                            Type
                          </label>
                          <FormControl fullWidth size="small">
                            <InputLabel id="w-label">Type</InputLabel>
                            <Select
                              label="w-label"
                              // value={corporate}
                              // onChange={handleCorporateChange}
                            >
                              <MenuItem value="one">Allotment</MenuItem>
                              <MenuItem value="two">Outward</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                        <div className="col-md-4 col-lg-4">
                          <button
                            type="button"
                            style={{ marginTop: 37 }}
                            className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                          >
                            Get Inventory
                          </button>
                        </div>
                        <div className="d-flex flex-row">
                          <h1 className="text-2xl font-semibold mt-3 mb-5">
                            Outbound InTransits
                          </h1>
                        </div>
                        <div className="pe-3">
                          <TableContainer component={Paper}>
                            <Table
                              sx={{ minWidth: 300 }}
                              aria-label="simple table"
                            >
                              <TableHead>
                                <TableRow>
                                  <TableCell>Product</TableCell>
                                  <TableCell align="right">Quantity</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {rows.map((row) => (
                                  <TableRow
                                    key={row.name}
                                    sx={{
                                      "&:last-child td, &:last-child th": {
                                        border: 0,
                                      },
                                    }}
                                  >
                                    <TableCell component="th" scope="row">
                                      {row.name}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </div>
                      </form>
                    </div>
                  </div>
                </h3>
              </div>
              <div className="tab-pane fade" id="3">
                <form className="row mt-3">
                  <div className="col-md-3 col-lg-3">
                    <label for="validationCustom04" className="form-label">
                      Type
                    </label>
                    <FormControl fullWidth size="small">
                      <InputLabel id="w-label">Select</InputLabel>
                      <Select
                        label="w-label"
                        // value={corporate}
                        // onChange={handleCorporateChange}
                      >
                        <MenuItem value="one">Sender Customer</MenuItem>
                        <MenuItem value="two">Receiver Customer</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-md-3 col-lg-3">
                    <label for="validationCustom04" className="form-label">
                      Client
                    </label>
                    <FormControl fullWidth size="small">
                      <InputLabel id="w-label">Select</InputLabel>
                      <Select
                        label="w-label"
                        // value={corporate}
                        // onChange={handleCorporateChange}
                      >
                        <MenuItem value="one">One</MenuItem>
                        <MenuItem value="two">Two</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-md-4 col-lg-4">
                    <button
                      type="button"
                      style={{ marginTop: 33 }}
                      className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    >
                      Get Inventory
                    </button>
                  </div>
                </form>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="d-flex flex-row">
                      <h1 className="text-2xl font-semibold mt-5 mb-3">
                        My Inventory
                      </h1>
                      <button
                        type="button"
                        // style={{ marginTop: 33 }}
                        className="bg-blue mt-5 ms-3 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                      >
                        Download CSV
                      </button>
                    </div>
                    <div className="pe-3">
                      <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 300 }} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Client</TableCell>
                              <TableCell align="right">Product</TableCell>
                              <TableCell align="right">Product Info</TableCell>
                              <TableCell align="right">Quantity</TableCell>
                              <TableCell align="right">Action</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {rows.map((row) => (
                              <TableRow
                                key={row.name}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell component="th" scope="row">
                                  {row.name}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="flex justify-end" style={{ marginTop: 12 }}>
                      <div className="w-64">
                        <div className="relative flex w-full flex-wrap items-stretch">
                          <input
                            type="search"
                            className="relative h-fit m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-white bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                            placeholder="Search"
                            aria-label="Search"
                            aria-describedby="button-addon1"
                          />

                          <button
                            className="bg-blue h-fit relative z-[2] flex items-center rounded-r bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                            type="button"
                            id="button-addon1"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="h-4 w-4"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <h1 className="text-2xl font-semibold mb-3">Details</h1>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 300 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell align="right">
                              Transaction Quantity
                            </TableCell>
                            <TableCell align="right">
                              Balance Quantity
                            </TableCell>
                            <TableCell align="right">Type</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row) => (
                            <TableRow
                              key={row.name}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {row.name}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Inventory;

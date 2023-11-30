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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function createData(name, calories) {
  return { name, calories };
}

const rows = [createData("One", 1)];

function Audit() {
  const [docDate, setDocDate] = React.useState(null);
  return (
    <>
      <div className="card w-full p-6 bg-base-100 shadow-xl">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-6">
            <form className="row">
              <div className="col-md-7">
                <label for="validationCustom04" className="form-label">
                  Warehouse
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
              <div className="col-md-5 mb-4">
                <label className="form-label">Date</label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Select Date"
                    slotProps={{
                      textField: { size: "small", clearable: true },
                    }}
                    value={docDate}
                    onChange={(newValue) => setDocDate(newValue)}
                  />
                </LocalizationProvider>
              </div>
              <div className="d-flex justify-content-center">
                <div className="col-md-6 col-lg-4">
                  <button
                    type="button"
                    className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  >
                    Get Inventory
                  </button>
                </div>
              </div>
              <h1 className="text-2xl font-semibold my-3">Inventory</h1>
              <div className="pe-3">
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 300 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Product Code</TableCell>
                        <TableCell align="right">Product Quantity</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell align="right">{row.calories}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </form>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6">
            <form>
              <label for="validationCustom04" className="form-label px-5">
                Client
              </label>
              <div className="px-5">
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
              <div className="d-flex justify-content-center mt-4">
                <div className="col-md-4">
                  <button
                    type="button"
                    className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  >
                    Submit
                  </button>
                </div>
              </div>
              <h1 className="text-2xl font-semibold my-3">Client Inventory</h1>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 300 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Product Code</TableCell>
                      <TableCell align="right">Product Quantity</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.calories}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Audit;

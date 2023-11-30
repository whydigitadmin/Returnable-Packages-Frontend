import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { CiSettings } from "react-icons/ci";

const columns = [
  { field: "id", headerName: "TP ID", width: 100 },
  { field: "SCSId", headerName: "SCS ID", width: 150 },
  { field: "PartName", headerName: "Part Name", width: 150 },
  { field: "Client", headerName: "Client", width: 150 },
  { field: "SolutionRequired", headerName: "Solution Required", width: 150 },
  { field: "Action", headerName: "Action", width: 150 },
];

const rows = [
  {
    id: 1,
    SCSId: "Snow",
    PartName: "123",
    Client: "texas",
    SolutionRequired: "Active",
    Action: "Active",
  },
];

function TechnicalProposals() {
  return (
    <>
      <div className="card w-full p-6 bg-base-100 shadow-xl">
        <div className="flex justify-end mt-2">
          <div className="flex justify-start gap-x-2">
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
        </div>
        <h1 className="text-2xl font-semibold">Technical Proposals</h1>
        <div className="flex justify-end gap-x-2">
          <CiSettings className="cursor-pointer flex mt-0.5 h-[32px] w-[32px] justify-center rounded-lg bg-white text-center shadow shadow-black/10 dark:shadow-black/40" />
        </div>
        <div style={{ height: 400, width: "100%", marginTop: 30 }}>
          <DataGrid rows={rows} columns={columns} />
        </div>
      </div>
      <div
        className="tab-pane fade"
        id="ex1-tabs-2"
        role="tabpanel"
        aria-labelledby="ex1-tab-2"
      >
        Tab 2 content
      </div>
    </>
  );
}

export default TechnicalProposals;

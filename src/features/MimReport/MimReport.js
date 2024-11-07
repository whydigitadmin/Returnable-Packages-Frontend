import * as React from "react";
import { default as Axios, default as axios } from "axios";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import NoRecordsFound from "../../utils/NoRecordsFound";

export const MimReport = () => {
  const [tableData, setTableData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));
  const [userName, setUserName] = React.useState(
    localStorage.getItem("userName")
  );

  useEffect(() => {
    getAllIssueManifestProviderForPendingIR();
  }, []);

  const getAllIssueManifestProviderForPendingIR = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/oem/getAllIssueManifestProviderForPendingIR?orgId=${orgId}`
      );

      if (response.status === 200) {
        setTableData(response.data.paramObjectsMap.IssueManifestProviderVO);
      }
    } catch (error) {
      toast.error("Network Error!");
    }
  };

  const checkboxStyle = {
    width: "15px",
    height: "15px",
  };

  const handleHeaderCheckboxChange = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      const allIndexes = tableData.map((_, index) => index);
      setSelectedRows(allIndexes);
      setSelectedRowData(tableData);
    } else {
      setSelectedRows([]);
      setSelectedRowData([]);
    }
  };

  const handleCheckboxChange = (index, rowData) => {
    setSelectedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
    setSelectedRowData((prevData) =>
      prevData.includes(rowData)
        ? prevData.filter((data) => data !== rowData)
        : [...prevData, rowData]
    );
  };

  const handleCreateIssueRequest = async () => {
    if (selectedRowData.length === 0) {
      toast.error("Please select atleast one record!");
      return;
    }
    const mimIds = selectedRowData.map((data) => data.id);
    const baseUrl = "/api/emitter/CreateIssueRequestFromMIM";
    const createdBy = userName;
    const mimIdParams = mimIds.map((id) => `mimId=${id}`).join("&");
    const fullUrl = `${process.env.REACT_APP_API_URL}${baseUrl}?createdBy=${createdBy}&${mimIdParams}`;

    try {
      const response = await axios.put(fullUrl);

      if (response.status === 200) {
        console.log(
          "totalSavedCount",
          response.data.paramObjectsMap.totalSavedCount
        );
        toast.success(response.data.paramObjectsMap.message);
        setSelectedRows([]);
        setSelectedRowData([]);
        getAllIssueManifestProviderForPendingIR();
      } else {
        toast.error(response.data.paramObjectsMap.errorMessage);
      }
    } catch (error) {
      toast.error("Network Error!");
    }
  };

  return (
    <>
      <div style={{ maxWidth: 1060 }} className="ml-auto me-auto">
        <div className="card w-full p-6 bg-base-100 shadow-xl">
          <div>
            <ToastContainer />
          </div>
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              onClick={handleCreateIssueRequest}
            >
              Generate Report
            </button>
          </div>
          <>
            <div className="row mt-4">
              <div className="overflow-x-auto w-full ">
                <table className="table table-hover w-full">
                  <thead>
                    <tr>
                      <th className="text-center">
                        <input
                          type="checkbox"
                          checked={selectAll}
                          onChange={handleHeaderCheckboxChange}
                          style={checkboxStyle}
                        />
                        <span className="ps-2">Actions</span>
                      </th>
                      <th className="text-center">Transaction No</th>
                      <th className="text-center">Transaction Date</th>
                      <th className="text-center">Receiver</th>
                      <th className="text-center">Dispatch Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData && tableData.length > 0 ? (
                      tableData.map((row, index) => (
                        <tr key={row.id}>
                          <td className="text-center">
                            <input
                              type="checkbox"
                              checked={selectedRows.includes(index)}
                              onChange={() => handleCheckboxChange(index, row)}
                              style={checkboxStyle}
                            />
                          </td>
                          <td className="text-center">{row.transactionNo}</td>
                          <td className="text-center">{row.transactionDate}</td>
                          <td className="text-center">{row.receiver}</td>
                          <td className="text-center">{row.dispatchDate}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={9}>
                          <NoRecordsFound message={"MIM Report Not Found..!"} />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default MimReport;

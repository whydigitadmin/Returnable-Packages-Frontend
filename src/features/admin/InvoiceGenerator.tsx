import axios from "axios";
import React, { useState } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Invoice } from "../../data/types";
import InvoicePage from "../../invoiceComponent/InvoicePage.tsx";
import { showErrorToast, showSuccessToast } from "../../utils/toastUtils.js";

function InvoiceGenerator() {
  const [data, setData] = useState<Invoice | undefined>(() => {
    const savedInvoice = window.localStorage.getItem("invoice");

    try {
      return savedInvoice ? (JSON.parse(savedInvoice) as Invoice) : undefined;
    } catch (_e) {
      return undefined;
    }
  });

  const onInvoiceUpdated = (invoice: Invoice) => {
    window.localStorage.setItem("invoice", JSON.stringify(invoice));
    setData(invoice);
  };
  const userDetails = localStorage.getItem("userDetails");
  const [orgId, setOrgId] = useState(window.localStorage.getItem("orgId"));
  const [notSaved, setNotSaved] = useState(false);

  const postInvoice = () => {
    if (data) {
      const dataWithOrgId = { ...data, orgId };
      axios
        .put(
          `${process.env.REACT_APP_API_URL}/api/master/createUpdateInvoice`,
          dataWithOrgId
        )
        .then((response) => {
          console.log("Response:", response.data);
          if (response.data.statusFlag === "Error") {
            showErrorToast(response.data.paramObjectsMap.errorMessage);
          } else {
            showSuccessToast(response.data.paramObjectsMap.message);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      showErrorToast("No invoice data to post.");
    }
  };

  const handleNew = () => {
    localStorage.removeItem("invoice");
    window.location.reload();
  };
  return (
    <>
      {userDetails === "ROLE_DOCUMENT" && (
        <div className="d-flex justify-content-between mb-4">
          <div className="d-flex align-items-center ms-2">
            <Link to="/app/welcomedocumentuser">
              <FaArrowCircleLeft className="cursor-pointer w-8 h-8" />
            </Link>
            <p className="text-2xl">
              <strong className="ml-4">Purchase Order</strong>
            </p>
          </div>
        </div>
      )}
      <div className="app">
        <div>
          <ToastContainer />
        </div>
        <div
          className="d-flex justify-content-end"
          style={{ marginLeft: "auto", marginRight: "12%" }}
        >
          <button
            className="bg-blue me-3 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            onClick={postInvoice}
          >
            Save Invoice
          </button>

          <button
            className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            onClick={handleNew}
          >
            New
          </button>
        </div>
        <br></br> <br></br>
        <InvoicePage
          data={data}
          onChange={onInvoiceUpdated}
          setNotSaved={setNotSaved}
        />
      </div>
    </>
  );
}

export default InvoiceGenerator;

import axios from "axios";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { InvoiceNew } from "../../data/types.ts";
import InvoicePageNew from "../../invoiceComponent/InvoicePageNew.tsx";
import { showErrorToast, showSuccessToast } from "../../utils/toastUtils.js";
import { Link } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";

function InvoiceGeneratorOrginal() {
  const [data, setData] = useState<InvoiceNew | undefined>(() => {
    const savedInvoice = window.localStorage.getItem("invoiceData");

    try {
      return savedInvoice
        ? (JSON.parse(savedInvoice) as InvoiceNew)
        : undefined;
    } catch (_e) {
      return undefined;
    }
  });

  const onInvoiceUpdated = (InvoiceNew: InvoiceNew) => {
    window.localStorage.setItem("invoiceData", JSON.stringify(InvoiceNew));
    setData(InvoiceNew);
  };
  const userDetails = localStorage.getItem("userDetails");
  const [orgId, setOrgId] = useState(window.localStorage.getItem("orgId"));
  const [notSaved, setNotSaved] = useState(false);

  const postInvoice = () => {
    if (data) {
      const dataWithOrgId = { ...data, orgId };
      axios
        .put(
          `${process.env.REACT_APP_API_URL}/api/master/createUpdateTaxInvoice`,
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

  return (
    <>
      {userDetails === "ROLE_DOCUMENT" && (
        <div className="d-flex justify-content-between mb-4">
          <div className="d-flex align-items-center ms-2">
            <Link to="/app/welcomedocumentuser">
              <FaArrowCircleLeft className="cursor-pointer w-8 h-8" />
            </Link>
            <p className="text-2xl">
              <strong className="ml-4">Invoice</strong>
            </p>
          </div>
        </div>
      )}
      <div className="app">
        <div>
          <ToastContainer />
        </div>
        <button
          className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          onClick={postInvoice}
          style={{ marginLeft: "75%" }}
          // disabled={notSaved}
        >
          Save Invoice
        </button>
        <br></br> <br></br>
        <InvoicePageNew
          data={data}
          onChange={onInvoiceUpdated}
          setNotSaved={setNotSaved}
        />
      </div>
    </>
  );
}

export default InvoiceGeneratorOrginal;

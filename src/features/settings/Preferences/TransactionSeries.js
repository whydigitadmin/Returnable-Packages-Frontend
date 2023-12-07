import * as React from "react";

function TransactionSeries() {
  return (
    <>
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-6">
          <strong>Inbound</strong>
          <div className="row mt-10">
            <div className="col-md-3" style={{ fontSize: "14px" }}>
              GRN
            </div>
            <div className="col-md-3">
              <input
                style={{ height: "80%", width: "100%", fontSize: "0.800rem" }}
                type={"text"}
                // value={value}
                placeholder={"GRN"}
                // onChange={(e) => updateInputValue(e.target.value)}
                className="input mb-2 p-2 input-bordered"
              />
            </div>
            <div className="col-md-5">
              <input
                style={{ height: "80%", width: "100%", fontSize: "0.800rem" }}
                type={"text"}
                // value={value}
                placeholder={"1111"}
                // onChange={(e) => updateInputValue(e.target.value)}
                className="input mb-2 p-2 input-bordered"
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-3" style={{ fontSize: "14px" }}>
              Empty Stock
            </div>
            <div className="col-md-3">
              <input
                style={{ height: "80%", width: "100%", fontSize: "0.800rem" }}
                type={"text"}
                // value={value}
                placeholder={"ES"}
                // onChange={(e) => updateInputValue(e.target.value)}
                className="input mb-2 p-2 input-bordered"
              />
            </div>
            <div className="col-md-5">
              <input
                style={{ height: "80%", width: "100%", fontSize: "0.800rem" }}
                type={"text"}
                // value={value}
                placeholder={"1111"}
                // onChange={(e) => updateInputValue(e.target.value)}
                className="input mb-2 p-2 input-bordered"
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-3" style={{ fontSize: "14px" }}>
              Return
            </div>
            <div className="col-md-3">
              <input
                style={{ height: "80%", width: "100%", fontSize: "0.800rem" }}
                type={"text"}
                // value={value}
                placeholder={"RTN"}
                // onChange={(e) => updateInputValue(e.target.value)}
                className="input mb-2 p-2 input-bordered"
              />
            </div>
            <div className="col-md-5">
              <input
                style={{ height: "80%", width: "100%", fontSize: "0.800rem" }}
                type={"text"}
                // value={value}
                placeholder={"1111"}
                // onChange={(e) => updateInputValue(e.target.value)}
                className="input mb-2 p-2 input-bordered"
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-3" style={{ fontSize: "14px" }}>
              Relocation
            </div>
            <div className="col-md-3">
              <input
                style={{ height: "80%", width: "100%", fontSize: "0.800rem" }}
                type={"text"}
                // value={value}
                placeholder={"REL"}
                // onChange={(e) => updateInputValue(e.target.value)}
                className="input mb-2 p-2 input-bordered"
              />
            </div>
            <div className="col-md-5">
              <input
                style={{ height: "80%", width: "100%", fontSize: "0.800rem" }}
                type={"text"}
                // value={value}
                placeholder={"1111"}
                // onChange={(e) => updateInputValue(e.target.value)}
                className="input mb-2 p-2 input-bordered"
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-3" style={{ fontSize: "14px" }}>
              Cycle time
            </div>
            <div className="col-md-3">
              <input
                style={{ height: "80%", width: "100%", fontSize: "0.800rem" }}
                type={"text"}
                // value={value}
                placeholder={"prefix"}
                disabled
                // onChange={(e) => updateInputValue(e.target.value)}
                className="input mb-2 p-2 input-bordered"
              />
            </div>
            <div className="col-md-5">
              <input
                style={{ height: "80%", width: "100%", fontSize: "0.800rem" }}
                type={"text"}
                // value={value}
                placeholder={"suffix"}
                disabled
                // onChange={(e) => updateInputValue(e.target.value)}
                className="input mb-2 p-2 input-bordered"
              />
            </div>
          </div>
        </div>
        <div className="col-6">
          <strong>Outbound</strong>
          <div className="row mt-10">
            <div className="col-md-3" style={{ fontSize: "14px" }}>
              Allotment
            </div>
            <div className="col-md-3">
              <input
                style={{ height: "80%", width: "100%", fontSize: "0.800rem" }}
                type={"text"}
                // value={value}
                placeholder={"ALT"}
                // onChange={(e) => updateInputValue(e.target.value)}
                className="input mb-2 p-2 input-bordered"
              />
            </div>
            <div className="col-md-5">
              <input
                style={{ height: "80%", width: "100%", fontSize: "0.800rem" }}
                type={"text"}
                // value={value}
                placeholder={"1111"}
                // onChange={(e) => updateInputValue(e.target.value)}
                className="input mb-2 p-2 input-bordered"
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-3" style={{ fontSize: "14px" }}>
              Material Request
            </div>
            <div className="col-md-3">
              <input
                style={{ height: "80%", width: "100%", fontSize: "0.800rem" }}
                type={"text"}
                // value={value}
                placeholder={"MR"}
                // onChange={(e) => updateInputValue(e.target.value)}
                className="input mb-2 p-2 input-bordered"
              />
            </div>
            <div className="col-md-5">
              <input
                style={{ height: "80%", width: "100%", fontSize: "0.800rem" }}
                type={"text"}
                // value={value}
                placeholder={"1111"}
                // onChange={(e) => updateInputValue(e.target.value)}
                className="input mb-2 p-2 input-bordered"
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-3" style={{ fontSize: "14px" }}>
              DC-Outward
            </div>
            <div className="col-md-3">
              <input
                style={{ height: "80%", width: "100%", fontSize: "0.800rem" }}
                type={"text"}
                // value={value}
                placeholder={"0"}
                // onChange={(e) => updateInputValue(e.target.value)}
                className="input mb-2 p-2 input-bordered"
              />
            </div>
            <div className="col-md-5">
              <input
                style={{ height: "80%", width: "100%", fontSize: "0.800rem" }}
                type={"text"}
                // value={value}
                placeholder={"0"}
                // onChange={(e) => updateInputValue(e.target.value)}
                className="input mb-2 p-2 input-bordered"
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-3" style={{ fontSize: "14px" }}>
              DC-Expense
            </div>
            <div className="col-md-3">
              <input
                style={{ height: "80%", width: "100%", fontSize: "0.800rem" }}
                type={"text"}
                // value={value}
                placeholder={"0"}
                // onChange={(e) => updateInputValue(e.target.value)}
                className="input mb-2 p-2 input-bordered"
              />
            </div>
            <div className="col-md-5">
              <input
                style={{ height: "80%", width: "100%", fontSize: "0.800rem" }}
                type={"text"}
                // value={value}
                placeholder={"0"}
                // onChange={(e) => updateInputValue(e.target.value)}
                className="input mb-2 p-2 input-bordered"
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-3" style={{ fontSize: "14px" }}>
              DC-Lead
            </div>
            <div className="col-md-3">
              <input
                style={{ height: "80%", width: "100%", fontSize: "0.800rem" }}
                type={"text"}
                // value={value}
                placeholder={"0"}
                // onChange={(e) => updateInputValue(e.target.value)}
                className="input mb-2 p-2 input-bordered"
              />
            </div>
            <div className="col-md-5">
              <input
                style={{ height: "80%", width: "100%", fontSize: "0.800rem" }}
                type={"text"}
                // value={value}
                placeholder={"0"}
                // onChange={(e) => updateInputValue(e.target.value)}
                className="input mb-2 p-2 input-bordered"
              />
            </div>
          </div>
        </div>
        <div className="d-flex flex-row mt-4">
          <button
            type="button"
            className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Save
          </button>
          <button
            type="button"
            className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
export default TransactionSeries;

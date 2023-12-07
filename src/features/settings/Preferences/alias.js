import * as React from "react";
import ItemConfig from "./ItemConfig";
import ItemGroupConfig from "./ItemGroupConfig";
import FlowsConfig from "./FlowsConfig";
import WarehouseConfig from "./WarehouseConfig";
import ReturnConfig from "./ReturnConfig";
import RelocationConfig from "./RelocationConfig";
import AllotmentConfig from "./AllotmentConfig";
import DcOutwardConfig from "./DcOutwardConfig";
import DcExpenseConfig from "./DcExpenseConfig";
import DcLeadConfig from "./DcLeadConfig";

function Alias() {
  const [itemConfig, setItemConfig] = React.useState(false);
  const [itemGroupConfig, setItemGroupConfig] = React.useState(false);
  const [flowsConfig, setFlowsConfig] = React.useState(false);
  const [warehouseConfig, setWarehouseConfig] = React.useState(false);
  const [returnConfig, setReturnConfig] = React.useState(false);
  const [relocationConfig, setRelocationConfig] = React.useState(false);
  const [allotmentConfig, setAllotmentConfig] = React.useState(false);
  const [dcOutwardConfig, setDcOutwardConfig] = React.useState(false);
  const [dcExpenseConfig, setDcExpenseConfig] = React.useState(false);
  const [dcLeadConfig, setDcLeadConfig] = React.useState(false);

  const handleItemConfig = () => {
    setItemConfig(true);
  };
  const handleItemConfigBack = () => {
    setItemConfig(false);
  };
  const handleItemGroupConfig = () => {
    setItemGroupConfig(true);
  };
  const handleItemGroupConfigBack = () => {
    setItemGroupConfig(false);
  };
  const handleFlowsConfig = () => {
    setFlowsConfig(true);
  };
  const handleFlowsConfigBack = () => {
    setFlowsConfig(false);
  };
  const handleWarehouseConfig = () => {
    setWarehouseConfig(true);
  };
  const handleWarehouseConfigBack = () => {
    setWarehouseConfig(false);
  };
  const handleReturnConfig = () => {
    setReturnConfig(true);
  };
  const handleReturnConfigBack = () => {
    setReturnConfig(false);
  };
  const handleRelocationConfig = () => {
    setRelocationConfig(true);
  };
  const handleRelocationConfigBack = () => {
    setRelocationConfig(false);
  };
  const handleAllotmentConfig = () => {
    setAllotmentConfig(true);
  };
  const handleAllotmentConfigBack = () => {
    setAllotmentConfig(false);
  };
  const handleDcOutwardConfig = () => {
    setDcOutwardConfig(true);
  };
  const handleDcOutwardConfigBack = () => {
    setDcOutwardConfig(false);
  };
  const handleDcExpenseConfig = () => {
    setDcExpenseConfig(true);
  };
  const handleDcExpenseConfigBack = () => {
    setDcExpenseConfig(false);
  };
  const handleDcLeadConfig = () => {
    setDcLeadConfig(true);
  };
  const handleDcLeadConfigBack = () => {
    setDcLeadConfig(false);
  };

  return (
    <>
      <div>
        <div className="row mb-3">
          <div className="col-lg-2 d-flex flex-row">
            <input
              style={{ marginTop: 12 }}
              className="form-check-input me-1"
              defaultChecked
              type="checkbox"
              id="flexCheckDefault"
            />
            <label
              className="label label-text label-font-size text-base-content mb-1"
              for="flexCheckDefault"
            >
              Master
            </label>
          </div>
          <div className="col-lg-3">
            <input
              style={{ height: 40, fontSize: "0.800rem" }}
              type={"text"}
              // value={value}
              placeholder={"Type for master items alias.."}
              // onChange={(e) => updateInputValue(e.target.value)}
              className="input p-2 mb-1 input-bordered w-full"
            />
          </div>
        </div>
        <div className="row ms-5 mb-3">
          <div className="col-lg-2 d-flex flex-row">
            <input
              style={{ marginTop: 12 }}
              className="form-check-input me-1"
              defaultChecked
              type="checkbox"
              id="flexCheckDefault"
            />
            <label
              className="label label-text label-font-size text-base-content mb-1"
              for="flexCheckDefault"
            >
              Item
            </label>
          </div>
          <div className="col-lg-3">
            <input
              style={{ height: 40, fontSize: "0.800rem" }}
              type={"text"}
              // value={value}
              placeholder={"Type for master items alias.."}
              // onChange={(e) => updateInputValue(e.target.value)}
              className="input p-2 mb-1 input-bordered w-full"
            />
          </div>
          <div className="col-lg-3">
            <button
              type="button"
              onClick={handleItemConfig}
              className="bg-blue mt-1 inline-block rounded bg-primary h-fit px-6 pb-1 pt-2 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Item Config
            </button>
          </div>
        </div>
        <div className="row ms-5 mb-3">
          <div className="col-lg-2 d-flex flex-row">
            <input
              style={{ marginTop: 12 }}
              className="form-check-input me-1"
              defaultChecked
              type="checkbox"
              id="flexCheckDefault"
            />
            <label
              className="label label-text label-font-size text-base-content mb-1"
              for="flexCheckDefault"
            >
              Item Group
            </label>
          </div>
          <div className="col-lg-3">
            <input
              style={{ height: 40, fontSize: "0.800rem" }}
              type={"text"}
              // value={value}
              placeholder={"Type for master items alias.."}
              // onChange={(e) => updateInputValue(e.target.value)}
              className="input p-2 mb-1 input-bordered w-full"
            />
          </div>
          <div className="col-lg-4">
            <button
              type="button"
              onClick={handleItemGroupConfig}
              className="bg-blue mt-1 inline-block rounded bg-primary h-fit px-6 pb-1 pt-2 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Item Group Config
            </button>
          </div>
        </div>
        <div className="row ms-5 mb-3">
          <div className="col-lg-2 d-flex flex-row">
            <input
              style={{ marginTop: 12 }}
              className="form-check-input me-1"
              defaultChecked
              type="checkbox"
              id="flexCheckDefault"
            />
            <label
              className="label label-text label-font-size text-base-content mb-1"
              for="flexCheckDefault"
            >
              Flows
            </label>
          </div>
          <div className="col-lg-3">
            <input
              style={{ height: 40, fontSize: "0.800rem" }}
              type={"text"}
              // value={value}
              placeholder={"Type for master items alias.."}
              // onChange={(e) => updateInputValue(e.target.value)}
              className="input p-2 mb-1 input-bordered w-full"
            />
          </div>
          <div className="col-lg-3">
            <button
              type="button"
              onClick={handleFlowsConfig}
              className="bg-blue me-5 mt-1 inline-block rounded bg-primary h-fit px-6 pb-1 pt-2 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Flows Config
            </button>
          </div>
        </div>
        <div className="row ms-5 mb-3">
          <div className="col-lg-2 d-flex flex-row">
            <input
              style={{ marginTop: 12 }}
              className="form-check-input me-1"
              defaultChecked
              type="checkbox"
              id="flexCheckDefault"
            />
            <label
              className="label label-text label-font-size text-base-content mb-1"
              for="flexCheckDefault"
            >
              Warehouse
            </label>
          </div>
          <div className="col-lg-3">
            <input
              style={{ height: 40, fontSize: "0.800rem" }}
              type={"text"}
              // value={value}
              placeholder={"Type for master items alias.."}
              // onChange={(e) => updateInputValue(e.target.value)}
              className="input p-2 mb-1 input-bordered w-full"
            />
          </div>
          <div className="col-lg-4">
            <button
              type="button"
              onClick={handleWarehouseConfig}
              className="bg-blue mt-1 inline-block rounded bg-primary h-fit px-6 pb-1 pt-2 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Warehouse Config
            </button>
          </div>
        </div>
        <div className="row ms-5 mb-3">
          <div className="col-lg-2 d-flex flex-row">
            <input
              style={{ marginTop: 12 }}
              className="form-check-input me-1"
              defaultChecked
              type="checkbox"
              id="flexCheckDefault"
            />
            <label
              className="label label-text label-font-size text-base-content mb-1"
              for="flexCheckDefault"
            >
              Vendor
            </label>
          </div>
          <div className="col-lg-3">
            <input
              style={{ height: 40, fontSize: "0.800rem" }}
              type={"text"}
              // value={value}
              placeholder={"Type for master items alias.."}
              // onChange={(e) => updateInputValue(e.target.value)}
              className="input p-2 mb-1 input-bordered w-full"
            />
          </div>
        </div>
        <div className="row ms-5 mb-3">
          <div className="col-lg-2 d-flex flex-row">
            <input
              style={{ marginTop: 12 }}
              className="form-check-input me-1"
              defaultChecked
              type="checkbox"
              id="flexCheckDefault"
            />
            <label
              className="label label-text label-font-size text-base-content mb-1"
              for="flexCheckDefault"
            >
              Customer
            </label>
          </div>
          <div className="col-lg-3">
            <input
              style={{ height: 40, fontSize: "0.800rem" }}
              type={"text"}
              // value={value}
              placeholder={"Type for master items alias.."}
              // onChange={(e) => updateInputValue(e.target.value)}
              className="input p-2 mb-1 input-bordered w-full"
            />
          </div>
        </div>
        <div className="row ms-5 mb-3">
          <div className="col-lg-2 d-flex flex-row">
            <input
              style={{ marginTop: 12 }}
              className="form-check-input me-1"
              defaultChecked
              type="checkbox"
              id="flexCheckDefault"
            />
            <label
              className="label label-text label-font-size text-base-content mb-1"
              for="flexCheckDefault"
            >
              Employee
            </label>
          </div>
          <div className="col-lg-3">
            <input
              style={{ height: 40, fontSize: "0.800rem" }}
              type={"text"}
              // value={value}
              placeholder={"Type for master items alias.."}
              // onChange={(e) => updateInputValue(e.target.value)}
              className="input p-2 mb-1 input-bordered w-full"
            />
          </div>
        </div>
        <div className="row ms-5 mb-3">
          <div className="col-lg-2 d-flex flex-row">
            <input
              style={{ marginTop: 12 }}
              className="form-check-input me-1"
              defaultChecked
              type="checkbox"
              id="flexCheckDefault"
            />
            <label
              className="label label-text label-font-size text-base-content mb-1"
              for="flexCheckDefault"
            >
              Employee Groups
            </label>
          </div>
          <div className="col-lg-3">
            <input
              style={{ height: 40, fontSize: "0.800rem" }}
              type={"text"}
              // value={value}
              placeholder={"Type for master items alias.."}
              // onChange={(e) => updateInputValue(e.target.value)}
              className="input p-2 mb-1 input-bordered w-full"
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-lg-2 d-flex flex-row">
            <input
              style={{ marginTop: 12 }}
              className="form-check-input me-1"
              defaultChecked
              type="checkbox"
              id="flexCheckDefault"
            />
            <label
              className="label label-text label-font-size text-base-content mb-1"
              for="flexCheckDefault"
            >
              Inbound
            </label>
          </div>
          <div className="col-lg-3">
            <input
              style={{ height: 40, fontSize: "0.800rem" }}
              type={"text"}
              // value={value}
              placeholder={"Type for alias.."}
              // onChange={(e) => updateInputValue(e.target.value)}
              className="input p-2 mb-1 input-bordered w-full"
            />
          </div>
        </div>
        <div className="row ms-5 mb-3">
          <div className="col-lg-2 d-flex flex-row">
            <input
              style={{ marginTop: 12 }}
              className="form-check-input me-1"
              defaultChecked
              type="checkbox"
              id="flexCheckDefault"
            />
            <label
              className="label label-text label-font-size text-base-content mb-1"
              for="flexCheckDefault"
            >
              GRN
            </label>
          </div>
          <div className="col-lg-3">
            <input
              style={{ height: 40, fontSize: "0.800rem" }}
              type={"text"}
              // value={value}
              placeholder={"Type for alias.."}
              // onChange={(e) => updateInputValue(e.target.value)}
              className="input p-2 mb-1 input-bordered w-full"
            />
          </div>
        </div>
        <div className="row ms-5 mb-3">
          <div className="col-lg-2 d-flex flex-row">
            <input
              style={{ marginTop: 12 }}
              className="form-check-input me-1"
              defaultChecked
              type="checkbox"
              id="flexCheckDefault"
            />
            <label
              className="label label-text label-font-size text-base-content mb-1"
              for="flexCheckDefault"
            >
              Empty Stock
            </label>
          </div>
          <div className="col-lg-3">
            <input
              style={{ height: 40, fontSize: "0.800rem" }}
              type={"text"}
              // value={value}
              placeholder={"Type for alias.."}
              // onChange={(e) => updateInputValue(e.target.value)}
              className="input p-2 mb-1 input-bordered w-full"
            />
          </div>
        </div>
        <div className="row ms-5 mb-3">
          <div className="col-lg-2 d-flex flex-row">
            <input
              style={{ marginTop: 12 }}
              className="form-check-input me-1"
              defaultChecked
              type="checkbox"
              id="flexCheckDefault"
            />
            <label
              className="label label-text label-font-size text-base-content mb-1"
              for="flexCheckDefault"
            >
              Return
            </label>
          </div>
          <div className="col-lg-3">
            <input
              style={{ height: 40, fontSize: "0.800rem" }}
              type={"text"}
              // value={value}
              placeholder={"Type for alias.."}
              // onChange={(e) => updateInputValue(e.target.value)}
              className="input p-2 mb-1 input-bordered w-full"
            />
          </div>
          <div className="col-lg-3">
            <button
              type="button"
              onClick={handleReturnConfig}
              className="bg-blue me-5 mt-1 inline-block rounded bg-primary h-fit px-6 pb-1 pt-2 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Return Config
            </button>
          </div>
        </div>
        <div className="row ms-5 mb-3">
          <div className="col-lg-2 d-flex flex-row">
            <input
              style={{ marginTop: 12 }}
              className="form-check-input me-1"
              defaultChecked
              type="checkbox"
              id="flexCheckDefault"
            />
            <label
              className="label label-text label-font-size text-base-content mb-1"
              for="flexCheckDefault"
            >
              Relocation
            </label>
          </div>
          <div className="col-lg-3">
            <input
              style={{ height: 40, fontSize: "0.800rem" }}
              type={"text"}
              // value={value}
              placeholder={"Type for alias.."}
              // onChange={(e) => updateInputValue(e.target.value)}
              className="input p-2 mb-1 input-bordered w-full"
            />
          </div>
          <div className="col-lg-4">
            <button
              type="button"
              onClick={handleRelocationConfig}
              className="bg-blue mt-1 inline-block rounded bg-primary h-fit px-6 pb-1 pt-2 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Relocation Config
            </button>
          </div>
        </div>
        <div className="row ms-5 mb-3">
          <div className="col-lg-2 d-flex flex-row">
            <input
              style={{ marginTop: 12 }}
              className="form-check-input me-1"
              defaultChecked
              type="checkbox"
              id="flexCheckDefault"
            />
            <label
              className="label label-text label-font-size text-base-content mb-1"
              for="flexCheckDefault"
            >
              Cycle time
            </label>
          </div>
          <div className="col-lg-3">
            <input
              style={{ height: 40, fontSize: "0.800rem" }}
              type={"text"}
              // value={value}
              placeholder={"Type for alias.."}
              // onChange={(e) => updateInputValue(e.target.value)}
              className="input p-2 mb-1 input-bordered w-full"
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-lg-2 d-flex flex-row">
            <input
              style={{ marginTop: 12 }}
              className="form-check-input me-1"
              defaultChecked
              type="checkbox"
              id="flexCheckDefault"
            />
            <label
              className="label label-text label-font-size text-base-content mb-1"
              for="flexCheckDefault"
            >
              Outbound
            </label>
          </div>
          <div className="col-lg-3">
            <input
              style={{ height: 40, fontSize: "0.800rem" }}
              type={"text"}
              // value={value}
              placeholder={"Type for alias.."}
              // onChange={(e) => updateInputValue(e.target.value)}
              className="input p-2 mb-1 input-bordered w-full"
            />
          </div>
        </div>
        <div className="row ms-5 mb-3">
          <div className="col-lg-2 d-flex flex-row">
            <input
              style={{ marginTop: 12 }}
              className="form-check-input me-1"
              defaultChecked
              type="checkbox"
              id="flexCheckDefault"
            />
            <label
              className="label label-text label-font-size text-base-content mb-1"
              for="flexCheckDefault"
            >
              Allotment
            </label>
          </div>
          <div className="col-lg-3">
            <input
              style={{ height: 40, fontSize: "0.800rem" }}
              type={"text"}
              // value={value}
              placeholder={"Type for alias.."}
              // onChange={(e) => updateInputValue(e.target.value)}
              className="input p-2 mb-1 input-bordered w-full"
            />
          </div>
          <div className="col-lg-3">
            <button
              type="button"
              onClick={handleAllotmentConfig}
              className="bg-blue me-5 mt-1 inline-block rounded bg-primary h-fit px-6 pb-1 pt-2 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Allotment Config
            </button>
          </div>
        </div>
        <div className="row ms-5 mb-3">
          <div className="col-lg-2 d-flex flex-row">
            <input
              style={{ marginTop: 12 }}
              className="form-check-input me-1"
              defaultChecked
              type="checkbox"
              id="flexCheckDefault"
            />
            <label
              className="label label-text label-font-size text-base-content mb-1"
              for="flexCheckDefault"
            >
              Material Request
            </label>
          </div>
          <div className="col-lg-3">
            <input
              style={{ height: 40, fontSize: "0.800rem" }}
              type={"text"}
              // value={value}
              placeholder={"Type for alias.."}
              // onChange={(e) => updateInputValue(e.target.value)}
              className="input p-2 mb-1 input-bordered w-full"
            />
          </div>
        </div>
        <div className="row ms-5 mb-3">
          <div className="col-lg-2 d-flex flex-row">
            <input
              style={{ marginTop: 12 }}
              className="form-check-input me-1"
              defaultChecked
              type="checkbox"
              id="flexCheckDefault"
            />
            <label
              className="label label-text label-font-size text-base-content mb-1"
              for="flexCheckDefault"
            >
              DC-Outward
            </label>
          </div>
          <div className="col-lg-3">
            <input
              style={{ height: 40, fontSize: "0.800rem" }}
              type={"text"}
              // value={value}
              placeholder={"Type for alias.."}
              // onChange={(e) => updateInputValue(e.target.value)}
              className="input p-2 mb-1 input-bordered w-full"
            />
          </div>
          <div className="col-lg-4">
            <button
              type="button"
              onClick={handleDcOutwardConfig}
              className="bg-blue mt-1 inline-block rounded bg-primary h-fit px-6 pb-1 pt-2 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              DC-Outward Config
            </button>
          </div>
        </div>
        <div className="row ms-5 mb-3">
          <div className="col-lg-2 d-flex flex-row">
            <input
              style={{ marginTop: 12 }}
              className="form-check-input me-1"
              defaultChecked
              type="checkbox"
              id="flexCheckDefault"
            />
            <label
              className="label label-text label-font-size text-base-content mb-1"
              for="flexCheckDefault"
            >
              DC-Expense
            </label>
          </div>
          <div className="col-lg-3">
            <input
              style={{ height: 40, fontSize: "0.800rem" }}
              type={"text"}
              // value={value}
              placeholder={"Type for alias.."}
              // onChange={(e) => updateInputValue(e.target.value)}
              className="input p-2 mb-1 input-bordered w-full"
            />
          </div>
          <div className="col-lg-4">
            <button
              type="button"
              onClick={handleDcExpenseConfig}
              className="bg-blue mt-1 inline-block rounded bg-primary h-fit px-6 pb-1 pt-2 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              DC-Expense Config
            </button>
          </div>
        </div>
        <div className="row ms-5 mb-3">
          <div className="col-lg-2 d-flex flex-row">
            <input
              style={{ marginTop: 12 }}
              className="form-check-input me-1"
              defaultChecked
              type="checkbox"
              id="flexCheckDefault"
            />
            <label
              className="label label-text label-font-size text-base-content mb-1"
              for="flexCheckDefault"
            >
              DC-Lead
            </label>
          </div>
          <div className="col-lg-3">
            <input
              style={{ height: 40, fontSize: "0.800rem" }}
              type={"text"}
              // value={value}
              placeholder={"Type for alias.."}
              // onChange={(e) => updateInputValue(e.target.value)}
              className="input p-2 mb-1 input-bordered w-full"
            />
          </div>
          <div className="col-lg-3">
            <button
              type="button"
              onClick={handleDcLeadConfig}
              className="bg-blue me-5 mt-1 inline-block rounded bg-primary h-fit px-6 pb-1 pt-2 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              DC-Lead Config
            </button>
          </div>
        </div>
        <div className="d-flex flex-row pt-3">
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
      {itemConfig && <ItemConfig open={handleItemConfigBack} />}
      {itemGroupConfig && <ItemGroupConfig open={handleItemGroupConfigBack} />}
      {flowsConfig && <FlowsConfig open={handleFlowsConfigBack} />}
      {warehouseConfig && <WarehouseConfig open={handleWarehouseConfigBack} />}
      {returnConfig && <ReturnConfig open={handleReturnConfigBack} />}
      {relocationConfig && (
        <RelocationConfig open={handleRelocationConfigBack} />
      )}
      {allotmentConfig && <AllotmentConfig open={handleAllotmentConfigBack} />}
      {dcOutwardConfig && <DcOutwardConfig open={handleDcOutwardConfigBack} />}
      {dcExpenseConfig && <DcExpenseConfig open={handleDcExpenseConfigBack} />}
      {dcLeadConfig && <DcLeadConfig open={handleDcLeadConfigBack} />}
    </>
  );
}
export default Alias;

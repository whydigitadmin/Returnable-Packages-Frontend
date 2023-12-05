import * as React from "react";
import { FaStarOfLife } from "react-icons/fa";

function AccessRigths() {
  return (
    <>
      <div className="row">
        <div className="col-lg-2 col-md-2">
          <label className="label mb-4">
            <span
              className={
                "label-text label-font-size text-base-content d-flex flex-row"
              }
            >
              Employee Type
              <FaStarOfLife className="must" />
            </span>
          </label>
        </div>
        <div className="col-lg-3 col-md-6">
          <select
            name="Select Item"
            style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
            className="input mb-4 input-bordered ps-2"
          >
            <option value="">Admin</option>
            <option value="">Manager</option>
            <option value="">Supervisor</option>
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-2 col-md-2 col-sm-2">
          <div className="text-base font-semibold">Category</div>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <div className="text-base font-semibold">Module</div>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <div className="text-base font-semibold">Read</div>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <div className="text-base font-semibold">Write</div>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <div className="text-base font-semibold">Update</div>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <div className="text-base font-semibold">Delete</div>
        </div>
      </div>
      <div className="divider"></div>

      {/* Masters */}

      <div className="row mb-3">
        <div className="col-lg-2 col-md-2 col-sm-2">
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
              Masters
            </label>
          </div>
        </div>
        {/* Warehouse (Pincode) */}
        <div className="col-lg-2 col-md-2 col-sm-2">
          <label
            className="label label-text label-font-size text-base-content"
            for="flexCheckDefault"
          >
            Warehouse (Pincode)
          </label>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        {/* Item */}
        <div className="col-lg-2 col-md-2 col-sm-2">
          <div className="d-flex flex-row"></div>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <label
            className="label label-text label-font-size text-base-content"
            for="flexCheckDefault"
          >
            Item
          </label>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        {/* Item Group */}
        <div className="col-lg-2 col-md-2 col-sm-2">
          <div className="d-flex flex-row"></div>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <label
            className="label label-text label-font-size text-base-content"
            for="flexCheckDefault"
          >
            Item Group
          </label>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        {/* Flow */}
        <div className="col-lg-2 col-md-2 col-sm-2">
          <div className="d-flex flex-row"></div>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <label
            className="label label-text label-font-size text-base-content"
            for="flexCheckDefault"
          >
            Flow
          </label>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        {/* Customer */}
        <div className="col-lg-2 col-md-2 col-sm-2">
          <div className="d-flex flex-row"></div>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <label
            className="label label-text label-font-size text-base-content"
            for="flexCheckDefault"
          >
            Customer
          </label>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        {/* Vendor */}
        <div className="col-lg-2 col-md-2 col-sm-2">
          <div className="d-flex flex-row"></div>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <label
            className="label label-text label-font-size text-base-content"
            for="flexCheckDefault"
          >
            Vendor
          </label>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        {/* User */}
        <div className="col-lg-2 col-md-2 col-sm-2">
          <div className="d-flex flex-row"></div>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <label
            className="label label-text label-font-size text-base-content"
            for="flexCheckDefault"
          >
            User
          </label>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
      </div>

      {/* Inbound */}

      <div className="row mb-3">
        <div className="col-lg-2 col-md-2 col-sm-2">
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
              Inbound
            </label>
          </div>
        </div>
        {/* PO */}
        <div className="col-lg-2 col-md-2 col-sm-2">
          <label
            className="label label-text label-font-size text-base-content"
            for="flexCheckDefault"
          >
            PO
          </label>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        {/* ASN */}
        <div className="col-lg-2 col-md-2 col-sm-2">
          <div className="d-flex flex-row"></div>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <label
            className="label label-text label-font-size text-base-content"
            for="flexCheckDefault"
          >
            ASN
          </label>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        {/* GRN */}
        <div className="col-lg-2 col-md-2 col-sm-2">
          <div className="d-flex flex-row"></div>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <label
            className="label label-text label-font-size text-base-content"
            for="flexCheckDefault"
          >
            GRN
          </label>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        {/* Return */}
        <div className="col-lg-2 col-md-2 col-sm-2">
          <div className="d-flex flex-row"></div>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <label
            className="label label-text label-font-size text-base-content"
            for="flexCheckDefault"
          >
            Return
          </label>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
      </div>

      {/* Outbound */}

      <div className="row mb-3">
        <div className="col-lg-2 col-md-2 col-sm-2">
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
              Outbound
            </label>
          </div>
        </div>
        {/* Delivery Challan Customer */}
        <div className="col-lg-2 col-md-2 col-sm-2">
          <label
            className="label label-text label-font-size text-base-content"
            for="flexCheckDefault"
          >
            Delivery Challan Customer
          </label>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        {/* Material Request */}
        <div className="col-lg-2 col-md-2 col-sm-2">
          <div className="d-flex flex-row"></div>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <label
            className="label label-text label-font-size text-base-content"
            for="flexCheckDefault"
          >
            Material Request
          </label>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        {/* Allotment */}
        <div className="col-lg-2 col-md-2 col-sm-2">
          <div className="d-flex flex-row"></div>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <label
            className="label label-text label-font-size text-base-content"
            for="flexCheckDefault"
          >
            Allotment
          </label>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        {/* Outward */}
        <div className="col-lg-2 col-md-2 col-sm-2">
          <div className="d-flex flex-row"></div>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <label
            className="label label-text label-font-size text-base-content"
            for="flexCheckDefault"
          >
            Outward
          </label>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        {/* Empty Stock */}
        <div className="col-lg-2 col-md-2 col-sm-2">
          <div className="d-flex flex-row"></div>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <label
            className="label label-text label-font-size text-base-content"
            for="flexCheckDefault"
          >
            Empty Stock
          </label>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        {/* Relocation */}
        <div className="col-lg-2 col-md-2 col-sm-2">
          <div className="d-flex flex-row"></div>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <label
            className="label label-text label-font-size text-base-content"
            for="flexCheckDefault"
          >
            Relocation
          </label>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
      </div>

      {/* Lifecycle Management */}

      <div className="row mb-3">
        <div className="col-lg-2 col-md-2 col-sm-2">
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
              Lifecycle Management
            </label>
          </div>
        </div>
        {/* Audit Management */}
        <div className="col-lg-2 col-md-2 col-sm-2">
          <label
            className="label label-text label-font-size text-base-content"
            for="flexCheckDefault"
          >
            Audit Management
          </label>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
      </div>

      {/* Reports */}

      <div className="row mb-3">
        <div className="col-lg-2 col-md-2 col-sm-2">
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
              Reports
            </label>
          </div>
        </div>
        {/* Inventory */}
        <div className="col-lg-2 col-md-2 col-sm-2">
          <label
            className="label label-text label-font-size text-base-content"
            for="flexCheckDefault"
          >
            Inventory
          </label>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        {/* Inbound */}
        <div className="col-lg-2 col-md-2 col-sm-2"></div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <label
            className="label label-text label-font-size text-base-content"
            for="flexCheckDefault"
          >
            Inbound
          </label>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        {/* Outbound */}
        <div className="col-lg-2 col-md-2 col-sm-2"></div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <label
            className="label label-text label-font-size text-base-content"
            for="flexCheckDefault"
          >
            Outbound
          </label>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
      </div>

      {/* Preferences */}

      <div className="row mb-3">
        <div className="col-lg-2 col-md-2 col-sm-2">
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
              Preferences
            </label>
          </div>
        </div>
        {/* Aliases */}
        <div className="col-lg-2 col-md-2 col-sm-2">
          <label
            className="label label-text label-font-size text-base-content"
            for="flexCheckDefault"
          >
            Aliases
          </label>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        {/* Serialisation */}
        <div className="col-lg-2 col-md-2 col-sm-2"></div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <label
            className="label label-text label-font-size text-base-content"
            for="flexCheckDefault"
          >
            Serialisation
          </label>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        {/* Transaction Series */}
        <div className="col-lg-2 col-md-2 col-sm-2"></div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <label
            className="label label-text label-font-size text-base-content"
            for="flexCheckDefault"
          >
            Transaction Series
          </label>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <input
            style={{ marginTop: 10 }}
            className="form-check-input me-1"
            type="checkbox"
            id="flexCheckDefault"
          />
        </div>
      </div>
    </>
  );
}
export default AccessRigths;

import React from "react";
import { IoMdNotificationsOutline } from "react-icons/io";

function Notification() {
  return (
    <>
      <div className="card w-full bg-base-100 shadow-xl mb-2">
        <div className="d-flex flex-row mt-3 mb-3">
          <IoMdNotificationsOutline className="w-8 h-8 ms-2" />
          <h2 className="text-xl font-semibold ms-1">NOTIFICATIONS</h2>
        </div>
        <div className="notification-border m-2">
          <div className="d-flex flex-row">
            <div className="notification-btn">ALL</div>
            <a href="/" className="notification-dis-btn notification-hide">
              MESSAGE
            </a>
            <a href="/" className="notification-dis-btn notification-hide">
              ALERTS
            </a>
          </div>
        </div>
        <div className="notification-card m-2">
          <div className="m-2">
            <h2 className="text-lg font-semibold mb-2">SUCCESS</h2>
            <h5 className="stat-title mb-1">
              Your transfer has been successfully submitted.
            </h5>
            <h5 className="stat-title mb-3">Docket Number: 2023008839471</h5>
            <h5 className="stat-title mb-4">Transaction Status: CLEAN</h5>
            <h5 className="stat-title">Order Created No. 30326677819</h5>
          </div>
        </div>
        <div className="notification-card m-2">
          <div className="m-2">
            <h2 className="text-lg font-semibold mb-2">SUCCESS</h2>
            <h5 className="stat-title mb-1">
              Your transfer has been successfully submitted.
            </h5>
            <h5 className="stat-title mb-3">Docket Number: 2023008839471</h5>
            <h5 className="stat-title mb-4">Transaction Status: CLEAN</h5>
            <h5 className="stat-title">Order Created No. 30326677819</h5>
          </div>
        </div>
      </div>
    </>
  );
}

export default Notification;

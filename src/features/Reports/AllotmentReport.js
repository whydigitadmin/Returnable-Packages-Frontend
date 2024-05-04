import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import CircleStackIcon from "@heroicons/react/24/outline/CircleStackIcon";
import CreditCardIcon from "@heroicons/react/24/outline/CreditCardIcon";
import { useDispatch } from "react-redux";
import { showNotification } from "../common/headerSlice";
import ArrowDownTrayIcon from '@heroicons/react/24/outline/ArrowDownTrayIcon'
import ShareIcon from '@heroicons/react/24/outline/ShareIcon'
import EnvelopeIcon from '@heroicons/react/24/outline/EnvelopeIcon'
import EllipsisVerticalIcon from '@heroicons/react/24/outline/EllipsisVerticalIcon'
import ArrowPathIcon from '@heroicons/react/24/outline/ArrowPathIcon'
import { useState } from "react"
import Datepicker from "react-tailwindcss-datepicker";
import { IoMdClose } from "react-icons/io";
import { FaStarOfLife } from "react-icons/fa";



const statsData = [
  {
    title: "New Users",
    value: "34700",
    icon: <UserGroupIcon className="w-8 h-8" />,
    description: "↗︎ 2300 (22%)",
  },
  {
    title: "Total Sales",
    value: "34,545",
    icon: <CreditCardIcon className="w-8 h-8" />,
    description: "Current month",
  },
  {
    title: "Pending Leads",
    value: "450",
    icon: <CircleStackIcon className="w-8 h-8" />,
    description: "50 in hot leads",
  },
  {
    title: "Active Users",
    value: "5600",
    icon: <UsersIcon className="w-8 h-8" />,
    description: "↙ 300 (18%)",
  },
];

const periodOptions = [
  { name: "Today", value: "TODAY" },
  { name: "Yesterday", value: "YESTERDAY" },
  { name: "This Week", value: "THIS_WEEK" },
  { name: "Last Week", value: "LAST_WEEK" },
  { name: "This Month", value: "THIS_MONTH" },
  { name: "Last Month", value: "LAST_MONTH" },
]

function AllotmentReport() {
  const dispatch = useDispatch();
  const [dateValue, setDateValue] = useState({
    startDate: new Date(),
    endDate: new Date()
  });

  const handleDatePickerValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setDateValue(newValue);
    updateDashboardPeriod(newValue)
  }
  const handleClearData = () => {
    setDateValue({
      startDate: null,
      endDate: null
    });
    // updateDashboardPeriod({
    //   startDate: new Date(),
    //   endDate: new Date()
    // });
  }

  const updateDashboardPeriod = (newRange) => {
    dispatch(
      showNotification({
        message: `Period updated to ${newRange.startDate} to ${newRange.endDate}`,
        status: 1,
      })
    );
  };

  return (
    <>
      {/* * ---------------------- Select Period Content ------------------------- */}
      {/* <DashboardTopBar updateDashboardPeriod={updateDashboardPeriod} /> */}

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"> */}
      <div className="card w-full p-6 bg-base-100 shadow-xl">
        <div className="d-flex justify-content-end">
          <button className="btn btn-ghost btn-sm normal-case" onClick={handleClearData}><ArrowPathIcon className="w-4 mr-2" />Refresh</button>
          <IoMdClose
            // onClick={handleUserCreationClose}
            className="cursor-pointer w-8 h-8 mb-3"
          />
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Select Date
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>

          <div className="col-lg-3 col-md-6 mb-2">
            {/* <div className=""> */}
            <Datepicker
              containerClassName="w-72 "
              value={dateValue}
              theme={"light"}
              inputClassName="input input-bordered w-72"
              popoverDirection={"down"}
              toggleClassName="invisible"
              onChange={handleDatePickerValueChange}
              showShortcuts={true}
              primaryColor={"white"}
            />
          </div>
        </div>
        {/* <div className="text-right ">
          <button className="btn btn-ghost btn-sm normal-case" onClick={handleClearData}><ArrowPathIcon className="w-4 mr-2" />Refresh</button>
        </div> */}
      </div>


    </>
  );
}

export default AllotmentReport;

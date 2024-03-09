import CircleStackIcon from "@heroicons/react/24/outline/CircleStackIcon";
import CreditCardIcon from "@heroicons/react/24/outline/CreditCardIcon";
import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import React from "react";
import AmountStats from "../dashboard/components/AmountStats";
import DashboardStats from "../dashboard/components/DashboardStats";
import DoughnutChart from "../dashboard/components/DoughnutChart";
import LineChart from "../dashboard/components/LineChart";
import PageStats from "../dashboard/components/PageStats";
import UserChannels from "../dashboard/components/UserChannels";
import UserChannels1 from "../dashboard/components/UserChannels1";
import Notification from "./Notification";
import Calendar from "../calendar";
import WelcomeEmitter from "./WelcomeEmitter";
import EmitterTab from "./EmitterTab";

const statsData = [
  {
    title: "New Users",
    value: "34000",
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
    value: "56000",
    icon: <UsersIcon className="w-8 h-8" />,
    description: "↙ 300 (18%)",
  },
];

export const EmitterLanding = () => {
  return (
    <div style={{ padding: "0% 8% 0% 8%" }}>
      {/* <div>EmitterLanding</div> */}

      {/* <Calendar /> */}

      <div className="">
        <WelcomeEmitter />
      </div>
      {/* <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6 mb-4">
        {statsData.map((d, k) => {
          return <DashboardStats key={k} {...d} colorIndex={k} />;
        })}
      </div> */}

      {/* <div className="grid lg:grid-cols-2 mt-10 grid-cols-1 gap-6">
        <AmountStats />
        <PageStats />
      </div> */}
      {/* <EmitterTab /> */}
      {/* <div className="grid lg:grid-cols-1 mt-10 grid-cols-1 gap-6">
        <Notification /> 
        <Calendar />
      </div> */}
      {/* <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
        <UserChannels />
        <UserChannels1 />
      </div> */}

      {/* <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
        <LineChart />
        <DoughnutChart />
      </div> */}
    </div>
  );
};

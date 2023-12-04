/** Icons are imported separatly to reduce build time */
import BellIcon from "@heroicons/react/24/outline/BellIcon";
import DocumentTextIcon from "@heroicons/react/24/outline/DocumentTextIcon";
import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";
import TableCellsIcon from "@heroicons/react/24/outline/TableCellsIcon";
import WalletIcon from "@heroicons/react/24/outline/WalletIcon";
import CodeBracketSquareIcon from "@heroicons/react/24/outline/CodeBracketSquareIcon";
import DocumentIcon from "@heroicons/react/24/outline/DocumentIcon";
import ExclamationTriangleIcon from "@heroicons/react/24/outline/ExclamationTriangleIcon";
import CalendarDaysIcon from "@heroicons/react/24/outline/CalendarDaysIcon";
import ArrowRightOnRectangleIcon from "@heroicons/react/24/outline/ArrowRightOnRectangleIcon";
import UserIcon from "@heroicons/react/24/outline/UserIcon";
import Cog6ToothIcon from "@heroicons/react/24/outline/Cog6ToothIcon";
import BoltIcon from "@heroicons/react/24/outline/BoltIcon";
import ChartBarIcon from "@heroicons/react/24/outline/ChartBarIcon";
import CurrencyDollarIcon from "@heroicons/react/24/outline/CurrencyDollarIcon";
import InboxArrowDownIcon from "@heroicons/react/24/outline/InboxArrowDownIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import KeyIcon from "@heroicons/react/24/outline/KeyIcon";
import DocumentDuplicateIcon from "@heroicons/react/24/outline/DocumentDuplicateIcon";

const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;

const routes = [
  {
    path: "/app/dashboard",
    icon: <Squares2X2Icon className={iconClasses} />,
    name: "Dashboard",
  },
  {
    path: "", //no url needed as this has submenu
    icon: <DocumentDuplicateIcon className={`${iconClasses} inline`} />, // icon component
    name: "Masters", // name that appear in Sidebar
    submenu: [
      {
        path: "/app/warehouse",
        icon: <ArrowRightOnRectangleIcon className={submenuIconClasses} />,
        name: "Warehouse",
      },
      {
        path: "/app/items",
        icon: <ArrowRightOnRectangleIcon className={submenuIconClasses} />,
        name: "Items",
      },
      {
        path: "/app/itemgroups",
        icon: <ArrowRightOnRectangleIcon className={submenuIconClasses} />,
        name: "Item Groups",
      },
      {
        path: "/app/customer",
        icon: <ArrowRightOnRectangleIcon className={submenuIconClasses} />,
        name: "Customer",
      },
      {
        path: "/app/flows",
        icon: <ArrowRightOnRectangleIcon className={submenuIconClasses} />,
        name: "Flows",
      },
      {
        path: "/app/vendors",
        icon: <ArrowRightOnRectangleIcon className={submenuIconClasses} />,
        name: "Vendors",
      },
      {
        path: "/app/users",
        icon: <ArrowRightOnRectangleIcon className={submenuIconClasses} />,
        name: "Users",
      },
    ],
  },
  {
    path: "", //no url needed as this has submenu
    icon: <DocumentDuplicateIcon className={`${iconClasses} inline`} />, // icon component
    name: "Inbound", // name that appear in Sidebar
    submenu: [
      {
        path: "/app/purchaseorder",
        icon: <ArrowRightOnRectangleIcon className={submenuIconClasses} />,
        name: "Purchase Order",
      },
      {
        path: "/app/asn",
        icon: <ArrowRightOnRectangleIcon className={submenuIconClasses} />,
        name: "ASN",
      },
      {
        path: "/app/grn",
        icon: <ArrowRightOnRectangleIcon className={submenuIconClasses} />,
        name: "GRN",
      },
      {
        path: "/app/return",
        icon: <ArrowRightOnRectangleIcon className={submenuIconClasses} />,
        name: "Return",
      },
    ],
  },
  {
    path: "", //no url needed as this has submenu
    icon: <DocumentDuplicateIcon className={`${iconClasses} inline`} />, // icon component
    name: "Outbound", // name that appear in Sidebar
    submenu: [
      {
        path: "/app/deliverychallanvendors",
        icon: <ArrowRightOnRectangleIcon className={submenuIconClasses} />,
        name: "Delivery Challan Vendors",
      },
      {
        path: "/app/materialrequest",
        icon: <ArrowRightOnRectangleIcon className={submenuIconClasses} />,
        name: "Material Request",
      },
      {
        path: "/app/allotment",
        icon: <ArrowRightOnRectangleIcon className={submenuIconClasses} />,
        name: "Allotment",
      },
      {
        path: "/app/outward",
        icon: <ArrowRightOnRectangleIcon className={submenuIconClasses} />,
        name: "Outward",
      },
      {
        path: "/app/emptystock",
        icon: <ArrowRightOnRectangleIcon className={submenuIconClasses} />,
        name: "Empty Stock",
      },
      {
        path: "/app/relocation",
        icon: <ArrowRightOnRectangleIcon className={submenuIconClasses} />,
        name: "Relocation",
      },
    ],
  },
  {
    path: "", //no url needed as this has submenu
    icon: <DocumentDuplicateIcon className={`${iconClasses} inline`} />, // icon component
    name: "Sales", // name that appear in Sidebar
    submenu: [
      {
        path: "/app/salesleads",
        icon: <ArrowRightOnRectangleIcon className={submenuIconClasses} />,
        name: "Leads",
      },
      {
        path: "/app/scs",
        icon: <ArrowRightOnRectangleIcon className={submenuIconClasses} />,
        name: "SCS",
      },
      {
        path: "/app/technicalproposals",
        icon: <ArrowRightOnRectangleIcon className={submenuIconClasses} />,
        name: "Technical Proposal",
      },
      {
        path: "/app/commercialproposal",
        icon: <ArrowRightOnRectangleIcon className={submenuIconClasses} />,
        name: "Commercial Proposal",
      },
    ],
  },
  {
    path: "/app/tickets", //no url needed as this has submenu
    icon: <DocumentDuplicateIcon className={`${iconClasses} inline`} />, // icon component
    name: "Tickets",
  },
  {
    path: "/app/expenses", //no url needed as this has submenu
    icon: <DocumentDuplicateIcon className={`${iconClasses} inline`} />, // icon component
    name: "Expenses",
  },
  {
    path: "", //no url needed as this has submenu
    icon: <DocumentDuplicateIcon className={`${iconClasses} inline`} />, // icon component
    name: "Lifecycle Management", // name that appear in Sidebar
    submenu: [
      {
        path: "/app/audit",
        icon: <ArrowRightOnRectangleIcon className={submenuIconClasses} />,
        name: "Audit",
      },
    ],
  },
  {
    path: "", //no url needed as this has submenu
    icon: <DocumentDuplicateIcon className={`${iconClasses} inline`} />, // icon component
    name: "Reports", // name that appear in Sidebar
    submenu: [
      {
        path: "/app/reports",
        icon: <ArrowRightOnRectangleIcon className={submenuIconClasses} />,
        name: "Reports",
      },
      {
        path: "/app/inventory",
        icon: <ArrowRightOnRectangleIcon className={submenuIconClasses} />,
        name: "Inventory",
      },
      {
        path: "/app/inventoryadjustments",
        icon: <ArrowRightOnRectangleIcon className={submenuIconClasses} />,
        name: "Inventory Adjustments",
      },
    ],
  },
  // {
  //   path: '/app/leads', // url
  //   icon: <InboxArrowDownIcon className={iconClasses}/>, // icon component
  //   name: 'Leads', // name that appear in Sidebar
  // },
  // {
  //   path: '/app/transactions', // url
  //   icon: <CurrencyDollarIcon className={iconClasses}/>, // icon component
  //   name: 'Transactions', // name that appear in Sidebar
  // },
  // {
  //   path: '/app/charts', // url
  //   icon: <ChartBarIcon className={iconClasses}/>, // icon component
  //   name: 'Analytics', // name that appear in Sidebar
  // },
  // {
  //   path: '/app/integration', // url
  //   icon: <BoltIcon className={iconClasses}/>, // icon component
  //   name: 'Integration', // name that appear in Sidebar
  // },
  // {
  //   path: '/app/calendar', // url
  //   icon: <CalendarDaysIcon className={iconClasses}/>, // icon component
  //   name: 'Calendar', // name that appear in Sidebar
  // },

  // {
  //   path: '', //no url needed as this has submenu
  //   icon: <DocumentDuplicateIcon className={`${iconClasses} inline` }/>, // icon component
  //   name: 'Pages', // name that appear in Sidebar
  //   submenu : [
  //     {
  //       path: '/login',
  //       icon: <ArrowRightOnRectangleIcon className={submenuIconClasses}/>,
  //       name: 'Login',
  //     },
  //     {
  //       path: '/register', //url
  //       icon: <UserIcon className={submenuIconClasses}/>, // icon component
  //       name: 'Register', // name that appear in Sidebar
  //     },
  //     {
  //       path: '/forgot-password',
  //       icon: <KeyIcon className={submenuIconClasses}/>,
  //       name: 'Forgot Password',
  //     },
  //     {
  //       path: '/app/blank',
  //       icon: <DocumentIcon className={submenuIconClasses}/>,
  //       name: 'Blank Page',
  //     },
  //     {
  //       path: '/app/404',
  //       icon: <ExclamationTriangleIcon className={submenuIconClasses}/>,
  //       name: '404',
  //     },
  //   ]
  // },
  // {
  //   path: '', //no url needed as this has submenu
  //   icon: <Cog6ToothIcon className={`${iconClasses} inline` }/>, // icon component
  //   name: 'Settings', // name that appear in Sidebar
  //   submenu : [
  //     {
  //       path: '/app/settings-profile', //url
  //       icon: <UserIcon className={submenuIconClasses}/>, // icon component
  //       name: 'Profile', // name that appear in Sidebar
  //     },
  //     {
  //       path: '/app/settings-billing',
  //       icon: <WalletIcon className={submenuIconClasses}/>,
  //       name: 'Billing',
  //     },
  //     {
  //       path: '/app/settings-team', // url
  //       icon: <UsersIcon className={submenuIconClasses}/>, // icon component
  //       name: 'Team Members', // name that appear in Sidebar
  //     },
  //   ]
  // },
  // {
  //   path: '', //no url needed as this has submenu
  //   icon: <DocumentTextIcon className={`${iconClasses} inline` }/>, // icon component
  //   name: 'Documentation', // name that appear in Sidebar
  //   submenu : [
  //     {
  //       path: '/app/getting-started', // url
  //       icon: <DocumentTextIcon className={submenuIconClasses}/>, // icon component
  //       name: 'Getting Started', // name that appear in Sidebar
  //     },
  //     {
  //       path: '/app/features',
  //       icon: <TableCellsIcon className={submenuIconClasses}/>,
  //       name: 'Features',
  //     },
  //     {
  //       path: '/app/components',
  //       icon: <CodeBracketSquareIcon className={submenuIconClasses}/>,
  //       name: 'Components',
  //     }
  //   ]
  // },
];

export default routes;

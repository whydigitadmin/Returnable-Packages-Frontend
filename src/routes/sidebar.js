/** Icons are imported separatly to reduce build time */
import ArrowRightOnRectangleIcon from "@heroicons/react/24/outline/ArrowRightOnRectangleIcon";
import DocumentDuplicateIcon from "@heroicons/react/24/outline/DocumentDuplicateIcon";
import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";

const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;

const routes = [
  {
    path: "/app/dashboard",
    icon: (
      <img
        src="/dashboard.png"
        alt="Dashboard"
        style={{ width: "25px", height: "auto", marginRight: "5px" }}
        className={iconClasses}
      />
    ),
    name: <span>Dashboard</span>,
  },
  {
    path: "", //no URL needed as this has submenu
    icon: (
      <img
        src="/admin.png"
        alt="Admin"
        style={{ width: "34px", height: "auto" }}
        className={`${iconClasses} inline`}
      />
    ),
    name: <span className="ml-2">Admin</span>,

    submenu: [
      {
        path: "/app/UserDetails",
        icon: (
          <img
            src="/usercreation.png"
            alt="Usercreation"
            style={{ width: "30px", height: "auto" }}
            className={{ submenuIconClasses }}
          />
        ),
        name: <span>Users</span>,
      },
      {
        path: "/app/EmitterDetails",
        icon: (
          <img
            src="/emittercreation.png"
            alt="Emittercreation"
            style={{ width: "30px", height: "auto" }}
            className={{ submenuIconClasses }}
          />
        ),
        name: <span>Emitters</span>,
      },

      // {
      //   path: "/app/Roles",
      //   icon: <ArrowRightOnRectangleIcon className={submenuIconClasses} />,
      //   name: "Roles",
      // },
      // {
      //   path: "/app/Responsibilities",
      //   icon: <ArrowRightOnRectangleIcon className={submenuIconClasses} />,
      //   name: "Responsibilities",
      // },
      // {
      //   path: "/app/AccessRights",
      //   icon: <ArrowRightOnRectangleIcon className={submenuIconClasses} />,
      //   name: "Access Rights",
      // },
      // {
      //   path: "/app/Branch",
      //   icon: <ArrowRightOnRectangleIcon className={submenuIconClasses} />,
      //   name: "Branch",
      // },
    ],
  },

  {
    path: "", //no url needed as this has submenu
    icon: (
      <img
        src="/master.png"
        alt="Master"
        style={{ width: "32px", height: "auto" }}
        className={`${iconClasses} inline`}
      />
    ),
    name: <span className="ml-2">Master</span>,
    submenu: [
      {
        path: "/app/itemGroup",
        icon: (
          <img
            src="/asset.png"
            alt="AssetGroup"
            style={{ width: "32px", height: "auto" }}
            className={{ submenuIconClasses }}
          />
        ),
        name: <span>Asset Group</span>,
      },
      // {
      //   path: "/app/manufacturerDetails",
      //   icon: <ArrowRightOnRectangleIcon className={submenuIconClasses} />,
      //   name: "Manufacture",
      // },
      {
        path: "/app/items",
        icon: (
          <img
            src="/createAsset.png"
            alt="CreateAssets"
            style={{ width: "33px", height: "auto" }}
            className={{ submenuIconClasses }}
          />
        ),
        name: <span>Create Assets</span>,
      },
      {
        path: "/app/createkit",
        icon: (
          <img
            src="/createkit.png"
            alt="CreateKit"
            style={{ width: "31px", height: "auto" }}
            className={{ submenuIconClasses }}
          />
        ),
        name: <span>Create Kit</span>,
      },
      {
        path: "/app/warehouse",
        icon: (
          <img
            src="/warehouse.png"
            alt="Warehouse"
            style={{ width: "28px", height: "auto" }}
            className={{ submenuIconClasses }}
          />
        ),
        name: <span className="ml-1">Warehouse</span>,
      },
      {
        path: "/app/customer",
        icon: (
          <img
            src="/customer.png"
            alt="Customer"
            style={{ width: "32px", height: "auto" }}
            className={{ submenuIconClasses }}
          />
        ),
        name: <span className="">Customer</span>,
      },
      {
        path: "/app/vendors",
        icon: (
          <img
            src="/vendor.png"
            alt="Vendors"
            style={{ width: "33px", height: "auto" }}
            className={{ submenuIconClasses }}
          />
        ),
        name: <span className="">Vendors</span>,
      },
      {
        path: "/app/unit",
        icon: (
          <img
            src="/unit.png"
            alt="Unit"
            style={{ width: "34px", height: "auto" }}
            className={{ submenuIconClasses }}
          />
        ),
        name: <span className="">Unit</span>,
      },
      // {
      //   path: "/app/warehouseLocation",
      //   icon: <ArrowRightOnRectangleIcon className={submenuIconClasses} />,
      //   name: "Warehouse Location",
      // },
    ],
  },

  {
    path: "", //no url needed as this has submenu
    icon: (
      <img
        src="/operational.png"
        alt="Operational"
        style={{ width: "34px", height: "auto" }}
        className={`${iconClasses} inline`}
      />
    ),
    name: <span style={{ marginLeft: "7px" }}>Engineering</span>,
    submenu: [
      {
        path: "/app/partstudy", //no url needed as this has submenu
        icon: (
          <img
            src="/part.png"
            alt="PartStudy"
            style={{ width: "30px", height: "auto" }}
            className={{ submenuIconClasses }}
          />
        ),
        name: <span className="">Part Study</span>,
      },
      {
        path: "/app/flows",
        icon: (
          <img
            src="/flow.png"
            alt="Flows"
            style={{ width: "26px", height: "auto" }}
            className={{ submenuIconClasses }}
          />
        ),
        name: <span className="ml-1">Flows</span>,
      },
    ],
  },

  {
    path: "", //no url needed as this has submenu
    icon: (
      <img
        src="/issueManifest.png"
        alt="IssueManifest"
        style={{ width: "33px", height: "auto" }}
        className={`${iconClasses} inline`}
      />
    ),
    name: <span className="ml-2">Issue Manifest</span>,
    submenu: [
      {
        path: "/app/issuemanifest", //no url needed as this has submenu
        icon: (
          <img
            src="/issuemanifest1.png"
            alt="Issuemanifest"
            style={{ width: "30px", height: "auto" }}
            className={{ submenuIconClasses }}
          />
        ),
        name: <span className="ml-1">Issuemanifest</span>,
      },
      // {
      //   path: "/app/issuemanifest-report", //no url needed as this has submenu
      //   icon: (
      //     <img
      //       src="/issuemanifestReport.png"
      //       alt="IssuemanifestReport"
      //       style={{ width: "30px", height: "auto" }}
      //       className={{ submenuIconClasses }}
      //     />
      //   ),
      //   name: <span className="ml-1">Issuemanifest Report</span>,
      // },
    ],
  },

  {
    path: "", //no url needed as this has submenu
    icon: (
      <img
        src="/inwardAdmin.png"
        alt="Inward"
        style={{ width: "29px", height: "auto" }}
        className={`${iconClasses} inline`}
      />
    ),
    name: <span style={{ marginLeft: "12px" }}>Inward</span>,
    submenu: [
      {
        path: "/app/inwardmanifest", //no url needed as this has submenu
        icon: (
          <img
            src="/inward1.png"
            alt="Inwardmanifest"
            style={{ width: "36px", height: "auto" }}
            className={{ submenuIconClasses }}
          />
        ),
        name: <span className="">Inwardmanifest</span>,
      },
      // {
      //   path: "/app/inwardmanifest-report", //no url needed as this has submenu
      //   icon: (
      //     <img
      //       src="/inwardManifestReport.png"
      //       alt="InwardmanifestReport"
      //       style={{ width: "30px", height: "auto" }}
      //       className={{ submenuIconClasses }}
      //     />
      //   ),
      //   name: <span className="ml-1">Inwardmanifest Report</span>,
      // },
    ],
  },

  {
    path: "", //no url needed as this has submenu
    icon: (
      <img
        src="/outwardAdmin.png"
        alt="Outward"
        style={{ width: "30px", height: "auto" }}
        className={`${iconClasses} inline`}
      />
    ),
    name: <span style={{ marginLeft: "12px" }}>Outward</span>,
    submenu: [
      {
        path: "/app/EmptyRetrievalManifest", //no url needed as this has submenu
        icon: (
          <img
            src="/emptyRetrieval.png"
            alt="EmptyRetrievalManifest"
            style={{ width: "30px", height: "auto" }}
            className={{ submenuIconClasses }}
          />
        ),
        name: <span className="ml-1">EmptyRetrievalManifest</span>,
      },
    ],
  },

  {
    path: "/app/KitDistributionReport", //no url needed as this has submenu
    icon: (
      <img
        src="/report.png"
        alt="KitDistributionReport"
        style={{ width: "29px", height: "auto" }}
        className={`${iconClasses} inline`}
      />
    ),
    name: <span style={{ marginLeft: "6px" }}>Kit Distribution Report</span>,
  },
  // {
  //   path: "", //no url needed as this has submenu
  //   icon: <DocumentDuplicateIcon className={`${iconClasses} inline`} />, // icon component
  //   name: "Outbound", // name that appear in Sidebar
  //   submenu: [
  //     {
  //       path: "/app/deliverychallanvendors",
  //       icon: <ArrowRightOnRectangleIcon className={submenuIconClasses} />,
  //       name: "Delivery Challan Vendors",
  //     },
  //     {
  //       path: "/app/materialrequest",
  //       icon: <ArrowRightOnRectangleIcon className={submenuIconClasses} />,
  //       name: "Material Request",
  //     },
  //     {
  //       path: "/app/allotment",
  //       icon: <ArrowRightOnRectangleIcon className={submenuIconClasses} />,
  //       name: "Allotment",
  //     },
  //     {
  //       path: "/app/outward",
  //       icon: <ArrowRightOnRectangleIcon className={submenuIconClasses} />,
  //       name: "Outward",
  //     },
  //     {
  //       path: "/app/emptystock",
  //       icon: <ArrowRightOnRectangleIcon className={submenuIconClasses} />,
  //       name: "Empty Stock",
  //     },
  //     {
  //       path: "/app/relocation",
  //       icon: <ArrowRightOnRectangleIcon className={submenuIconClasses} />,
  //       name: "Relocation",
  //     },
  //   ],
  // },
  // {
  //   path: "", //no url needed as this has submenu
  //   icon: <DocumentDuplicateIcon className={`${iconClasses} inline`} />, // icon component
  //   name: "Sales", // name that appear in Sidebar
  //   submenu: [
  //     {
  //       path: "/app/salesleads",
  //       icon: <ArrowRightOnRectangleIcon className={submenuIconClasses} />,
  //       name: "Leads",
  //     },
  //     {
  //       path: "/app/scs",
  //       icon: <ArrowRightOnRectangleIcon className={submenuIconClasses} />,
  //       name: "SCS",
  //     },
  //     {
  //       path: "/app/technicalproposals",
  //       icon: <ArrowRightOnRectangleIcon className={submenuIconClasses} />,
  //       name: "Technical Proposal",
  //     },
  //     {
  //       path: "/app/commercialproposal",
  //       icon: <ArrowRightOnRectangleIcon className={submenuIconClasses} />,
  //       name: "Commercial Proposal",
  //     },
  //   ],
  // },
  // {
  //   path: "/app/tickets", //no url needed as this has submenu
  //   icon: <DocumentDuplicateIcon className={`${iconClasses} inline`} />, // icon component
  //   name: "Tickets",
  // },

  {
    path: "", //no url needed as this has submenu
    icon: (
      <img
        src="/accounting.png"
        alt="Accounting"
        style={{ width: "29px", height: "auto" }}
        className={`${iconClasses} inline`}
      />
    ),
    name: <span style={{ marginLeft: "14px" }}>Accounting</span>,
    submenu: [
      {
        path: "/app/expenses", //no url needed as this has submenu
        icon: (
          <img
            src="/expenses.png"
            alt="Expenses"
            style={{ width: "33px", height: "auto" }}
            className={{ submenuIconClasses }}
          />
        ),
        name: <span className="">Expenses</span>,
      },
    ],
  },

  {
    path: "", //no url needed as this has submenu
    icon: (
      <img
        src="/lifecycle.png"
        alt="LifecycleManagement"
        style={{ width: "32px", height: "auto" }}
        className={`${iconClasses} inline`}
      />
    ),
    name: <span style={{ marginLeft: "8px" }}>Lifecycle Management</span>,
    submenu: [
      {
        path: "/app/audit",
        icon: (
          <img
            src="/audit.png"
            alt="Audit"
            style={{ width: "30px", height: "auto" }}
            className={{ submenuIconClasses }}
          />
        ),
        name: <span className="">Audit</span>,
      },
    ],
  },
  // {
  //   path: "", //no url needed as this has submenu
  //   icon: <DocumentDuplicateIcon className={`${iconClasses} inline`} />, // icon component
  //   name: "Reports", // name that appear in Sidebar
  //   submenu: [
  //     {
  //       path: "/app/reports",
  //       icon: <ArrowRightOnRectangleIcon className={submenuIconClasses} />,
  //       name: "Reports",
  //     },
  //     {
  //       path: "/app/inventory",
  //       icon: <ArrowRightOnRectangleIcon className={submenuIconClasses} />,
  //       name: "Inventory",
  //     },
  //     {
  //       path: "/app/inventoryadjustments",
  //       icon: <ArrowRightOnRectangleIcon className={submenuIconClasses} />,
  //       name: "Inventory Adjustments",
  //     },
  //   ],
  // },
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

// All components mapping with path for internal routes

import { lazy } from "react";
import "./style.css";
const Dashboard = lazy(() => import("../pages/protected/Dashboard"));
const Welcome = lazy(() => import("../pages/protected/Welcome"));
const Page404 = lazy(() => import("../pages/protected/404"));
const Blank = lazy(() => import("../pages/protected/Blank"));
const Charts = lazy(() => import("../pages/protected/Charts"));
const Leads = lazy(() => import("../pages/protected/Leads"));
const Warehouse = lazy(() => import("../pages/protected/warehouse"));
const Items = lazy(() => import("../pages/protected/Items"));
const ItemGroups = lazy(() => import("../pages/protected/ItemsGroup"));
const Customer = lazy(() => import("../pages/protected/Customer"));
const Flows = lazy(() => import("../pages/protected/Flows"));
const Vendors = lazy(() => import("../pages/protected/Vendors"));
const Users = lazy(() => import("../pages/protected/Users"));
const PurchaseOrder = lazy(() => import("../pages/protected/PurchaseOrder"));
const Asn = lazy(() => import("../pages/protected/Asn"));
const GRN = lazy(() => import("../pages/protected/GRN"));
const Return = lazy(() => import("../pages/protected/Return"));
const DeliveryChalleonVendors = lazy(() =>
  import("../pages/protected/DeliveryChalleonVendors")
);
const MaterialRequest = lazy(() =>
  import("../pages/protected/MaterialRequest")
);
const Allotment = lazy(() => import("../pages/protected/Allotment"));
const Outward = lazy(() => import("../pages/protected/Outward"));
const EmptyStock = lazy(() => import("../pages/protected/EmptyStock"));
const Relocation = lazy(() => import("../pages/protected/Relocation"));
const Scs = lazy(() => import("../pages/protected/Scs"));
const TechnicalProposals = lazy(() => import("../pages/protected/TP"));
const CommercialProposal = lazy(() => import("../pages/protected/CP"));
const Tickets = lazy(() => import("../pages/protected/Tickets"));
const Expenses = lazy(() => import("../pages/protected/Expenses"));
const Reports = lazy(() => import("../pages/protected/Reports"));
const Integration = lazy(() => import("../pages/protected/Integration"));
const Audit = lazy(() => import("../pages/protected/Audit"));
const Inventory = lazy(() => import("../pages/protected/Inventory"));
const InventoryAdjustments = lazy(() =>
  import("../pages/protected/InventoryAdjustment")
);
const Calendar = lazy(() => import("../pages/protected/Calendar"));
const Team = lazy(() => import("../pages/protected/Team"));
const Transactions = lazy(() => import("../pages/protected/Transactions"));
const Bills = lazy(() => import("../pages/protected/Bills"));
const Perfrences = lazy(() => import("../pages/protected/Perfrences"));
const ProfileSettings = lazy(() =>
  import("../pages/protected/ProfileSettings")
);
const GettingStarted = lazy(() => import("../pages/GettingStarted"));
const DocFeatures = lazy(() => import("../pages/DocFeatures"));
const DocComponents = lazy(() => import("../pages/DocComponents"));

const routes = [
  {
    path: "/dashboard", // the url
    component: Dashboard, // view rendered
  },
  {
    path: "/welcome", // the url
    component: Welcome, // view rendered
  },
  {
    path: "/warehouse",
    component: Warehouse,
  },
  {
    path: "/items",
    component: Items,
  },
  {
    path: "/itemgroups",
    component: ItemGroups,
  },
  {
    path: "/customer",
    component: Customer,
  },
  {
    path: "/flows",
    component: Flows,
  },
  {
    path: "/vendors",
    component: Vendors,
  },
  {
    path: "/users",
    component: Users,
  },
  {
    path: "/purchaseorder",
    component: PurchaseOrder,
  },
  {
    path: "/asn",
    component: Asn,
  },
  {
    path: "/grn",
    component: GRN,
  },
  {
    path: "/return",
    component: Return,
  },
  {
    path: "/deliverychallanvendors",
    component: DeliveryChalleonVendors,
  },
  {
    path: "/materialrequest",
    component: MaterialRequest,
  },
  {
    path: "/allotment",
    component: Allotment,
  },
  {
    path: "/outward",
    component: Outward,
  },
  {
    path: "/emptystock",
    component: EmptyStock,
  },
  {
    path: "/relocation",
    component: Relocation,
  },
  {
    path: "/salesleads",
    component: Leads,
  },
  {
    path: "/scs",
    component: Scs,
  },
  {
    path: "/technicalproposals",
    component: TechnicalProposals,
  },
  {
    path: "/commercialproposal",
    component: CommercialProposal,
  },
  {
    path: "/tickets",
    component: Tickets,
  },
  {
    path: "/expenses",
    component: Expenses,
  },
  {
    path: "/reports",
    component: Reports,
  },
  {
    path: "/audit",
    component: Audit,
  },
  {
    path: "/inventory",
    component: Inventory,
  },
  {
    path: "/inventoryadjustments",
    component: InventoryAdjustments,
  },
  {
    path: "/settings-team",
    component: Team,
  },
  {
    path: "/calendar",
    component: Calendar,
  },
  {
    path: "/transactions",
    component: Transactions,
  },
  {
    path: "/settings-profile",
    component: ProfileSettings,
  },
  {
    path: "/settings-billing",
    component: Bills,
  },
  {
    path: "/preferences",
    component: Perfrences,
  },
  {
    path: "/getting-started",
    component: GettingStarted,
  },
  {
    path: "/features",
    component: DocFeatures,
  },
  {
    path: "/components",
    component: DocComponents,
  },
  {
    path: "/integration",
    component: Integration,
  },
  {
    path: "/charts",
    component: Charts,
  },
  {
    path: "/404",
    component: Page404,
  },
  {
    path: "/blank",
    component: Blank,
  },
];

export default routes;

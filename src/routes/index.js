// All components mapping with path for internal routes

import { lazy } from "react";
import "./style.css";
const Dashboard = lazy(() => import("../pages/protected/Dashboard"));
const Welcome = lazy(() => import("../pages/protected/Welcome"));
const WelcomeEmitter = lazy(() => import("../pages/protected/WelcomeEmitter"));
const WelcomeOEM = lazy(() => import("../pages/protected/WelcomeOem"));
const WelcomeDocumentUser = lazy(
  () => import("../pages/protected/WelcomeDocumentUser")
);
const IssueReq = lazy(() => import("../pages/protected/IssueReq"));
const EmitterInward = lazy(() => import("../pages/protected/EmitterInward"));
const EmitterInwardNew = lazy(
  () => import("../pages/protected/EmitterInwardNew")
);
const EmitterOutward = lazy(() => import("../pages/protected/EmitterOutward"));
const BinOutward = lazy(() => import("../pages/protected/BinOutward"));
const KitDistributionReport = lazy(
  () => import("../pages/protected/KitDistributionReport")
);
const StockAdjustment = lazy(
  () => import("../pages/protected/StockAdjustment")
);
const IssueManifest = lazy(() => import("../pages/protected/IssueManifest"));
const PaymentAdvice = lazy(() => import("../pages/protected/paymentAdvice"));
const IssueManifestReport = lazy(
  () => import("../pages/protected/IssueManifestReport")
);
const MaterialIssueManifest = lazy(
  () => import("../pages/protected/MaterialIssueManifest")
);
const RetrievalIssueManifest = lazy(
  () => import("../pages/protected/RetrievalIssueManifest")
);
const RetrievalManifestProvider = lazy(
  () => import("../pages/protected/RetrievalManifestProvider")
);
const PurchaseOrderProvider = lazy(
  () => import("../pages/protected/PurchaseOrderProvider")
);
const InvoiceProvider = lazy(
  () => import("../pages/protected/InvoiceProvider")
);
const IssueManifestProvider = lazy(
  () => import("../pages/protected/IssueManifestProvider")
);
// const InwardManifest = lazy(() => import("../pages/protected/InwardManifest"));
const InwardManifestDetails = lazy(
  () => import("../pages/protected/InwardManifestDetails")
);
const Page404 = lazy(() => import("../pages/protected/404"));
const Blank = lazy(() => import("../pages/protected/Blank"));
const Charts = lazy(() => import("../pages/protected/Charts"));
const Leads = lazy(() => import("../pages/protected/Leads"));
const Warehouse = lazy(() => import("../pages/protected/warehouse"));
const Partstudy = lazy(() => import("../pages/protected/PartStudy"));
const PackageDesign = lazy(() => import("../pages/protected/PackageDesign"));
const Logistics = lazy(() => import("../pages/protected/Logistics"));
const Stock = lazy(() => import("../pages/protected/Stock"));
const Asset = lazy(() => import("../pages/protected/Asset"));
const AssetCategory = lazy(() => import("../pages/protected/AssetCategory"));
const CreateKit = lazy(() => import("../pages/protected/CreateKit"));
const Customer = lazy(() => import("../pages/protected/Customer"));
const ManufacturerDetails = lazy(
  () => import("../pages/protected/ManufacturerDetails")
);
const Flows = lazy(() => import("../pages/protected/Flows"));
const Vendors = lazy(() => import("../pages/protected/Vendors"));
const ChargeTypeRequest = lazy(
  () => import("../pages/protected/ChargeTypeRequest")
);
const Group = lazy(() => import("../pages/protected/Group"));
const Users = lazy(() => import("../pages/protected/Users"));
const PurchaseOrder = lazy(() => import("../pages/protected/PurchaseOrder"));
const Asn = lazy(() => import("../pages/protected/Asn"));
const GRN = lazy(() => import("../pages/protected/GRN"));
const Return = lazy(() => import("../pages/protected/Return"));
const Unit = lazy(() => import("../pages/protected/Unit"));
const WarehouseLocation = lazy(
  () => import("../pages/protected/WarehouseLocation")
);
const DeliveryChalleonVendors = lazy(
  () => import("../pages/protected/DeliveryChalleonVendors")
);
const MaterialRequest = lazy(
  () => import("../pages/protected/MaterialRequest")
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
const InventoryAdjustments = lazy(
  () => import("../pages/protected/InventoryAdjustment")
);
const Calendar = lazy(() => import("../pages/protected/Calendar"));
const Team = lazy(() => import("../pages/protected/Team"));
const Transactions = lazy(() => import("../pages/protected/Transactions"));
const Bills = lazy(() => import("../pages/protected/Bills"));
const Preferences = lazy(() => import("../pages/protected/Preferences"));
const ProfileSettings = lazy(
  () => import("../pages/protected/ProfileSettings")
);
const ChangePassword = lazy(() => import("../pages/protected/ChangePassword"));
const GettingStarted = lazy(() => import("../pages/GettingStarted"));
const DocFeatures = lazy(() => import("../pages/DocFeatures"));
const DocComponents = lazy(() => import("../pages/DocComponents"));

const UserDetails = lazy(() => import("../pages/protected/UserDetails"));
const EmitterCreation = lazy(
  () => import("../pages/protected/EmitterCreation")
);
const EmitterDetails = lazy(() => import("../pages/protected/EmitterDetails"));
const DocumentCreation = lazy(
  () => import("../pages/protected/DocumentCreation")
);
const DocumentDetails = lazy(
  () => import("../pages/protected/DocumentDetails")
);
const AllocatorCreation = lazy(
  () => import("../pages/protected/AllocatorCreation")
);
const AllocatorDetails = lazy(
  () => import("../pages/protected/AllocatorDetails")
);
const OemUser = lazy(() => import("../pages/protected/OemUser"));
const Roles = lazy(() => import("../pages/protected/Roles"));
const Responsibilities = lazy(
  () => import("../pages/protected/Responsibilites")
);
const Branch = lazy(() => import("../pages/protected/Branch"));
const AccessRights = lazy(() => import("../pages/protected/AccessRights"));
const EmptyCount = lazy(() => import("../pages/protected/EmptyCount"));
const EmptyRetrievalManifest = lazy(
  () => import("../pages/protected/EmptyRetrievalManifest")
);
const DocumentType = lazy(() => import("../pages/protected/DocumentType"));
const Services = lazy(() => import("../pages/protected/Services"));
const ChargeCode = lazy(() => import("../pages/protected/ChargeCode"));
// const AsstTagging = lazy(() => import("../pages/protected/AsstTagging"));
const AssetTaggingDetails = lazy(
  () => import("../pages/protected/AssetTaggingDetails")
);
const StockBranch = lazy(() => import("../pages/protected/StockBranch"));
const CityMaster = lazy(() => import("../pages/protected/CityMaster"));
const State = lazy(() => import("../pages/protected/State"));
const Country = lazy(() => import("../pages/protected/Country"));
const KitCard = lazy(() => import("../pages/protected/KitCard"));
const FlowCard = lazy(() => import("../pages/protected/FlowCard"));
const Terms = lazy(() => import("../pages/protected/Terms"));
const PoOrder = lazy(() => import("../pages/protected/PoOrder"));
// const POD = lazy(() => import("../pages/protected/POD"));
const PodDetails = lazy(() => import("../pages/protected/PodDetails"));
const ProofofDispatchDetails = lazy(
  () => import("../pages/protected/ProofofDispatchDetails")
);
const Pdf = lazy(() => import("../pages/protected/Pdf"));
const BinInwardOem = lazy(() => import("../pages/protected/BinInwardOem"));
const BinOutwardOem = lazy(() => import("../pages/protected/BinOutwardOem"));
const BinAllotmentDetails = lazy(
  () => import("../pages/protected/BinAllotmentDetails")
);
const CompanyDetails = lazy(() => import("../pages/protected/CompanyDetails"));
const AllotmentReport = lazy(
  () => import("../pages/protected/AllotmentReport")
);
const AssetTaggingReport = lazy(
  () => import("../pages/protected/AssetTaggingReport")
);
const AssetStockReport = lazy(
  () => import("../pages/protected/AssetStockReport")
);
const EmitterAllotmentReport = lazy(
  () => import("../pages/protected/EmitterAllotmentReport")
);
const EmitterStockLedgerReport = lazy(
  () => import("../pages/protected/EmitterStockLedgerReport")
);
const GatheringEmpty = lazy(() => import("../pages/protected/GatheringEmpty"));
const RetrivalManifest = lazy(
  () => import("../pages/protected/RetrivalManifest")
);
const TransporterPickup = lazy(
  () => import("../pages/protected/TransporterPickup")
);
const EmitterDispatch = lazy(
  () => import("../pages/protected/EmitterDispatch")
);
const RetrievalManifestReport = lazy(
  () => import("../pages/protected/RetrievalManifestReport")
);
const AdminBinRetrieval = lazy(
  () => import("../pages/protected/AdminBinRetrieval")
);
const InvoiceGenerator = lazy(
  () => import("../pages/protected/InvoiceGenerator")
);
const InvoiceGeneratorOriginal = lazy(
  () => import("../pages/protected/InvoiceGeneratorOrginal")
);
const mimReport = lazy(
  () => import("../pages/protected/MimReport")
);
const BinAllotmentReport = lazy(
  () => import("../pages/protected/BinAllotmentReport")
);
const rimReport = lazy(
  () => import("../pages/protected/RimReport")
);
const routes = [
  {
    path: "/dashboard", // the url
    component: Dashboard, // view rendered
  },
  {
    path: "/Country",
    component: Country,
  },
  {
    path: "/State",
    component: State,
  },
  {
    path: "/CityMaster",
    component: CityMaster,
  },
  {
    path: "/EmitterInwardNew",
    component: EmitterInwardNew,
  },
  {
    path: "/KitCard",
    component: KitCard,
  },
  {
    path: "/Terms",
    component: Terms,
  },
  {
    path: "/PoOrder",
    component: PoOrder,
  },
  // {
  //   path: "/POD",
  //   component: POD,
  // },
  {
    path: "/poddetails",
    component: PodDetails,
  },
  {
    path: "/proofofdispatchdetails",
    component: ProofofDispatchDetails,
  },
  {
    path: "/Pdf",
    component: Pdf,
  },
  {
    path: "/welcome", // the url
    component: Welcome, // view rendered
  },
  {
    path: "/DocumentType",
    component: DocumentType,
  },
  {
    path: "/Services",
    component: Services,
  },
  {
    path: "/welcomeemitter",
    component: WelcomeEmitter,
  },
  {
    path: "/welcomeoem",
    component: WelcomeOEM,
  },
  {
    path: "/welcomedocumentuser",
    component: WelcomeDocumentUser,
  },
  {
    path: "/IssueReq",
    component: IssueReq,
  },
  {
    path: "/issuemanifest",
    component: IssueManifest,
  },
  {
    path: "/issuemanifest-report",
    component: IssueManifestReport,
  },
  {
    path: "/materialissuemanifest",
    component: MaterialIssueManifest,
  },
  {
    path: "/issuemanifestprovider",
    component: IssueManifestProvider,
  },
  {
    path: "/retrievalissuemanifest",
    component: RetrievalIssueManifest,
  },
  {
    path: "/retrievalmanifestprovider",
    component: RetrievalManifestProvider,
  },
  {
    path: "/invoice",
    component: InvoiceProvider,
  },
  {
    path: "/purchaseOrder",
    component: PurchaseOrderProvider,
  },
  {
    path: "/inwardmanifestdetails",
    component: InwardManifestDetails,
  },
  // {
  //   path: "/inwardmanifest",
  //   component: InwardManifest,
  // },
  {
    path: "/warehouse",
    component: Warehouse,
  },
  {
    path: "/assetcategory",
    component: AssetCategory,
  },
  {
    path: "/createasset",
    component: Asset,
  },
  {
    path: "/createkit",
    component: CreateKit,
  },
  {
    path: "/customer",
    component: Customer,
  },
  {
    path: "/manufacturerDetails",
    component: ManufacturerDetails,
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
    path: "/chargetyperequest",
    component: ChargeTypeRequest,
  },
  {
    path: "/group",
    component: Group,
  },
  {
    path: "/users",
    component: Users,
  },
  {
    path: "/partstudy",
    component: Partstudy,
  },
  {
    path: "/packagedesign",
    component: PackageDesign,
  },
  {
    path: "/logistics",
    component: Logistics,
  },
  {
    path: "/stock",
    component: Stock,
  },
  {
    path: "/inbound",
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
    component: Preferences,
  },
  {
    path: "/changepwd",
    component: ChangePassword,
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
  {
    path: "/unit",
    component: Unit,
  },
  {
    path: "/warehouseLocation",
    component: WarehouseLocation,
  },
  {
    path: "/userDetails",
    component: UserDetails,
  },
  {
    path: "/emitterCreation",
    component: EmitterCreation,
  },
  {
    path: "/emitterDetails",
    component: EmitterDetails,
  },
  {
    path: "/documentCreation",
    component: DocumentCreation,
  },
  {
    path: "/documentDetails",
    component: DocumentDetails,
  },
  {
    path: "/allocatorCreation",
    component: AllocatorCreation,
  },
  {
    path: "/allocatorDetails",
    component: AllocatorDetails,
  },
  {
    path: "/oemUser",
    component: OemUser,
  },
  {
    path: "/roles",
    component: Roles,
  },
  {
    path: "/responsibilities",
    component: Responsibilities,
  },
  {
    path: "/branch",
    component: Branch,
  },

  {
    path: "/AccessRights",
    component: AccessRights,
  },
  {
    path: "/EmitterInward",
    component: EmitterInward,
  },
  {
    path: "/EmitterOutward",
    component: EmitterOutward,
  },
  {
    path: "/BinOutward",
    component: BinOutward,
  },
  {
    path: "/StockAdjustment",
    component: StockAdjustment,
  },
  {
    path: "/EmptyCount",
    component: EmptyCount,
  },
  {
    path: "/KitDistributionReport",
    component: KitDistributionReport,
  },
  {
    path: "/EmptyRetrievalManifest",
    component: EmptyRetrievalManifest,
  },
  {
    path: "/ChargeCode",
    component: ChargeCode,
  },
  // {
  //   path: "/AsstTagging",
  //   component: AsstTagging,
  // },
  {
    path: "/assetTaggingDetails",
    component: AssetTaggingDetails,
  },

  {
    path: "/StockBranch",
    component: StockBranch,
  },
  {
    path: "/BinInwardOem",
    component: BinInwardOem,
  },
  {
    path: "/BinOutwardOem",
    component: BinOutwardOem,
  },
  {
    path: "/binallotmentdetails",
    component: BinAllotmentDetails,
  },
  {
    path: "/companydetails",
    component: CompanyDetails,
  },
  {
    path: "/allotmentreport",
    component: AllotmentReport,
  },
  {
    path: "/assettaggingreport",
    component: AssetTaggingReport,
  },
  {
    path: "/assetstockreport",
    component: AssetStockReport,
  },
  {
    path: "/emitterallotmentreport",
    component: EmitterAllotmentReport,
  },
  {
    path: "/emitterstockledgerreport",
    component: EmitterStockLedgerReport,
  },
  {
    path: "/gatheringempty",
    component: GatheringEmpty,
  },
  {
    path: "/retrivalmanifest",
    component: RetrivalManifest,
  },
  {
    path: "/transporterPickup",
    component: TransporterPickup,
  },
  {
    path: "/emitterdispatch",
    component: EmitterDispatch,
  },
  {
    path: "/retrievalmanifestreport",
    component: RetrievalManifestReport,
  },
  {
    path: "/adminbinretrieval",
    component: AdminBinRetrieval,
  },
  {
    path: "/FlowCard",
    component: FlowCard,
  },
  {
    path: "/invoiceGenerator",
    component: InvoiceGenerator,
  },
  {
    path: "/invoiceGeneratorOriginal",
    component: InvoiceGeneratorOriginal,
  },
  {
    path: "/paymentAdvice",
    component: PaymentAdvice,
  },
  {
    path: "/mimReport",
    component: mimReport,
  },
  {
    path: "/binAllotmentReport",
    component: BinAllotmentReport,
  },
  {
    path: "/rimReport",
    component: rimReport,
  },
];

export default routes;

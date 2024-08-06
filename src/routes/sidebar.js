/** Icons are imported separatly to reduce build time */

const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;

const allRoutes = [
  {
    path: "/app/welcome",
    icon: (
      <img
        src="https://cdn-icons-png.flaticon.com/128/8899/8899687.png"
        alt="Dashboard"
        style={{ width: "27px", height: "auto", marginRight: "0px" }}
        className={iconClasses}
      />
    ),
    name: <span>Dashboard</span>,
  },
  // {
  //   path: "", //no URL needed as this has submenu
  //   icon: (
  //     <img
  //       src="https://cdn-icons-png.flaticon.com/128/12153/12153844.png"
  //       alt="Admin"
  //       style={{ width: "34px", height: "auto" }}
  //       className={`${iconClasses} inline`}
  //     />
  //   ),
  //   name: <span className="ml-2">Product Owner</span>,

  //   submenu: [
  //     {
  //       path: "/app/companydetails",
  //       icon: (
  //         <img
  //           src="	https://cdn-icons-png.flaticon.com/128/4413/4413528.png"
  //           alt="Usercreation"
  //           style={{ width: "32px", height: "auto" }}
  //           className={{ submenuIconClasses }}
  //         />
  //       ),
  //       name: <span>Company Details</span>,
  //     },
  //   ],
  // },
  {
    path: "", //no URL needed as this has submenu
    icon: (
      <img
        src="https://cdn-icons-png.flaticon.com/128/3685/3685367.png"
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
            src="	https://cdn-icons-png.flaticon.com/128/863/863823.png"
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
            src="	https://cdn-icons-png.flaticon.com/128/9708/9708965.png"
            alt="Emittercreation"
            style={{ width: "30px", height: "auto" }}
            className={{ submenuIconClasses }}
          />
        ),
        name: <span>Emitters</span>,
      },
      {
        path: "/app/OemUser",
        icon: (
          <img
            src="https://cdn-icons-png.flaticon.com/128/1585/1585199.png"
            alt="OemUser"
            style={{ width: "31px", height: "auto" }}
            className={{ submenuIconClasses }}
          />
        ),
        name: <span>OEM Receiver / User</span>,
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
    ],
  },

  {
    path: "", //no url needed as this has submenu
    icon: (
      <img
        src="https://cdn-icons-png.flaticon.com/128/5610/5610258.png"
        alt="Master"
        style={{ width: "32px", height: "auto" }}
        className={`${iconClasses} inline`}
      />
    ),
    name: <span className="ml-2">General</span>,
    submenu: [
      // {
      //   path: "/app/itemGroup",
      //   icon: (
      //     <img
      //       src="/asset.png"
      //       alt="AssetGroup"
      //       style={{ width: "32px", height: "auto" }}
      //       className={{ submenuIconClasses }}
      //     />
      //   ),
      //   name: <span>Asset Group</span>,
      // },
      // {
      //   path: "/app/items",
      //   icon: (
      //     <img
      //       src="/createAsset.png"
      //       alt="CreateAssets"
      //       style={{ width: "33px", height: "auto" }}
      //       className={{ submenuIconClasses }}
      //     />
      //   ),
      //   name: <span>Create Assets</span>,
      // },

      // {
      //   path: "/app/customer",
      //   icon: (
      //     <img
      //       src="/customer.png"
      //       alt="Customer"
      //       style={{ width: "32px", height: "auto" }}
      //       className={{ submenuIconClasses }}
      //     />
      //   ),
      //   name: <span className="">Customer</span>,
      // },
      // {
      //   path: "/app/vendors",
      //   icon: (
      //     <img
      //       src="/vendor.png"
      //       alt="Vendors"
      //       style={{ width: "33px", height: "auto" }}
      //       className={{ submenuIconClasses }}
      //     />
      //   ),
      //   name: <span className="">Vendors</span>,
      // },
      {
        path: "/app/Branch",
        icon: (
          <img
            src="https://cdn-icons-png.flaticon.com/128/4363/4363836.png"
            alt="StockBranch"
            style={{ width: "34px", height: "auto" }}
            className={`${iconClasses} inline`}
          />
        ),
        name: "Branch",
      },

      {
        path: "/app/StockBranch", //no url needed as this has submenu
        icon: (
          <img
            src="https://cdn-icons-png.flaticon.com/128/8890/8890383.png"
            alt="StockBranch"
            style={{ width: "34px", height: "auto" }}
            className={`${iconClasses} inline`}
          />
        ),
        name: <span>Stock Branch</span>,
      },
      {
        path: "/app/Country",
        icon: (
          <img
            src="	https://cdn-icons-png.flaticon.com/128/9746/9746676.png"
            alt="Country"
            style={{ width: "34px", height: "auto" }}
            className={{ submenuIconClasses }}
          />
        ),
        name: <span className="">Country Master</span>,
      },
      {
        path: "/app/State",
        icon: (
          <img
            src="	https://cdn-icons-png.flaticon.com/128/3663/3663073.png"
            alt="Unit"
            style={{ width: "34px", height: "auto" }}
            className={{ submenuIconClasses }}
          />
        ),
        name: <span className="">State Master</span>,
      },
      {
        path: "/app/CityMaster",
        icon: (
          <img
            src="	https://cdn-icons-png.flaticon.com/128/2994/2994305.png"
            alt="Unit"
            style={{ width: "34px", height: "auto" }}
            className={{ submenuIconClasses }}
          />
        ),
        name: <span className="">City Master</span>,
      },

      {
        path: "/app/warehouse",
        icon: (
          <img
            src="https://cdn-icons-png.flaticon.com/128/3061/3061160.png"
            alt="Warehouse"
            style={{ width: "34px", height: "auto" }}
            className={{ submenuIconClasses }}
          />
        ),
        name: <span className="">Warehouse</span>,
      },
      {
        path: "/app/unit",
        icon: (
          <img
            src="https://cdn-icons-png.flaticon.com/128/10751/10751369.png"
            alt="Unit"
            style={{ width: "36px", height: "auto" }}
            className={{ submenuIconClasses }}
          />
        ),
        name: <span className="">Unit</span>,
      },
    ],
  },

  {
    path: "", //no url needed as this has submenu
    icon: (
      <img
        src="https://cdn-icons-png.flaticon.com/128/12819/12819713.png"
        alt="Master"
        style={{ width: "32px", height: "auto" }}
        className={`${iconClasses} inline`}
      />
    ),
    name: <span className="ml-2">Operational</span>,
    submenu: [
      {
        path: "/app/assetcategory",
        icon: (
          <img
            src="	https://cdn-icons-png.flaticon.com/128/16314/16314349.png"
            alt="AssetGroup"
            style={{ width: "32px", height: "auto" }}
            className={{ submenuIconClasses }}
          />
        ),
        name: <span>Asset Category</span>,
      },
      {
        path: "/app/createasset",
        icon: (
          <img
            src="	https://cdn-icons-png.flaticon.com/128/1792/1792411.png"
            alt="CreateAssets"
            style={{ width: "33px", height: "auto" }}
            className={{ submenuIconClasses }}
          />
        ),
        name: <span>Create Assets</span>,
      },

      {
        path: "/app/customer",
        icon: (
          <img
            src="https://cdn-icons-png.flaticon.com/128/5455/5455723.png"
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
            src="https://cdn-icons-png.flaticon.com/128/14785/14785229.png"
            alt="Vendors"
            style={{ width: "33px", height: "auto" }}
            className={{ submenuIconClasses }}
          />
        ),
        name: <span className="">Vendors</span>,
      },
      {
        path: "/app/createkit",
        icon: (
          <img
            src="https://cdn-icons-png.flaticon.com/128/5001/5001087.png"
            alt="CreateKit"
            style={{ width: "31px", height: "auto" }}
            className={{ submenuIconClasses }}
          />
        ),
        name: <span>Create Kit</span>,
      },
      {
        path: "/app/partstudy", //no url needed as this has submenu
        icon: (
          <img
            src="https://cdn-icons-png.flaticon.com/128/8787/8787090.png"
            alt="PartStudy"
            style={{ width: "34px", height: "auto" }}
            className={{ submenuIconClasses }}
          />
        ),
        name: <span className="">Part Study</span>,
      },
      {
        path: "/app/flows",
        icon: (
          <img
            src="https://cdn-icons-png.flaticon.com/128/854/854932.png"
            alt="Flows"
            style={{ width: "32px", height: "auto" }}
            className={{ submenuIconClasses }}
          />
        ),
        name: <span className="ml-1">Flows</span>,
      },
      {
        path: "/app/KitCard",
        icon: (
          <img
            src="https://cdn-icons-png.flaticon.com/128/10989/10989830.png"
            alt="KitCard"
            style={{ width: "34px", height: "auto" }}
            className={{ submenuIconClasses }}
          />
        ),
        name: <span className="">Kit Card</span>,
      },
      {
        path: "/app/FlowCard",
        icon: (
          <img
            src="https://cdn-icons-png.flaticon.com/128/15202/15202850.png
"
            alt="FlowCard"
            style={{ width: "34px", height: "auto" }}
            className={{ submenuIconClasses }}
          />
        ),
        name: <span className="">Flow Card</span>,
      },
      {
        path: "/app/assetTaggingDetails",
        icon: (
          <img
            src="/report.png"
            alt="AssetTagging"
            style={{ width: "29px", height: "auto" }}
            className={`${iconClasses} inline`}
          />
        ),
        name: <span style={{ marginLeft: "6px" }}>Asset Tagging</span>,
      },
      {
        path: "/app/chargetyperequest",
        icon: (
          <img
            src="/report.png"
            alt="Charge Type Request"
            style={{ width: "29px", height: "auto" }}
            className={`${iconClasses} inline`}
          />
        ),
        name: <span style={{ marginLeft: "6px" }}>Charge Type Request</span>,
      },
      {
        path: "/app/group",
        icon: (
          <img
            src="/report.png"
            alt="Group"
            style={{ width: "29px", height: "auto" }}
            className={`${iconClasses} inline`}
          />
        ),
        name: <span style={{ marginLeft: "6px" }}>Group</span>,
      },
      {
        path: "/app/invoiceGenerator",
        icon: (
          <img
            src="/report.png"
            alt="AssetTagging"
            style={{ width: "29px", height: "auto" }}
            className={`${iconClasses} inline`}
          />
        ),
        name: <span style={{ marginLeft: "6px" }}>Invoice Generator</span>,
      },
      // {
      //   path: "/app/Branch",
      //   icon: (
      //     <img
      //       src="https://cdn-icons-png.flaticon.com/128/11743/11743089.png"
      //       alt="StockBranch"
      //       style={{ width: "29px", height: "auto" }}
      //       className={`${iconClasses} inline`}
      //     />
      //   ),
      //   name: "Branch",
      // },

      // {
      //   path: "/app/StockBranch", //no url needed as this has submenu
      //   icon: (
      //     <img
      //       src="/report.png"
      //       alt="StockBranch"
      //       style={{ width: "29px", height: "auto" }}
      //       className={`${iconClasses} inline`}
      //     />
      //   ),
      //   name: <span style={{ marginLeft: "6px" }}>Stock Branch</span>,
      // },
      // {
      //   path: "/app/Country",
      //   icon: (
      //     <img
      //       src="https://cdn-icons-png.flaticon.com/128/2947/2947721.png"
      //       alt="Country"
      //       style={{ width: "34px", height: "auto" }}
      //       className={{ submenuIconClasses }}
      //     />
      //   ),
      //   name: <span className="">Country Master</span>,
      // },
      // {
      //   path: "/app/State",
      //   icon: (
      //     <img
      //       src="/city.png"
      //       alt="Unit"
      //       style={{ width: "34px", height: "auto" }}
      //       className={{ submenuIconClasses }}
      //     />
      //   ),
      //   name: <span className="">State Master</span>,
      // },
      // {
      //   path: "/app/CityMaster",
      //   icon: (
      //     <img
      //       src="/city.png "
      //       alt="Unit"
      //       style={{ width: "34px", height: "auto" }}
      //       className={{ submenuIconClasses }}
      //     />
      //   ),
      //   name: <span className="">City Master</span>,
      // },
      // // {
      // //   path: "/app/KitCard",
      // //   icon: (
      // //     <img
      // //       src="	https://cdn-icons-png.flaticon.com/128/2752/2752867.png"
      // //       alt="KitCard"
      // //       style={{ width: "34px", height: "auto" }}
      // //       className={{ submenuIconClasses }}
      // //     />
      // //   ),
      // //   name: <span className="">Kit Card</span>,
      // // },
      // {
      //   path: "/app/warehouse",
      //   icon: (
      //     <img
      //       src="/warehouse.png"
      //       alt="Warehouse"
      //       style={{ width: "28px", height: "auto" }}
      //       className={{ submenuIconClasses }}
      //     />
      //   ),
      //   name: <span className="ml-1">Warehouse</span>,
      // },
      // {
      //   path: "/app/unit",
      //   icon: (
      //     <img
      //       src="/unit.png"
      //       alt="Unit"
      //       style={{ width: "34px", height: "auto" }}
      //       className={{ submenuIconClasses }}
      //     />
      //   ),
      //   name: <span className="">Unit</span>,
      // },
    ],
  },

  // {
  //   path: "", //no url needed as this has submenu
  //   icon: (
  //     <img
  //       src="/operational.png"
  //       alt="Operational"
  //       style={{ width: "34px", height: "auto" }}
  //       className={`${iconClasses} inline`}
  //     />
  //   ),
  //   name: <span style={{ marginLeft: "7px" }}>Engineering</span>,
  //   submenu: [
  //     {
  //       path: "/app/createkit",
  //       icon: (
  //         <img
  //           src="/createkit.png"
  //           alt="CreateKit"
  //           style={{ width: "31px", height: "auto" }}
  //           className={{ submenuIconClasses }}
  //         />
  //       ),
  //       name: <span>Create Kit</span>,
  //     },
  //     {
  //       path: "/app/partstudy", //no url needed as this has submenu
  //       icon: (
  //         <img
  //           src="/part.png"
  //           alt="PartStudy"
  //           style={{ width: "30px", height: "auto" }}
  //           className={{ submenuIconClasses }}
  //         />
  //       ),
  //       name: <span className="">Part Study</span>,
  //     },
  //     {
  //       path: "/app/flows",
  //       icon: (
  //         <img
  //           src="/flow.png"
  //           alt="Flows"
  //           style={{ width: "26px", height: "auto" }}
  //           className={{ submenuIconClasses }}
  //         />
  //       ),
  //       name: <span className="ml-1">Flows</span>,
  //     },
  //   ],
  // },

  // {
  //   path: "/app/issuemanifest", //no url needed as this has submenu
  //   icon: (
  //     <img
  //       src="/issuemanifest1.png"
  //       alt="Issuemanifest"
  //       style={{ width: "30px", height: "auto" }}
  //       className={{ submenuIconClasses }}
  //     />
  //   ),
  //   name: <span className="ml-1">Bin Allotment</span>,
  // },
  // {
  //   path: "/app/emitterbinallotment", //no url needed as this has submenu
  //   icon: (
  //     <img
  //       src="/issuemanifest1.png"
  //       alt="Issuemanifest"
  //       style={{ width: "30px", height: "auto" }}
  //       className={{ submenuIconClasses }}
  //     />
  //   ),
  //   name: <span className="ml-1">Emitter Bin Allotment</span>,
  // },
  {
    path: "/app/binallotmentdetails", //no url needed as this has submenu
    icon: (
      <img
        src="https://cdn-icons-png.flaticon.com/128/8947/8947854.png"
        alt="Issuemanifest"
        style={{ width: "30px", height: "auto" }}
        className={{ submenuIconClasses }}
      />
    ),
    name: <span className="ml-1">Bin Allotment</span>,
  },
  {
    path: "/app/adminbinretrieval", //no url needed as this has submenu
    icon: (
      <img
        src="https://cdn-icons-png.flaticon.com/128/8552/8552084.png"
        alt="Issuemanifest"
        style={{ width: "30px", height: "auto" }}
        className={{ submenuIconClasses }}
      />
    ),
    name: <span className="ml-1">Bin Retrieval</span>,
  },

  {
    path: "", //no url needed as this has submenu
    icon: (
      <img
        src="https://cdn-icons-png.flaticon.com/128/3143/3143218.png"
        alt="PDF"
        style={{ width: "29px", height: "auto" }}
        className={`${iconClasses} inline`}
      />
    ),
    name: <span style={{ marginLeft: "12px" }}>Pdf Generator</span>,
    submenu: [
      // {
      //   path: "/app/issuemanifestprovider", //no url needed as this has submenu
      //   icon: (
      //     <img
      //       src="https://cdn-icons-png.flaticon.com/128/3143/3143218.png"
      //       alt="Issuemanifestprovider"
      //       style={{ width: "36px", height: "auto" }}
      //       className={{ submenuIconClasses }}
      //     />
      //   ),
      //   name: <span className="">MIM Generator</span>,
      // },
      {
        path: "/app/materialissuemanifest", //no url needed as this has submenu
        icon: (
          <img
            src="https://cdn-icons-png.flaticon.com/128/3143/3143218.png"
            alt="MaterialIssueManifest"
            style={{ width: "36px", height: "auto" }}
            className={{ submenuIconClasses }}
          />
        ),
        name: <span className="">Material Issue Manifest</span>,
      },
      // {
      //   path: "/app/retrievalmanifestprovider", //no url needed as this has submenu
      //   icon: (
      //     <img
      //       src="https://cdn-icons-png.flaticon.com/128/3143/3143218.png"
      //       alt="Retrievalmanifestprovider"
      //       style={{ width: "36px", height: "auto" }}
      //       className={{ submenuIconClasses }}
      //     />
      //   ),
      //   name: <span className="">RIM Generator</span>,
      // },
      {
        path: "/app/retrievalissuemanifest", //no url needed as this has submenu
        icon: (
          <img
            src="https://cdn-icons-png.flaticon.com/128/3143/3143218.png"
            alt="RetrievalIssueManifest"
            style={{ width: "36px", height: "auto" }}
            className={{ submenuIconClasses }}
          />
        ),
        name: <span className="">Retrieval Issue Manifest</span>,
      },
    ],
  },
  {
    path: "", //no url needed as this has submenu
    icon: (
      <img
        src="	https://cdn-icons-png.flaticon.com/128/11392/11392546.png"
        alt="Inward"
        style={{ width: "29px", height: "auto" }}
        className={`${iconClasses} inline`}
      />
    ),
    name: <span style={{ marginLeft: "12px" }}>Asset Inward</span>,
    submenu: [
      {
        path: "/app/inwardmanifestdetails", //no url needed as this has submenu
        icon: (
          <img
            src="https://cdn-icons-png.flaticon.com/128/3143/3143218.png"
            alt="Inwardmanifest"
            style={{ width: "36px", height: "auto" }}
            className={{ submenuIconClasses }}
          />
        ),
        name: <span className="">Asset Inward Details</span>,
      },
    ],
  },

  //             TEMPORARY HIDE

  // {
  //   path: "", //no url needed as this has submenu
  //   icon: (
  //     <img
  //       src="/outwardAdmin.png"
  //       alt="Outward"
  //       style={{ width: "30px", height: "auto" }}
  //       className={`${iconClasses} inline`}
  //     />
  //   ),
  //   name: <span style={{ marginLeft: "12px" }}>Asset Outward</span>,
  //   submenu: [
  //     {
  //       path: "/app/EmptyRetrievalManifest", //no url needed as this has submenu
  //       icon: (
  //         <img
  //           src="/emptyRetrieval.png"
  //           alt="EmptyRetrievalManifest"
  //           style={{ width: "30px", height: "auto" }}
  //           className={{ submenuIconClasses }}
  //         />
  //       ),
  //       name: <span className="ml-1">Asset Outward</span>,
  //     },
  //   ],
  // },
  // {
  //   path: "", //no url needed as this has submenu
  //   icon: (
  //     <img
  //       src="/docTypeH.png"
  //       alt="docType"
  //       style={{ width: "30px", height: "auto" }}
  //       className={`${iconClasses} inline`}
  //     />
  //   ),
  //   name: <span style={{ marginLeft: "12px" }}>Document Type</span>,
  //   submenu: [
  //     {
  //       path: "/app/DocumentType", //no url needed as this has submenu
  //       icon: (
  //         <img
  //           src="/docType.png"
  //           alt="DocumentType"
  //           style={{ width: "30px", height: "auto" }}
  //           className={{ submenuIconClasses }}
  //         />
  //       ),
  //       name: <span className="ml-1">Document Type</span>,
  //     },
  //   ],
  // },
  // {
  //   path: "", //no url needed as this has submenu
  //   icon: (
  //     <img
  //       src="/servicesH.png"
  //       alt="Services"
  //       style={{ width: "32px", height: "auto" }}
  //       className={`${iconClasses} inline`}
  //     />
  //   ),
  //   name: <span style={{ marginLeft: "12px" }}>Services</span>,
  //   submenu: [
  //     {
  //       path: "/app/Services", //no url needed as this has submenu
  //       icon: (
  //         <img
  //           src="/services.png"
  //           alt="Services"
  //           style={{ width: "30px", height: "auto" }}
  //           className={{ submenuIconClasses }}
  //         />
  //       ),
  //       name: <span className="ml-1">Services</span>,
  //     },
  //     {
  //       path: "/app/Terms", //no url needed as this has submenu
  //       icon: (
  //         <img
  //           src="https://cdn-icons-png.flaticon.com/128/4497/4497103.png"
  //           alt="Services"
  //           style={{ width: "30px", height: "auto" }}
  //           className={{ submenuIconClasses }}
  //         />
  //       ),
  //       name: <span className="ml-1">Terms</span>,
  //     },
  //     {
  //       path: "/app/PoOrder", //no url needed as this has submenu
  //       icon: (
  //         <img
  //           src="https://cdn-icons-png.flaticon.com/128/10112/10112454.png"
  //           alt="Services"
  //           style={{ width: "30px", height: "auto" }}
  //           className={{ submenuIconClasses }}
  //         />
  //       ),
  //       name: <span className="ml-1">Purchase Order Old</span>,
  //     },

  //     {
  //       path: "/app/poddetails", //no url needed as this has submenu
  //       icon: (
  //         <img
  //           src="https://cdn-icons-png.flaticon.com/128/10112/10112454.png"
  //           alt="Services"
  //           style={{ width: "30px", height: "auto" }}
  //           className={{ submenuIconClasses }}
  //         />
  //       ),
  //       name: <span className="ml-1">POD Details</span>,
  //     },
  //     {
  //       path: "/app/proofofdispatchdetails", //no url needed as this has submenu
  //       icon: (
  //         <img
  //           src="https://cdn-icons-png.flaticon.com/128/10112/10112454.png"
  //           alt="Services"
  //           style={{ width: "30px", height: "auto" }}
  //           className={{ submenuIconClasses }}
  //         />
  //       ),
  //       name: <span className="ml-1">Proof of Dispatch Details</span>,
  //     },
  //     {
  //       path: "/app/Pdf", //no url needed as this has submenu
  //       icon: (
  //         <img
  //           src="https://cdn-icons-png.flaticon.com/128/10112/10112454.png"
  //           alt="Services"
  //           style={{ width: "30px", height: "auto" }}
  //           className={{ submenuIconClasses }}
  //         />
  //       ),
  //       name: <span className="ml-1">Purchase Order</span>,
  //     },
  //   ],
  // },

  // {
  //   path: "/app/KitDistributionReport", //no url needed as this has submenu
  //   icon: (
  //     <img
  //       src="/report.png"
  //       alt="KitDistributionReport"
  //       style={{ width: "29px", height: "auto" }}
  //       className={`${iconClasses} inline`}
  //     />
  //   ),
  //   name: <span style={{ marginLeft: "6px" }}>Kit Distribution Report</span>,
  // },
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

  // {
  //   path: "", //no url needed as this has submenu
  //   icon: (
  //     <img
  //       src="/accounting.png"
  //       alt="Accounting"
  //       style={{ width: "29px", height: "auto" }}
  //       className={`${iconClasses} inline`}
  //     />
  //   ),
  //   name: <span style={{ marginLeft: "14px" }}>Accounting</span>,
  //   submenu: [
  //     {
  //       path: "/app/expenses", //no url needed as this has submenu
  //       icon: (
  //         <img
  //           src="/expenses.png"
  //           alt="Expenses"
  //           style={{ width: "33px", height: "auto" }}
  //           className={{ submenuIconClasses }}
  //         />
  //       ),
  //       name: <span className="">Expenses</span>,
  //     },
  //     {
  //       path: "/app/ChargeCode", //no url needed as this has submenu
  //       icon: (
  //         <img
  //           src="/expenses.png"
  //           alt="Expenses"
  //           style={{ width: "33px", height: "auto" }}
  //           className={{ submenuIconClasses }}
  //         />
  //       ),
  //       name: <span className="">Charge Code</span>,
  //     },
  //   ],
  // },

  // {
  //   path: "", //no url needed as this has submenu
  //   icon: (
  //     <img
  //       src="/lifecycle.png"
  //       alt="LifecycleManagement"
  //       style={{ width: "32px", height: "auto" }}
  //       className={`${iconClasses} inline`}
  //     />
  //   ),
  //   name: <span style={{ marginLeft: "8px" }}>Lifecycle Management</span>,
  //   submenu: [
  //     {
  //       path: "/app/audit",
  //       icon: (
  //         <img
  //           src="/audit.png"
  //           alt="Audit"
  //           style={{ width: "30px", height: "auto" }}
  //           className={{ submenuIconClasses }}
  //         />
  //       ),
  //       name: <span className="">Audit</span>,
  //     },
  //   ],
  // },
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

const isAdmin = localStorage.getItem("userDetails") === "ROLE_ADMIN";

const routes = isAdmin
  ? [
      {
        path: "", // no URL needed as this has submenu
        icon: (
          <img
            src="https://cdn-icons-png.flaticon.com/128/12153/12153844.png"
            alt="Admin"
            style={{ width: "34px", height: "auto" }}
            className={`${iconClasses} inline`}
          />
        ),
        name: <span className="ml-2">Product Owner</span>,

        submenu: [
          {
            path: "/app/companydetails",
            icon: (
              <img
                src="https://cdn-icons-png.flaticon.com/128/4413/4413528.png"
                alt="Company Details"
                style={{ width: "32px", height: "auto" }}
                className={submenuIconClasses}
              />
            ),
            name: <span>Company Details</span>,
          },
        ],
      },
    ]
  : allRoutes;

export default routes;

import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import axios from "axios";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import React, { useEffect, useMemo, useState } from "react";
import { FaBoxOpen, FaCloudUploadAlt } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { LuWarehouse } from "react-icons/lu";
import { TbWeight } from "react-icons/tb";
import DashBoardComponent from "../master/DashBoardComponent";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { AsstTagging } from "./AsstTagging";

export const AssetTaggingDetails = () => {
  const [addTagging, setAddTagging] = React.useState(false);
  const [viewTagging, setViewTagging] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));
  const [selectedRowId, setSelectedRowId] = useState(null);

  const handleAddTaggingOpen = () => {
    setAddTagging(true);
  };

  const handleBack = () => {
    setAddTagging(false);
    setViewTagging(false);
    getAllAssetTaggingByOrgId();
  };

  useEffect(() => {
    getAllAssetTaggingByOrgId();
    console.log("THE SELECTED ROW ID FROM USEEFFECT IS:", selectedRowId);
  }, []);

  const getAllAssetTaggingByOrgId = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/getAllAssetTaggingOrgId?orgId=${orgId}`
      );

      if (response.status === 200) {
        setData(response.data.paramObjectsMap.assetTaggingVO);
        console.log(response.data.paramObjectsMap.assetTaggingVO);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleViewRow = (row) => {
    setSelectedRowId(row.original.id);
    console.log("setSelectedRowData", row.original);
    setViewTagging(true);
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const columns = useMemo(
    () => [
      {
        accessorKey: "actions",
        header: "Actions",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        enableSorting: false,
        enableColumnOrdering: false,
        enableEditing: false,
        Cell: ({ row }) => (
          <div>
            <IconButton onClick={() => handleViewRow(row)}>
              <VisibilityIcon />
            </IconButton>
          </div>
        ),
      },
      // {
      //   accessorKey: "docid",
      //   header: "Doc ID",
      //   size: 50,
      //   muiTableHeadCellProps: {
      //     align: "center",
      //   },
      //   muiTableBodyCellProps: {
      //     align: "center",
      //   },
      // },
      {
        accessorKey: "category",
        header: "Category",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "assetCode",
        header: "Asset Code",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "asset",
        header: "Asset Desc",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "seqTo",
        header: "QTY",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    data,
    columns,
  });

  const handleSaveRowEdits = () => {};

  const handleCancelRowEdits = () => {};

  const handleEdit = (rowData) => {
    console.log("Edit clicked for row:", rowData);
  };

  const handleDelete = (rowData) => {
    console.log("Delete clicked for row:", rowData);
  };

  return (
    <>
      {(addTagging && <AsstTagging addTagging={handleBack} />) ||
        (viewTagging && (
          <AsstTagging addTagging={handleBack} viewId={selectedRowId} />
        )) || (
          <div className="card w-full p-6 bg-base-100 shadow-xl">
            {/* ADD NEW BUTTON */}
            <div className="">
              <div className="flex justify-content-end">
                <button
                  className="btn btn-ghost btn-lg text-sm col-xs-1"
                  style={{ color: "blue" }}
                  onClick={handleAddTaggingOpen}
                >
                  <img
                    src="/new.png"
                    alt="pending-status-icon"
                    title="add"
                    style={{
                      width: 30,
                      height: 30,
                      margin: "auto",
                      hover: "pointer",
                    }}
                  />
                  <span
                    className="text-form text-base"
                    style={{ marginLeft: "10px" }}
                  >
                    Asset Tagging
                  </span>
                </button>
              </div>
            </div>

            {/* LISTVIEW TABLE */}
            <div className="mt-4">
              <MaterialReactTable table={table} />
            </div>
          </div>
        )}
    </>
  );
};

export default AssetTaggingDetails;

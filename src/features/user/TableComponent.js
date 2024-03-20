import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import {
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridRowModes,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";

function EditToolbar({ setRows, setRowModesModel, fieldNames, onAdd }) {
  const handleClick = () => {
    const id = Math.random().toString(36).substring(7);
    const newRecord = {
      id,
      isNew: true,
      ...Object.fromEntries(fieldNames.map((fieldName) => [fieldName, ""])),
    };

    // Call the onAdd function in the parent component
    onAdd(newRecord);

    // Update the row modes model for the newly added record
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: fieldNames[0] },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

function TableComponent({
  fieldNames,
  data,
  onDelete,
  onEdit,
  onAddRecord,
  rootData,
  setRootData,
  tabName,
}) {
  const [updatedData, setUpdatedData] = useState({});
  const [originalData, setOriginalData] = useState({});
  const [deletingRowId, setDeletingRowId] = useState(null);
  const [newRowValue, setNewRowValue] = useState({});
  const [rows, setRows] = useState({
    [tabName]: data,
  });
  const [rowModesModel, setRowModesModel] = useState({});
  useEffect(() => {
    console.log("Data received:", tabName);

    // Ensure data is an array before using reduce
    const dataArray = Array.isArray(data) ? data : [];

    // Initialize rows and rowModesModel based on dataArray
    const initialRows = dataArray.map((item) => ({
      ...item,
      id: item.id || Math.random().toString(36).substring(7), // Ensure each item has a unique id
      // serial: item.key + 1,
    }));
    const initialRowModesModel = dataArray.reduce((acc, row) => {
      acc[row.id] = { mode: GridRowModes.View };
      return acc;
    }, {});
    setRows({
      ...rows,
      [tabName]: initialRows,
    });
    setRowModesModel(initialRowModesModel);
  }, [data]);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };
  const handleAdd = (newRecord) => {
    setRows((oldRows) => {
      return {
        ...oldRows,
        [tabName]: [...oldRows[tabName], { ...newRecord, isNew: true }],
      };
    });

    setRowModesModel((oldModel) => ({
      ...oldModel,
      [newRecord.id]: { mode: GridRowModes.Edit, fieldToFocus: fieldNames[0] },
    }));
  };

  const handleEditClick = (id) => () => {
    setRowModesModel((prevModel) => {
      const currentMode = prevModel[id]?.mode;

      // Check if the row is in edit mode
      if (currentMode === GridRowModes.Edit) {
        // Revert to view mode if "Cancel" button is clicked
        return {
          ...prevModel,
          [id]: { mode: GridRowModes.View },
        };
      }

      // Set to edit mode if "Edit" button is clicked
      return {
        ...prevModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: fieldNames[0] },
      };
    });
  };

  const handleSaveClick = (id) => () => {
    console.log("Save button clicked for ID:", id);

    setRowModesModel((prevModel) => ({
      ...prevModel,
      [id]: { mode: GridRowModes.View },
    }));

    // Use the state 'rows' to get the updated data
    const updatedRow = rows.find((row) => row.id === id);

    // Log the updatedRow to see if it's correct
    console.log("Updated Row:", updatedRow);

    // Call onEdit callback for existing records
    // onEdit(id, updatedRow);

    // Call onAddRecord only when the row is new (isNew is true)
    if (updatedRow.isNew && onAddRecord) {
      // Log the rows before updating
      console.log("Rows before update:", rows);

      onAddRecord([...rows, updatedRow]); // Update the data prop

      // Log the rows after updating
      console.log("Rows after update:", [...rows, updatedRow]);
    }

    console.log("Save button clicked successfully");
  };

  const handleDeleteClick = (id) => () => {
    setDeletingRowId(id);
  };

  const handleDelete = () => {
    if (deletingRowId) {
      onDelete(deletingRowId);
      setDeletingRowId(null);
    }
  };

  const closeDeleteConfirmation = () => {
    setDeletingRowId(null);
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false, key: newRow.id };
    // setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

    setRows({
      ...rows,
      [tabName]: [
        ...rows[tabName].map((row) =>
          row.id === newRow.id ? updatedRow : row
        ),
      ],
    });

    // setNewRowValue(updatedRow);
    console.log("Test2", updatedRow);
    if (tabName === "client") {
      setRootData({
        ...rootData,
        clientTableData: [...rootData.clientTableData, updatedRow],
      });
    } else if (tabName === "branch") {
      setRootData({
        ...rootData,
        branchTableData: [...rootData.branchTableData, updatedRow],
      });
    }

    onEdit(updatedRow);

    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      headerClassName: "custom-header-class",
      width: 100,
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon color="error" />}
              label="Cancel"
              onClick={handleEditClick(id)}
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon color="primary" sx={{ fontSize: 22 }} />}
            label="Edit"
            onClick={handleEditClick(id)}
          />,
          // <GridActionsCellItem
          //   icon={<DeleteIcon color="error" />}
          //   label="Delete"
          //   onClick={handleDeleteClick(id)}
          // />,
        ];
      },
    },
    {
      field: "id",
      headerName: "Id",
      width: 80,
      headerClassName: "custom-header-class",
      // renderCell: (params) => params.rowIndex + 1,
    },
    ...fieldNames.map((fieldName, index) => ({
      field: fieldName,
      headerName:
        fieldName.charAt(0).toUpperCase() +
        fieldName.slice(1).replace(/([A-Z])/g, " $1"), // Convert the first character to uppercase
      width: 130,
      flex: 1,
      minWidth: 150,
      fontWeight: "black",
      color: "black",
      headerClassName: "custom-header-class",
      editable: true,
    })),
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: "auto",
        flex: 1,
        // marginTop:"10px",
        // backgroundColor: "#f4f4f4",
        // borderRadius: 1,
        // boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
        overflow: "hidden", // Hide overflow for a cleaner look
        marginBottom: 16, // Adjust the margin bottom to add space

        "& .MuiDataGrid-root": {
          border: "1px solid #ddd", // Add a border to the entire table
          borderRadius: 2, // Add a slight border-radius
        },
        "& .custom-header-class": {
          fontWeight: "bold",
          fontSize: 17,
          color: "white",
          backgroundColor: "#34acdd", // Teal color
          padding: "12px", // Add padding to header cells
        },
        "& .MuiDataGrid-row": {
          "&:nth-of-type(odd)": {
            backgroundColor: "#e0f2f1", // Alternate row background color
          },
          "&:nth-of-type(even)": {
            backgroundColor: "#e0f2f1", // Another color for the other rows
          },
          "&:hover": {
            backgroundColor: "#ffffff", // Hover effect for rows
          },
        },
        "& .MuiDataGrid-cell": {
          padding: "8px", // Add padding to data cells
        },
      }}
    >
      <DataGrid
        rows={rows[tabName]}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: (props) => (
            <EditToolbar {...props} onAdd={handleAdd} fieldNames={fieldNames} />
          ),
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel, onAddRecord },
        }}
      />

      {/* Delete confirmation modal */}
      <Dialog open={deletingRowId !== null} onClose={closeDeleteConfirmation}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this row?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteConfirmation} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default TableComponent;

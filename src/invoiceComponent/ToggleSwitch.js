import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React, { useState } from "react";

const GSTCheckbox = () => {
  const [selectedGST, setSelectedGST] = useState("");

  const handleCheckboxChange = (event) => {
    const { name } = event.target;
    setSelectedGST(name);
  };

  return (
    <div>
      <h1>Checkbox</h1>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedGST === "inter"}
              onChange={handleCheckboxChange}
              name="inter"
            />
          }
          label="Inter GST"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedGST === "intra"}
              onChange={handleCheckboxChange}
              name="intra"
            />
          }
          label="Intra GST"
        />
      </FormGroup>
    </div>
  );
};

export default GSTCheckbox;

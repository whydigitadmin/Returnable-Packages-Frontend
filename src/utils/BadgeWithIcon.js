import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { green, red } from "@mui/material/colors";
import React, { useState } from "react";
import CountUp from "react-countup";
import BadgeDialog from "./BadgeDialog";

const BadgeWithIcon = ({
  badgeContent,
  color,
  tooltipTitle,
  IconComponent,
  completedReqData,
  pendingReqData,
  type,
  inward,
  outward,
}) => {
  const [open, setOpen] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(true);
  };

  console.log("inward", inward);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title={tooltipTitle}>
        <IconButton
          onClick={handleClick}
          style={{
            cursor: "pointer",
            position: "relative",
          }}
        >
          <Badge
            badgeContent={<CountUp end={badgeContent} duration={2} />}
            color={color}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            style={{ pointerEvents: "none" }}
          >
            <IconComponent
              style={
                type === "Completed"
                  ? { color: green[500] }
                  : { color: red[500] }
              }
            />
          </Badge>
        </IconButton>
      </Tooltip>
      <BadgeDialog
        open={open}
        onClose={handleClose}
        completedReqData={completedReqData}
        pendingReqData={pendingReqData}
        type={type}
        inwardTo={inward}
        outwardTo={outward}
      />
    </>
  );
};

export default BadgeWithIcon;

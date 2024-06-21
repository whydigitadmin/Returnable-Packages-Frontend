import CloseIcon from "@mui/icons-material/Close";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import CountUp from "react-countup";

function DashBoardComponent({
  title,
  subTitle,
  icon,
  value,
  description,
  colorIndex,
}) {
  const COLORS = ["blue", "green", "primary", "gray"];
  const [lowVolume, setLowVolume] = useState(false);
  const [animatedValue, setAnimatedValue] = useState(0);

  const getDescStyle = () => {
    if (description.includes("↗︎"))
      return "font-bold text-green-700 dark:text-green-300";
    else if (description.includes("↙"))
      return "font-bold text-rose-500 dark:text-red-400";
    else return "";
  };

  // useEffect(() => {
  //   // if (lowVolume) {
  //   let currentValue = 0;
  //   const interval = setInterval(() => {
  //     currentValue++;
  //     setAnimatedValue(currentValue);
  //     if (currentValue === value) {
  //       clearInterval(interval);
  //     }
  //   }, 15); // Adjust interval time for smoother or faster animation
  //   // } else {
  //   //   setAnimatedValue(0); // Reset animation when closing dialog
  //   // }
  // }, [value]);

  const handleLowVolumeOpen = () => {
    setLowVolume(true);
  };

  const handleLowVolumeClose = () => {
    setLowVolume(false);
  };

  return (
    <>
      <div className="stats shadow transition transform hover:scale-105 duration-500 cursor-pointer">
        <div className="stat bg-green-200 text-green-800">
          <div
            className={
              title === "low stock"
                ? "dark:text-slate-300 text-right font-semibold cursor-pointer"
                : "dark:text-slate-300 text-right font-semibold"
            }
            onClick={title === "low stock" ? handleLowVolumeOpen : undefined}
          >
            {title}
          </div>
          <div className="dark:text-slate-300 text-right font-semibold mt-2 cursor-pointer">
            {subTitle}
          </div>
          <div className="flex justify-between mt-4 mb-2">
            <div
              className={`w-10 h-10 rounded dark:text-slate-300 bg-${COLORS[colorIndex]} text-${COLORS[colorIndex]}`}
            >
              {icon}
            </div>
            <div
              className={`font-semibold text-3xl mt-2 text-right dark:text-slate-100 text-${COLORS[colorIndex]}`}
            >
              <CountUp end={value} duration={2} />
            </div>
          </div>
          <div className={"stat-desc  " + getDescStyle()}>{description}</div>
        </div>
      </div>

      {/* VIEW MODAL */}
      <Dialog
        open={lowVolume}
        onClose={handleLowVolumeClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle style={{ borderBottom: "1px solid #ccc" }}>
          <div className="row">
            <div className="col-md-11"></div>
            <div className="col-md-1">
              <IconButton onClick={handleLowVolumeClose} aria-label="close">
                <CloseIcon />
              </IconButton>
            </div>
          </div>
        </DialogTitle>
        <DialogContent className="mt-4">
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Email ID</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          {/* )} */}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DashBoardComponent;

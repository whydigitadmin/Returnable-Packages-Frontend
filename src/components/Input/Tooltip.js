import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { useState } from "react";
import { CiCircleInfo } from "react-icons/ci";

function ToolTip({
  labelTitle,
  labelStyle,
  type,
  containerStyle,
  defaultValue,
  placeholder,
  updateFormValue,
  updateType,
  content,
}) {
  const [value, setValue] = useState(defaultValue);

  const updateInputValue = (val) => {
    setValue(val);
    updateFormValue({ updateType, value: val });
  };

  return (
    <div className={`${containerStyle}`}>
      <div style={{ position: "relative" }}>
        <input
          style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
          type={type || "text"}
          value={value}
          placeholder={placeholder || ""}
          onChange={(e) => updateInputValue(e.target.value)}
          className="input input-bordered"
        />
        <div
          className="my-tooltip-element"
          data-tooltip-html={content}
          style={{ position: "absolute", top: "12px", right: "8px" }}
        >
          <CiCircleInfo style={{ fontSize: "17px", marginBottom: "1px" }} />
        </div>
        <Tooltip
          anchorSelect=".my-tooltip-element"
          className="tooltip-element"
          delayHide={true}
          delayShow={true}
          style={{ wordBreak: "break-all" }}
        />
      </div>
    </div>
  );
}

export default ToolTip;

import { Tooltip } from "@material-ui/core";
import moment from "moment";
import { FaRegClock } from "react-icons/fa";

const LastLogin = ({ userDetail }) => {
  const lastLoginTime =
    userDetail.lastLogin === null
      ? moment().format("MMMM Do YYYY, h:mm:ss a")
      : moment(userDetail.lastLogin).format("MMMM Do YYYY, h:mm:ss a");

  return (
    <div className="flex items-center p-2 bg-white rounded-lg shadow-md border-l-4 border-blue-500">
      <div className="flex items-center justify-center bg-blue-100 p-2 rounded-full">
        <FaRegClock className="text-blue-500" size={20} />
      </div>
      <div className="ml-2">
        <Tooltip title="Your last login time" arrow>
          <div>
            <p className="text-xs text-gray-500">Last login</p>
            <p className="text-sm font-semibold text-gray-800">
              {lastLoginTime}
            </p>
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default LastLogin;

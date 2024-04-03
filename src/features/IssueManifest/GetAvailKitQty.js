import axios from "axios";
import React, { useEffect, useState } from "react";

const GetAvailKitQty = ({ item, warehouseLocationId, availQty }) => {
  const [availableKit, setAvailableKit] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetchAvailableKit = async (kitName) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/getAvalkitqty?Kitname=${kitName}&warehouseId=${warehouseLocationId}`
      );

      if (response.status === 200) {
        const newAvailableKit = response.data.paramObjectsMap.Avalkit[0].avlQty;
        setAvailableKit(newAvailableKit);
        availQty(newAvailableKit);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (item) {
      handleFetchAvailableKit(item.kitName);
    }
  }, [item]);

  return (
    <td>
      {" "}
      <span style={{ color: availableKit < item.kitQty ? "red" : "inherit" }}>
        {loading ? "Loading..." : availableKit}
      </span>
    </td>
  );
};

export default GetAvailKitQty;

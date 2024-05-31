import axios from "axios";

export const refreshAuthToken = async () => {
  try {
    console.log("refreshAuthToken called");
    const userName = localStorage.getItem("userName");
    const tokenId = localStorage.getItem("tokenId");

    const refreshTokenResponse = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/auth/getRefreshToken?tokenId=${tokenId}&userName=${userName}`
    );

    if (
      refreshTokenResponse.data.statusFlag === "Ok" &&
      refreshTokenResponse.data.status
    ) {
      const newToken =
        refreshTokenResponse.data.paramObjectsMap.refreshToken.token;
      localStorage.removeItem("token");
      localStorage.setItem("token", newToken);
      console.log("newToken created");
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
  }
};

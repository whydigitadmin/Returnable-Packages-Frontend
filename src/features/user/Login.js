import { Typography } from "@mui/material";
import Axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import InputText from "../../components/Input/InputText";
import ErrorText from "../../components/Typography/ErrorText";
import LandingIntro from "./LandingIntro";
import { encryptPassword } from "./components/utils";

function Login() {
  const INITIAL_LOGIN_OBJ = {
    password: "",
    emailId: "",
  };

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const isValidEmail = (email) => {
    // Use a regular expression or any other method to validate the email format
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const trimmedEmail = loginObj.emailId.trim();
    const trimmedPassword = loginObj.password.trim();

    if (trimmedEmail === "") {
      setErrorMessage("Email Id is required!");
    } else if (!isValidEmail(trimmedEmail)) {
      setErrorMessage("Please enter a valid email address.");
    } else if (trimmedPassword === "") {
      setErrorMessage("Password is required!");
    } else {
      setLoading(true);
      setLoadingBtn(true);

      // Create a request body
      const requestBody = {
        userName: trimmedEmail,
        password: encryptPassword(trimmedPassword),
      };

      try {
        const response = await Axios.post(
          `${process.env.REACT_APP_API_URL}/api/auth/login`,
          requestBody,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.data.status) {
          // Handle authentication failure, display an error message, etc.
          setErrorMessage(response.data.paramObjectsMap.errorMessage);
        } else {
          // Successful login, perform actions like storing tokens and redirecting
          localStorage.setItem(
            "token",
            response.data.paramObjectsMap.user.token
          );
          localStorage.setItem(
            "tokenId",
            response.data.paramObjectsMap.user.tokenId
          );
          localStorage.setItem("userName", trimmedEmail);
          localStorage.setItem(
            "orgId",
            response.data.paramObjectsMap.user.orgId
          );
          localStorage.setItem(
            "userDetails",
            response.data.paramObjectsMap.user.role
          );
          localStorage.setItem(
            "userId",
            response.data.paramObjectsMap.user.userId
          );
          localStorage.setItem(
            "userDto",
            JSON.stringify(response.data.paramObjectsMap.user)
          );
          console.log("token", response.data);
          if (localStorage.getItem("userDetails") === "ROLE_USER") {
            window.location.href = "/app/welcome";
          } else if (localStorage.getItem("userDetails") === "ROLE_EMITTER") {
            window.location.href = "/app/welcomeemitter";
          } else if (localStorage.getItem("userDetails") === "ROLE_OEM") {
            window.location.href = "/app/welcomeoem";
          } else if (localStorage.getItem("userDetails") === "ROLE_ADMIN") {
            window.location.href = "/app/companydetails";
          } else if (localStorage.getItem("userDetails") === "ROLE_DOCUMENT") {
            window.location.href = "/app/welcomedocumentuser";
          }
        }

        setLoading(false);
        setLoadingBtn(false);
      } catch (error) {
        console.error("Login error:", error);
        setErrorMessage("Login failed. Please try again."); // Handle login error here
        setLoading(false);
        setLoadingBtn(false);
      }
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setLoginObj({ ...loginObj, [updateType]: value });
  };

  return (
    <div
      className="min-h-screen flex items-center"
      style={{ backgroundColor: "#22223b" }}
    >
      <div className="card mx-auto w-full max-w-4xl my-2 shadow-xl rounded-left-border">
        <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
          <div className="">
            <LandingIntro />
          </div>
          <div className="pt-16 pb-1 px-10">
            <div
              className="mb-2 login-border"
              // style={{ backgroundColor: "#f7f052" }}
            >
              <div className="font-semibold text-2xl" style={{ width: "98%" }}>
                Welcome Back !{" "}
                {/* <span style={{ fontSize: "30px" }}>&#128075;</span> */}
              </div>{" "}
              <div className="text-sm font-semibold" style={{ width: "98%" }}>
                Please Enter your Login Credentials
              </div>
            </div>
            <form onSubmit={(e) => submitForm(e)}>
              <div className="mb-3">
                <InputText
                  type="emailId"
                  defaultValue={loginObj.emailId}
                  updateType="emailId"
                  containerStyle="mt-4"
                  labelTitle="Email Id"
                  updateFormValue={updateFormValue}
                />

                <InputText
                  defaultValue={loginObj.password}
                  type="password"
                  updateType="password"
                  containerStyle="mt-4"
                  labelTitle="Password"
                  updateFormValue={updateFormValue}
                />
              </div>

              <div className="text-right text-primary">
                <Link to="">
                  <span className="text-sm  inline-block  font-semibold hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                    Forgot Password?
                  </span>
                </Link>
              </div>

              <ErrorText styleClass="mt-2">{errorMessage}</ErrorText>
              {/* <button
                type="submit"
                className={"btn mt-2 w-full" + (loading ? " loading" : "")}
                style={{ backgroundColor: "#4ED14E" }}
              >
                Login
              </button> */}
              <button
                type="submit"
                className={"btn mt-2 w-full" + (loading ? " loading" : "")}
                style={{ backgroundColor: "#21C544" }}
              >
                {loadingBtn ? (
                  <span>Loading...</span> // Display loading text or spinner
                ) : (
                  "Login"
                )}
              </button>
            </form>
            {/* <GoGreen /> */}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "11%",
              }}
            >
              &nbsp;
              <Typography
                variant="body2"
                sx={{
                  fontSize: "11px",
                  fontWeight: "bold",
                  marginTop: "30px",
                  marginBottom: "10px",
                }}
              >
                Copyrights &copy; {new Date().getFullYear()} WhyDigit. All
                Rights Reserved.
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

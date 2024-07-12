import { Typography } from "@mui/material";
import Lottie from "lottie-react";
import LoginLottieFile from "../../pages/LoginLottie.json";

function LandingIntro() {
  return (
    <>
      <div
        className="min-h-full rounded-l-xl text-center"
        style={{ backgroundColor: "#ffffff", borderRight: "1px dashed grey" }}
      >
        <div className="hero-content pt-12">
          <div className="max-w-md">
            <div className="text-center mb-4">
              {" "}
              <img
                src="./BIN_BEE.png"
                alt="Dashwind Admin Template"
                className="w-40 inline-block"
              ></img>
            </div>
            <div className="text-center mb-2">
              <Lottie
                animationData={LoginLottieFile}
                loop={true}
                style={{ width: "275px", height: "275px" }}
              />
            </div>
            {/* <h1 className="text-3xl text-center font-bold mb-10">
              Returnable Packages
            </h1> */}
            {/* <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "30%",
                marginTop: "10%",
              }}
            >
              Sustainable
            </div> */}
            {/* <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "30%",
              }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/2391/2391092.png"
                width={25}
                height={25}
                alt="Go Green"
              />
              &nbsp;
              <Typography
                variant="body2"
                sx={{ fontSize: "13px", fontWeight: "bold", marginTop: "3px" }}
              >
                Sustainable
              </Typography>
            </div> */}

            {/* Importing pointers component */}
          </div>
        </div>
        {/* <TemplatePointers /> */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            marginTop: "11%",
            marginBottom: "2%",
          }}
        >
          {/* <div
            style={{
              display: "flex",
              alignItems: "center",
              color: "green",
              marginBottom: "8px",
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/9220/9220626.png"
              width={25}
              height={25}
              alt="Go Green"
            />
            &nbsp;
            <Typography
              variant="body2"
              sx={{
                fontSize: "13px",
                fontWeight: "bold",
                marginTop: "3px",
                color: "green",
              }}
            >
              Sustainable
            </Typography>
          </div> */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              color: "green",
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/9220/9220626.png"
              width={25}
              height={25}
              alt="Go Green"
            />
            &nbsp;
            <Typography
              variant="body2"
              sx={{
                fontSize: "13px",
                fontWeight: "bold",
                marginTop: "3px",
                color: "green",
              }}
            >
              Sustainable
            </Typography>
            &nbsp; &nbsp; &nbsp;
            <img
              src="https://cdn-icons-png.flaticon.com/128/2391/2391092.png"
              width={25}
              height={25}
              alt="Go Green"
            />
            &nbsp;
            <Typography
              variant="body2"
              sx={{ fontSize: "13px", fontWeight: "bold", marginTop: "3px" }}
            >
              #GoGreen
            </Typography>{" "}
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingIntro;

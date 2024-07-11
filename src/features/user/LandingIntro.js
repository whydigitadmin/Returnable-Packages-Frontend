import { Typography } from "@mui/material";
import Lottie from "lottie-react";
import LoginLottieFile from "../../pages/LoginLottie.json";
import Recycle from "../../pages/recycle.json";

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
            marginLeft: "42%",
            marginTop: "-14px",
          }}
        >
          <Lottie
            animationData={Recycle}
            loop={true}
            style={{ width: "65px", height: "65px" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "36%",
            marginBottom: "2%",
            color: "green",
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
            #GoGreen
          </Typography>
        </div>
      </div>
    </>
  );
}

export default LandingIntro;

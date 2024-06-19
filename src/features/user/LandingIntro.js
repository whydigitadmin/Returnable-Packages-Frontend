import Lottie from "lottie-react";
import LoginLottieFile from "../../pages/LoginLottie.json";
import TemplatePointers from "./components/TemplatePointers";

function LandingIntro() {
  return (
    <>
      <div
        className="hero min-h-full rounded-l-xl"
        style={{ backgroundColor: "#ffffff", borderRight: "1px dashed grey" }}
      >
        <div className="hero-content py-12">
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

            {/* Importing pointers component */}
          </div>
        </div>
        <TemplatePointers />
      </div>
    </>
  );
}

export default LandingIntro;

import TemplatePointers from "./components/TemplatePointers";

function LandingIntro() {
  return (
    <>
      <div className="hero min-h-full rounded-l-xl bg-base-200">
        <div className="hero-content py-12">
          <div className="max-w-md">
            <div className="text-center mb-2">
              <img
                src="./binbee.png"
                alt="Dashwind Admin Template"
                className="w-48 inline-block"
              ></img>
            </div>
            <h1 className="text-3xl text-center font-bold mb-10">
              Returnable Packages
            </h1>
            <div className="d-flex float-right">Powered by Whydigit</div>
            {/* Importing pointers component */}
            <TemplatePointers />
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingIntro;

import { dashboardSAV, profilePhoto } from "../../assets";
import { Link } from "react-router-dom";

const SAV = () => {
  return (
    <div className="bg-primary">
      <div className="h-[60px] w-full flex flex-row gap-[80px] items-centers p-2">
        <div>volver</div>
      </div>
      <div className="relative w-full">
        <div className="absolute z-10">
          <h1 className="text-white text-[60px]">Smart Asset vinte</h1>
        </div>
        <div className=" z-0">
          {/* <img src={dashboardSAV} alt="dashboard-sav" className="h-[100px]" /> */}
        </div>
      </div>
    </div>
  );
};
export default SAV;

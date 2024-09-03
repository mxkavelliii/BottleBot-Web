import { React, useState } from "react";

//icons
import { FiSearch } from "react-icons/fi";
import { CgShoppingBag } from "react-icons/cg";

const Navbar = () => {
  const [home, setHome] = useState(false);

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center bg-[#fdfdff] font-inter border-b border-gray-300">
        <div className="w-3/6 bg-[#fdfdff] flex flex-row justify-between items-center">
          <div className="px-4 py-3">
            <p className="text-xs font-semibold">B</p>
          </div>
          <div className="px-4 py-3 flex flex-row gap-8 items-center justify-center">
            <p
              className="text-xs font-normal cursor-pointer"
              onMouseEnter={() => setHome(true)}
              onMouseLeave={() => setHome(false)}
            >
              Home
            </p>
            <p className="text-xs font-normal cursor-pointer">Robot</p>
            <p className="text-xs font-normal cursor-pointer">Profile</p>
            <p className="text-xs font-normal cursor-pointer">Support</p>
            <FiSearch className="text-sm cursor-pointer" />
            <CgShoppingBag className="text-sm cursor-pointer" />
          </div>
        </div>

        <div className="w-3/6 bg-[#fdfdff] flex flex-row justify-between items-center">
          <div className="px-4 py-3">
            <p className="text-lg font-semibold">Bottle Bot</p>
          </div>
          <div className="px-4 py-3 flex flex-row gap-8 items-center justify-center">
            <p className="text-xs font-normal cursor-pointer">Download App</p>
            <p className="text-xs font-normal cursor-pointer">
              Location History
            </p>
            <p className="text-xs font-normal cursor-pointer">
              Redemption History
            </p>

            <div className="px-4 py-1 bg-[#303030] hover:bg-[#414141] ease-in-out duration-500 text-white rounded-full cursor-pointer">
              <p className="text-xs font-normal ">Map</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

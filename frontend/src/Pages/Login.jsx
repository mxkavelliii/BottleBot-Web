import { React, useState } from "react";
import { Link } from "react-router-dom";

//icons
import { RiUser4Line, RiKeyLine } from "react-icons/ri";
import { IoShieldHalf } from "react-icons/io5";
import { BsCheck } from "react-icons/bs";

const Login = () => {
  const [rmbr, setRmbr] = useState(false);

  const toggleRmbr = () => {
    setRmbr(!rmbr);
    console.log(rmbr);
  };

  return (
    <div className="h-[100svh] w-full flex items-center justify-center bg-login bg-cover bg-center font-inter">
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-black/90 via-gray-400/60 to-black/40">
        <div className="flex flex-col items-center justify-center bg-[#fdfdff] py-3 px-6 bg- border-[#222326] rounded-xl shadow-xl">
          <div className="flex flex-col items-center justify-center w-full py-4">
            <p className="text-sm font-bold">Welcome Back</p>
            <p className="text-xs font-semibold text-black/50">
              Please enter your details to login.
            </p>
          </div>
          <div className="w-full flex flex-col gap-4 items-center justify-center py-4">
            {/* username input */}
            <div className="w-full flex flex-col items-start justify-center gap-1">
              <p className="text-xs font-semibold text-black/50">Email</p>
              <div className="w-full flex flex-row gap-1 items-center justify-center rounded-md overflow-hidden bg-[#eae3ff] focus:border border-black py-2">
                <div className="px-2 w-full border-r border-gray-400/75">
                  <RiUser4Line className="text-sm text-black" />
                </div>
                <input
                  type="text"
                  className="bg-[#eae3ff] text-xs outline-none min-w-[200px] px-2 truncate"
                  placeholder="@email.com"
                />
              </div>
            </div>
            {/* password */}
            <div className="w-full flex flex-col items-start justify-center gap-1">
              <p className="text-xs font-semibold text-black/50">Password</p>
              <div className="w-full flex flex-row gap-1 items-center justify-center rounded-md overflow-hidden bg-[#eae3ff] focus:border border-black py-2">
                <div className="px-2 w-full border-r border-gray-400/75">
                  <IoShieldHalf className="text-sm text-black" />
                </div>
                <input
                  type="password"
                  className="bg-[#eae3ff] text-xs outline-none min-w-[200px] px-2"
                  placeholder="•••••••••••"
                />
              </div>
            </div>
          </div>
          {/* remember me toggle */}
          <div className="py-2 w-full flex flex-row gap-2 items-center justify-start">
            <div
              className={
                !rmbr
                  ? "bg-[#303030] rounded-sm"
                  : "p-1 border-2 border-[#303030] rounded-sm"
              }
              onClick={toggleRmbr}
            >
              {!rmbr ? <BsCheck className="text-white text-xs" /> : null}
            </div>
            <p className="text-xs font-normal">Remember me</p>
          </div>
          {/* login button */}
          <div className="w-full flex items-center justify-center py-4">
            <Link
              to="/home"
              className="w-full py-2 bg-[#303030] rounded-md flex items-center justify-center cursor-pointer hover:bg-[#414141] ease-in-out duration-500"
            >
              <p className="text-xs font-semibold text-white">Login.</p>
            </Link>
          </div>
          <div className="w-full flex flex-row gap-2 items-center justify-center">
            <div className="w-full border-t border-gray-400"></div>
            <p className="text-xs font-semibold text-black">or</p>
            <div className="w-full border-t border-gray-400"></div>
          </div>
          <div className="flex flex-row items-center justify-center gap-1 py-4">
            <p className="text-xs font-semibold text-black/50">
              Don't have an account?
            </p>
            <p className="text-xs font-semibold text-black cursor-pointer">
              Register
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

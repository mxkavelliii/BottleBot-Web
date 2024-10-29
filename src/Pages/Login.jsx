import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../assets/Bottle_Bot.png";
import PopupModal from "../Components/PopupModal";
import { useAuth } from "../context/AuthProvider";
import Bg from "../assets/Leaves.jpg";

//icons
import { FiMail, FiLock } from "react-icons/fi";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [popupModal, setPopupModal] = useState(false);
  const [message, setMessage] = useState("");
  const { setIsAuthenticated, setToken, setUser } = useAuth();
  const navigate = useNavigate();

  const onLogin = async () => {
    try {
      let url = "http://localhost:8080/api/auth/login";

      let response = await axios.post(url, {
        email: email,
        password: password,
      });

      if (response.data.success === true) {
        if (
          response.data.user.credentials.level === "admin" ||
          response.data.user.credentials.level === "staff"
        ) {
          navigate("/admin/dashboard");
          setIsAuthenticated(true);
          setToken(response.data.token);
          setUser(response.data.user);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("token", response.data.token);
        } else {
          console.log(response.data.user.credentials.level);
          setPopupModal(true);
          setMessage("For Admin and Staffs Only");
        }
      }
    } catch (error) {
      setPopupModal(true);
      setIsAuthenticated(false);
      setMessage(error.response.data.message || "An Error Occurred");
    }
  };

  return (
    <>
      <div
        className="w-full h-[100svh] flex items-center justify-center font-dm"
        style={{
          backgroundImage: `url(${Bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-[#1f1f1f]/90 to-[#1f1f1f]/50">
          <div className="=flex flex-col w-[300px] space-y-8 items-center justify-center bg-[#F6F6F6] p-4 rounded-3xl shadow-xl shadow-black/10 tracking-normal">
            <div className="w-full flex flex-col items-center justify-center space-y-2">
              <div className="flex items-center justify-center">
                <img src={Logo} alt="/" className="w-[100px] h-[100px]" />
              </div>
              <div className="w-full flex flex-col items-center justify-center">
                <p className="text-sm font-semibold truncate tracking-tight">
                  Login to your Account
                </p>
                <p className="text-[10px] text-black/50 font-normal truncate">
                  Welcome back, please enter your credentials
                </p>
              </div>
            </div>
            <div className="w-full flex flex-col items-center justify-center space-y-3">
              <div className="w-full flex flex-col space-y-2 items-start justify-center">
                <p className="text-xs font-semibold text-black">
                  Email Address
                </p>
                <div className="w-full flex flex-row justify-between gap-x-3 px-4 py-3 bg-[#E6E6E6] rounded-xl">
                  <FiMail size={16} color="#525252" />
                  <input
                    type="text"
                    className="text-xs font-normal outline-none border-none bg-[#E6E6E6] w-full"
                    placeholder="enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full flex flex-col space-y-2 items-start justify-center">
                <p className="text-xs font-semibold text-black">Password</p>
                <div className="w-full flex flex-row justify-between gap-x-3 px-4 py-3 bg-[#E6E6E6] rounded-xl">
                  <FiLock size={16} color="#525252" />
                  <input
                    type="password"
                    className="text-xs font-normal outline-none border-none bg-[#E6E6E6] w-full"
                    placeholder="enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col items-center justify-center space-y-3 ">
              <div className="w-full flex flex-row items-center justify-end px-2">
                <p className="text-[10px] font-normal cursor-pointer tracking-tight">
                  Forgot Password
                </p>
              </div>
              <div
                className="w-full flex items-center justify-center bg-gradient-to-tr from-[#466600] to-[#699900] py-3 rounded-xl cursor-pointer hover:bg-[#444444] duration-500"
                onClick={onLogin}
              >
                <p className="text-xs font-semibold text-white">Login</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {popupModal && (
        <PopupModal
          onClose={() => setPopupModal(false)}
          message={message}
          icon="login"
          header="authorization"
        />
      )}
    </>
  );
};

export default Login;

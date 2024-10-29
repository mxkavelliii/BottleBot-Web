import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

//icons
import {
  FiHome,
  FiMonitor,
  FiShoppingBag,
  FiCalendar,
  FiUsers,
  FiUser,
} from "react-icons/fi";
import {
  RiHome3Line,
  RiHome3Fill,
  RiMacbookLine,
  RiMacbookFill,
  RiShoppingBagLine,
  RiShoppingBagFill,
  RiCalendarEventLine,
  RiCalendarEventFill,
  RiUserSmileLine,
  RiUserSmileFill,
  RiUser4Line,
  RiUser4Fill,
} from "react-icons/ri";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;

    if (currentPath.includes("/dashboard")) {
      setActiveTab("dashboard");
    } else if (currentPath.includes("/monitor")) {
      setActiveTab("monitor");
    } else if (currentPath.includes("/redeem")) {
      setActiveTab("redeem");
    } else if (currentPath.includes("/history")) {
      setActiveTab("history");
    } else if (currentPath.includes("/users")) {
      setActiveTab("users");
    } else if (currentPath.includes("/profile")) {
      setActiveTab("profile");
    }
  }, [location]);

  return (
    <>
      <div className="fixed md:left-0 left-1/2 transform -translate-x-1/2 md:translate-x-0 bottom-0 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:h-auto flex md:items-center justify-center p-4 z-10">
        <div className="flex flex-row md:flex-col items-center justify-center rounded-xl bg-[#FAFAFA] p-2 shadow-xl shadow-black/20 space-x-1 md:space-x-0 md:space-y-1">
          <div
            className="p-2 flex items-center justify-center cursor-pointer rounded-full"
            onClick={() => navigate("/admin/dashboard")}
          >
            {activeTab === "dashboard" ? (
              <RiHome3Fill size={20} color="#699900" />
            ) : (
              <RiHome3Line size={20} color="#699900" />
            )}
          </div>
          <div
            className="p-2 flex items-center justify-center cursor-pointer rounded-full"
            onClick={() => setActiveTab("monitor")}
          >
            {activeTab === "monitor" ? (
              <RiMacbookFill size={20} color="#699900" />
            ) : (
              <RiMacbookLine size={20} color="#699900" />
            )}
          </div>
          <div
            className="p-2 flex items-center justify-center cursor-pointer rounded-full"
            onClick={() => navigate("/admin/redeem")}
          >
            {activeTab === "redeem" ? (
              <RiShoppingBagFill size={20} color="#699900" />
            ) : (
              <RiShoppingBagLine size={20} color="#699900" />
            )}
          </div>
          <div
            className="p-2 flex items-center justify-center cursor-pointer rounded-full"
            onClick={() => navigate("/admin/history")}
          >
            {activeTab === "history" ? (
              <RiCalendarEventFill size={20} color="#699900" />
            ) : (
              <RiCalendarEventLine size={20} color="#699900" />
            )}
          </div>
          <div
            className="p-2 flex items-center justify-center cursor-pointer rounded-full"
            onClick={() => navigate("/admin/users")}
          >
            {activeTab === "users" ? (
              <RiUserSmileFill size={20} color="#699900" />
            ) : (
              <RiUserSmileLine size={20} color="#699900" />
            )}
          </div>
          <div
            className="p-2 flex items-center justify-center cursor-pointer rounded-full"
            onClick={() => {
              navigate("/admin/profile");
            }}
          >
            {activeTab === "profile" ? (
              <RiUser4Fill size={20} color="#699900" />
            ) : (
              <RiUser4Line size={20} color="#699900" />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

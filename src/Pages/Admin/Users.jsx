import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Admin/Navbar";
import { useAuth } from "../../context/AuthProvider";
import Image from "../../assets/Man.jpg";
import Logo from "../../assets/Bottle_Bot.png";
import axios from "axios";
import PopupModal from "../../Components/PopupModal";
import { useUsers } from "../../context/UsersProvider";
import UsersForm from "../../Components/Admin/Users/UsersForm";

//icons
import {
  RiDoorOpenLine,
  RiSearch2Line,
  RiRefreshLine,
  RiUserSmileLine,
  RiEdit2Line,
  RiDeleteBin4Line,
  RiAddLine,
} from "react-icons/ri";

const Users = () => {
  const { onLogout, updateUser, user } = useAuth();
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [visibleModal, setVisibleModal] = useState(false);
  const [isError, setIsError] = useState(false);
  const { users, setUsers, roles, getUsers, filterUsers } = useUsers();
  const [userSearch, setUserSearch] = useState("");
  const [searchType, setSearchType] = useState("All");

  //showing form
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState("add");
  const [selectedUser, setSelectedUser] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getUsers();
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleSearchType = () => {
    setLoading(true);
    try {
      const newType =
        searchType === "All"
          ? "admin"
          : searchType === "admin"
          ? "staff"
          : searchType === "staff"
          ? "citizen"
          : "All";
      setSearchType(newType);

      filterUsers(newType, userSearch);
    } catch (error) {
      console.log(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (event) => {
    const text = event.target.value;
    setUserSearch(text);
    setLoading(true);

    try {
      if (text.trim() === "") {
        setUserSearch("");
        setSearchType("All");
        await getUsers();
      } else {
        await filterUsers(searchType, text);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const clearSearchFilter = async () => {
    setUserSearch("");
    setSearchType("All");
    await getUsers();
  };

  const deleteUser = async (userId) => {
    setLoading(true);
    try {
      let url = `http://localhost:8080/api/users/${userId}`;
      let response = await axios.delete(url);

      if (response.status === 200) {
        setMessage(response.data.message);
        setVisibleModal(true);
        clearSearchFilter();
      } else {
        setMessage(response.data.message);
        setVisibleModal(true);
        setIsError(false);
      }
    } catch (error) {
      setMessage(error.response.data.message);
      setVisibleModal(true);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full min-h-[100svh] flex flex-col space-y-6 items-center justify-start bg-[#E6E6E6] px-4 pt-4 pb-6 font-dm tracking-normal">
        <div className="w-full md:w-[820px] flex flex-row justify-between items-center">
          <div className="flex flex-row space-x-2 items-center justify-center">
            <div className="flex items-center justify-center bg-[#FAFAFA] rounded-xl p-1 shadow-xl shadow-black/10">
              <img
                src={Logo}
                alt="/"
                className="w-[30px] h-[30px] rounded-full"
              />
            </div>
            <p className="text-xs font-normal">
              {user
                ? `Welcome, ${user.personalInfo.firstName} ${user.personalInfo.lastName}`
                : null}
            </p>
          </div>
          <div className="flex flex-row space-x-4 items-center justify-center px-2">
            <RiDoorOpenLine
              size={16}
              color="rgba(0, 0, 0, 0.5)"
              className="cursor-pointer"
              onClick={onLogout}
            />
            <img
              src={Image}
              alt="/"
              className="w-[30px] h-[30px] rounded-full"
            />
          </div>
        </div>
        <div className="w-full md:w-[820px] flex flex-row justify-between items-center rounded-full overflow-hidden bg-[#FAFAFA] font-dm pl-6 pr-2 py-2 shadow-xl shadow-black/5">
          <div className="w-2/3 flex flex-row items-center justify-start gap-4">
            <RiSearch2Line size={16} color="black" />
            <input
              type="text"
              className="w-full outline-none border-none text-xs font-normal bg-[#FAFAFA] truncate"
              placeholder="search for users"
              value={userSearch}
              onChange={handleSearch}
            />
          </div>
          <div className="flex flex-row gap-4 items-center justify-between bg-[#050301] rounded-full px-3 py-1.5">
            <p className="text-xs font-normal text-white">{searchType}</p>
            <RiRefreshLine
              size={16}
              color="white"
              className="cursor-pointer"
              onClick={handleSearchType}
            />
          </div>
        </div>
        <div className="w-full md:w-[820px] flex flex-col justify-between items-center font-dm">
          <div className="w-full flex flex-row items-start justify-start gap-x-3">
            <div
              className="p-2 flex items-center justify-center rounded-full bg-[#050301] cursor-pointer"
              onClick={() => {
                setFormType("add");
                setShowForm(true);
              }}
            >
              <RiAddLine size={16} color="white" />
            </div>
            <div className="w-2/3 flex flex-col items-start justify-center pb-6">
              <p className="text-sm font-semibold">Manage Users</p>
              <p className="text-xs font-normal text-[#6E6E6E]">
                Add, Delete, View or Edit users
              </p>
            </div>
          </div>
          <div
            className={`${
              users.length > 0
                ? "w-full grid grid-cols md:grid-cols-3 gap-4"
                : "w-full flex flex-col items-center justify-center"
            }`}
          >
            {users.length > 0 ? (
              users.map((user) => (
                <div
                  className="w-full flex flex-col items-center justify-center bg-[#FAFAFA] rounded-xl overflow-hidden"
                  key={user._id}
                >
                  <div
                    className="w-full flex flex-row items-center justify-between px-6 pt-4 pb-32"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right top, #e9ff00, #d9f700, #c9f000, #b9e800, #aae000, #78d846, #47cc68, #00bf81, #00a4a2, #17849e, #51657b, #4e4e4e)",
                      backgroundSize: "cover",
                    }}
                  >
                    <div className="w-1/2 flex items-center justify-start">
                      <p className="text-xs font-normal uppercase text-white">
                        {user.credentials.level}
                      </p>
                    </div>
                    <div className="flex flex-row items-center space-x-2 justify-start px-3 py-2 rounded-full bg-[#050301]/25">
                      <RiEdit2Line
                        size={16}
                        color="white"
                        className="cursor-pointer"
                        onClick={() => {
                          setFormType("edit");
                          setShowForm(true);
                          setSelectedUser(user);
                        }}
                      />
                      <RiDeleteBin4Line
                        size={16}
                        color="white"
                        className="cursor-pointer"
                        onClick={() => deleteUser(user._id)}
                      />
                    </div>
                  </div>
                  <div className="w-full flex flex-row items-center justify-start space-x-3 px-6 py-4">
                    <img
                      src={Image}
                      alt="/"
                      className="w-[40px] h-[40px] rounded-full"
                    />
                    <div className="w-3/4 flex flex-col items-start justify-center">
                      <p className="text-xs font-semibold w-full truncate">{`${user.personalInfo.firstName} ${user.personalInfo.lastName}`}</p>
                      <p className="text-xs font-normal text-[#6E6E6E] w-full truncate uppercase">
                        #{user._id}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full flex flex-col items-center justify-center space-y-4">
                <div className="flex p-4 rounded-full bg-gradient-to-tr from-[#466600] to-[#699900]">
                  <RiUserSmileLine size={40} color="white" />
                </div>
                <p className="text-xs font-normal">No Users Found</p>
              </div>
            )}
          </div>
        </div>
        <div className="w-full md:w-[820px] flex flex-col justify-between items-center font-dm pb-24"></div>
      </div>
      {visibleModal && (
        <PopupModal
          icon="users"
          message={message}
          header="users"
          onClose={() => {
            setVisibleModal(false);
            clearSearchFilter();
          }}
        />
      )}
      {showForm && (
        <UsersForm
          formType={formType}
          data={selectedUser}
          onClose={() => {
            setShowForm(false);
            clearSearchFilter();
          }}
        />
      )}
    </>
  );
};

export default Users;

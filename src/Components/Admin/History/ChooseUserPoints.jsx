import React, { useEffect, useState } from "react";
import {
  RiArrowRightSLine,
  RiCalendarEventLine,
  RiCheckLine,
  RiCloseLine,
  RiDeleteBin4Line,
  RiEdit2Line,
  RiShoppingBagLine,
  RiUserSmileLine,
} from "react-icons/ri";
import { useRewards } from "../../../context/RewardsProvider";
import axios from "axios";
import { useUsers } from "../../../context/UsersProvider";
import Image from "../../../assets/Man.jpg";
import PopupModal from "../../PopupModal";
import PointsHistoryForm from "./PointsHistoryForm";

const ChooseUserPoints = ({ onClose, formType, data, reward }) => {
  const [userPoints, setUserPoints] = useState({});
  const { users, setUsers, roles, getUsers, filterUsers } = useUsers();
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  //functions
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);

  const fetchPointsForAllUsers = async () => {
    setLoading(true);
    try {
      const pointsPromises = users.map(async (user) => {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/history/claim/points/${user._id}`
          );
          return {
            userId: user._id,
            points: response.data.availablePoints.availablePoints,
          };
        } catch (error) {
          console.error(`Error fetching points for user ${user._id}`, error);
          return { userId: user._id, points: 0 };
        }
      });

      const results = await Promise.all(pointsPromises);

      const pointsData = results.reduce(
        (acc, { userId, points }) => ({ ...acc, [userId]: points }),
        {}
      );

      setUserPoints(pointsData);
    } catch (error) {
      console.error("Error fetching points for users", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      await getUsers();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      fetchPointsForAllUsers();
    }
  }, [users]);

  const getUserPoints = (userId) => {
    return userPoints[userId] !== undefined ? userPoints[userId] : 0;
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-[100svh] flex items-center justify-center overflow-hidden bg-[#050301]/50 z-10 font-dm">
        <div className="w-full h-full flex items-start justify-center overflow-y-auto p-4">
          <div className="w-full md:w-[620px] flex flex-col justify-between items-center space-y-6 bg-[#FAFAFA] font-dm rounded-2xl p-6">
            {/* header */}
            <div className="w-full flex flex-row items-center justify-between pb-6">
              <div className="flex flex-row items-center justify-start w-2/3">
                <p className="text-xs font-normal truncate">{`History > ${
                  formType === "add"
                    ? "Add History"
                    : formType === "edit"
                    ? `Edit History > #${data._id.toUpperCase()}`
                    : null
                }`}</p>
              </div>
              <div className="flex flex-row items-center justify-center space-x-2">
                <div
                  className="flex items-center justify-center p-2 rounded-full bg-[#EDEDED] cursor-pointer"
                  onClick={onClose}
                >
                  <RiCloseLine size={16} color="black" />
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col items-center justify-center space-y-4">
              {/* header */}
              <div className="w-full flex flex-col items-start justify-center pb-2">
                <p className="text-sm font-semibold">Select User</p>
                <p className="text-xs font-normal text-[#6E6E6E]">
                  select a user to proceed
                </p>
              </div>
              {/* content */}
              <div className="w-full grid grid-cols md:grid-cols-2 gap-4">
                {users.map((user) => (
                  <div
                    className="w-full flex items-center justify-between bg-[#EDEDED] rounded-xl px-4 py-3"
                    key={user._id}
                  >
                    <div className="w-3/4 flex flex-row items-center justify-start space-x-3">
                      <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
                        <img src={Image} alt="/" />
                      </div>
                      <div className="w-2/3 flex flex-col items-start justify-center">
                        <p className="text-xs font-semibold w-full truncate">{`${user.personalInfo.firstName} ${user.personalInfo.lastName}`}</p>
                        <p className="text-xs font-normal uppercase text-[#6E6E6E] w-full truncate">
                          {`${getUserPoints(user._id)} ${
                            getUserPoints(user._id) > 1 ? "pts." : "pt."
                          }`}
                        </p>
                      </div>
                    </div>
                    <div
                      className="p-2 rounded-full cursor-pointer bg-gradient-to-tr from-[#466600] to-[#699900]"
                      onClick={() => {
                        setSelectedUser(user);
                        setShowForm(true);
                      }}
                    >
                      <RiArrowRightSLine size={16} color="white" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showForm && (
        <PointsHistoryForm
          onClose={() => {
            setShowForm(false);
            onClose();
          }}
          data={data}
          user={selectedUser}
          formType={formType}
        />
      )}
      {visibleModal && (
        <PopupModal
          icon="redeem"
          header="redeem"
          message={message}
          onClose={() => {
            setVisibleModal(false);
            if (!isError) {
              onClose();
            }
          }}
        />
      )}
    </>
  );
};

export default ChooseUserPoints;

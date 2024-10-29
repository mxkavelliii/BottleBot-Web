import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../Components/Staff/Navbar";
import Image from "../../assets/Man.jpg";
import Logo from "../../assets/Bottle_Bot.png";
import {
  RiAddLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiCalendarEventLine,
  RiDeleteBin4Line,
  RiDoorOpenLine,
  RiEdit2Line,
  RiRefreshLine,
  RiSearch2Line,
  RiUserSmileLine,
} from "react-icons/ri";
import PopupModal from "../../Components/PopupModal";
import RewardsHistoryForm from "../../Components/Admin/History/RewardsHistoryForm";
import ChooseUserPoints from "../../Components/Admin/History/ChooseUserPoints";

//providers
import { useAuth } from "../../context/AuthProvider";
import { useHistory } from "../../context/HistoryProvider";
import axios from "axios";

const History = () => {
  const rewardsRef = useRef(null);
  const pointsRef = useRef(null);
  const { onLogout, updateUser, user } = useAuth();
  const {
    pointsHistory,
    rewardsHistory,
    fetchAllPointsHistory,
    fetchAllRewardsHistory,
    searchRewardHistory,
    searchPointHistory,
    fetchAllHistory,
  } = useHistory();
  const [userSearch, setUserSearch] = useState("");
  const [searchType, setSearchType] = useState(false);
  const [rewards, setRewards] = useState([]);
  const [formType, setFormType] = useState("add");
  const [showRewardForm, setShowRewardForm] = useState(false);
  const [showPointsForm, setShowPointsForm] = useState(false);
  const [selectedRewardHistory, setSelectedRewardHistory] = useState(null);
  const [selectedPointHistory, setSelectedPointHistory] = useState(null);

  //functions
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);

  const handleSearch = async (event) => {
    const text = event.target.value;
    setUserSearch(text);
    setLoading(true);

    try {
      if (text.trim() === "") {
        await fetchAllPointsHistory();
        await fetchAllRewardsHistory();
      } else {
        if (searchType) {
          await searchRewardHistory(text);
        } else {
          await searchPointHistory(text);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchType = async () => {
    setLoading(true);

    try {
      setSearchType(!searchType);

      if (searchType) {
        await fetchAllRewardsHistory();
        await searchPointHistory(userSearch);
      } else {
        await fetchAllPointsHistory();
        await searchRewardHistory(userSearch);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRewards = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/rewards`);
      setRewards(response.data.rewards);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRewards();
    fetchAllHistory();
  }, []);

  const scrollRewardsLeft = () => {
    if (rewardsRef.current) {
      rewardsRef.current.scrollBy({
        left: -320,
        behavior: "smooth",
      });
    }
  };

  const scrollPointsLeft = () => {
    if (pointsRef.current) {
      pointsRef.current.scrollBy({
        left: -320,
        behavior: "smooth",
      });
    }
  };

  const scrollRewardsRight = () => {
    if (rewardsRef.current) {
      rewardsRef.current.scrollBy({
        left: 320,
        behavior: "smooth",
      });
    }
  };

  const scrollPointsRight = () => {
    if (pointsRef.current) {
      pointsRef.current.scrollBy({
        left: 320,
        behavior: "smooth",
      });
    }
  };

  const deleteRewardHistory = async (historyId) => {
    setLoading(true);
    try {
      let url = `http://localhost:8080/api/history/claim/${historyId}`;

      let response = await axios.delete(url);

      if (response.status === 200) {
        setMessage(response.data.message);
        setVisibleModal(true);
        await fetchAllRewardsHistory();
        setUserSearch("");
      }
    } catch (error) {
      setMessage(error.response.data.message);
      setVisibleModal(true);
    } finally {
      setLoading(false);
    }
  };

  const deletePointHistory = async (historyId) => {
    setLoading(true);

    try {
      let url = `http://localhost:8080/api/history/dispose/${historyId}`;

      let response = await axios.delete(url);

      if (response.status === 200) {
        setMessage(response.data.message);
        setVisibleModal(true);
        await fetchAllPointsHistory();
        setUserSearch("");
      }
    } catch (error) {
      setMessage(error.response.data.message);
      setVisibleModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full min-h-[100svh] flex flex-col space-y-6 items-center justify-start bg-[#E6E6E6] px-4 pt-4 pb-6 font-dm tracking-normal overflow-x-hidden">
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
          <div className="flex flex-row gap-4 items-center justify-between bg-[#050301] rounded-full px-4 py-1.5">
            <p className="text-xs font-normal text-white capitalize">
              {searchType ? "rewards" : "points"}
            </p>
            <RiRefreshLine
              size={16}
              color="white"
              className="cursor-pointer"
              onClick={handleSearchType}
            />
          </div>
        </div>
        <div className="w-full md:w-[820px] flex flex-col justify-between items-center font-dm">
          <div className="w-full flex flex-row items-start justify-start space-x-2">
            <div
              className="p-2 flex items-center justify-center rounded-full bg-[#050301] cursor-pointer"
              onClick={() => {
                setShowRewardForm(true);
                setFormType("add");
              }}
            >
              <RiAddLine size={16} color="white" />
            </div>
            <div className="w-1/2 flex flex-col items-start justify-center pb-6">
              <p className="text-sm font-semibold">Rewards History</p>
              <p className="text-xs font-normal text-[#6E6E6E]">
                history of all reward claims
              </p>
            </div>
          </div>
          <div className="w-full relative flex flex-row items-center justify-center group">
            <div
              className="w-full flex flex-row items-center justify-start overflow-x-auto gap-4 scrollbar-hide "
              ref={rewardsRef}
            >
              {rewardsHistory.length > 0 ? (
                rewardsHistory.map((rewardHistory) => {
                  const reward = rewards.find(
                    (reward) => reward._id === rewardHistory.rewardId
                  );
                  return (
                    <div
                      className="min-w-[300px] max-w-[300px] flex flex-col items-center justify-center bg-[#FAFAFA] rounded-xl overflow-hidden"
                      key={rewardHistory._id}
                    >
                      <div
                        className="w-full bg-center bg-cover flex flex-row items-center justify-between"
                        style={{
                          backgroundImage: reward
                            ? `url(http://localhost:8080/api/images/${reward.image})`
                            : `url("../../assets/images/borgar.jpg")`,
                        }}
                      >
                        <div className="w-full h-full flex flex-row items-center justify-between px-6 pt-4 pb-32 bg-gradient-to-tr from-[#050301]/75 to-[#050301]/10">
                          <div className="w-1/2 flex items-center justify-start">
                            <p className="text-xs font-normal uppercase text-white truncate">
                              {reward ? reward.rewardName : "Reward Not Found"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="w-full flex flex-row items-center justify-start space-x-3 px-6 py-4">
                        <img
                          src={Image}
                          alt="/"
                          className="w-[40px] h-[40px] rounded-full"
                        />
                        <div className="w-3/4 flex flex-col items-start justify-center">
                          <p className="text-xs font-semibold w-full truncate">
                            {`${rewardHistory.userInfo.personalInfo.firstName} ${rewardHistory.userInfo.personalInfo.lastName}`}
                          </p>
                          <p className="text-xs font-normal text-[#6E6E6E] w-full truncate uppercase">
                            {(() => {
                              const date = new Date(rewardHistory.dateClaimed);
                              return isNaN(date.getTime())
                                ? "Invalid Date"
                                : date.toLocaleDateString("en-US");
                            })()}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="w-full flex flex-col items-center justify-center space-y-4">
                  <div className="flex p-4 rounded-full bg-gradient-to-tr from-[#466600] to-[#699900]">
                    <RiCalendarEventLine size={40} color="white" />
                  </div>
                  <p className="text-xs font-normal">No History Found</p>
                </div>
              )}
            </div>
            <div
              className="absolute left-[-100%] p-2 rounded-full bg-[#EDEDED] cursor-pointer shadow-xl shadow-black/25 group-hover:left-[-2%] duration-200"
              onClick={scrollRewardsLeft}
            >
              <RiArrowLeftSLine size={16} color="black" />
            </div>
            <div
              className="absolute right-[-100%] p-2 rounded-full bg-[#EDEDED] cursor-pointer shadow-xl shadow-black/25 group-hover:right-[-2%] duration-200"
              onClick={scrollRewardsRight}
            >
              <RiArrowRightSLine size={16} color="black" />
            </div>
          </div>
        </div>
        <div className="w-full md:w-[820px] flex flex-col justify-between items-center font-dm">
          <div className="w-full flex flex-row items-start justify-start space-x-2">
            <div className="w-1/2 flex flex-col items-start justify-center pb-6">
              <p className="text-sm font-semibold">Points History</p>
              <p className="text-xs font-normal text-[#6E6E6E]">
                history of all acquired points
              </p>
            </div>
          </div>
          <div className="w-full relative flex flex-row items-center justify-center group">
            <div
              className="w-full flex flex-row items-center justify-start overflow-x-auto gap-4 scrollbar-hide "
              ref={pointsRef}
            >
              {pointsHistory.length > 0 ? (
                pointsHistory.map((pointHistory) => (
                  <div
                    className="min-w-[300px] max-w-[300px] flex flex-col items-center justify-center bg-[#FAFAFA] rounded-xl overflow-hidden"
                    key={pointHistory._id}
                  >
                    <div
                      className="w-full bg-center bg-cover flex flex-row items-center justify-between"
                      style={{ backgroundImage: `url(${Image})` }}
                    >
                      <div className="w-full h-full flex flex-row items-center justify-between px-6 pt-4 pb-32 bg-gradient-to-tr from-[#050301]/75 to-[#050301]/10">
                        <div className="w-1/2 flex items-center justify-start">
                          <p className="text-xs font-normal uppercase text-white truncate">
                            {`${pointHistory.pointsAccumulated} ${
                              pointHistory.pointsAccumulated > 1
                                ? "pts."
                                : "pt."
                            }`}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex flex-row items-center justify-start space-x-3 px-6 py-4">
                      <img
                        src={Image}
                        alt="/"
                        className="w-[40px] h-[40px] rounded-full"
                      />
                      <div className="w-3/4 flex flex-col items-start justify-center">
                        <p className="text-xs font-semibold w-full truncate">
                          {`${pointHistory.userInfo.personalInfo.firstName} ${pointHistory.userInfo.personalInfo.lastName}`}
                        </p>
                        <p className="text-xs font-normal text-[#6E6E6E] w-full truncate uppercase">
                          {(() => {
                            const date = new Date(pointHistory.dateDisposed);
                            return isNaN(date.getTime())
                              ? "Invalid Date"
                              : date.toLocaleDateString("en-US");
                          })()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full flex flex-col items-center justify-center space-y-4">
                  <div className="flex p-4 rounded-full bg-gradient-to-tr from-[#466600] to-[#699900]">
                    <RiCalendarEventLine size={40} color="white" />
                  </div>
                  <p className="text-xs font-normal">No History Found</p>
                </div>
              )}
            </div>
            <div
              className="absolute left-[-100%] p-2 rounded-full bg-[#EDEDED] cursor-pointer shadow-xl shadow-black/25 group-hover:left-[-2%] duration-200"
              onClick={scrollPointsLeft}
            >
              <RiArrowLeftSLine size={16} color="black" />
            </div>
            <div
              className="absolute right-[-100%] p-2 rounded-full bg-[#EDEDED] cursor-pointer shadow-xl shadow-black/25 group-hover:right-[-2%] duration-200"
              onClick={scrollPointsRight}
            >
              <RiArrowRightSLine size={16} color="black" />
            </div>
          </div>
        </div>
        <div className="w-full pb-24"></div>
      </div>
      {showPointsForm && (
        <ChooseUserPoints
          formType={formType}
          onClose={() => {
            setShowPointsForm(false);
            fetchAllHistory();
          }}
          data={selectedPointHistory}
        />
      )}
      {showRewardForm && (
        <RewardsHistoryForm
          onClose={() => {
            setShowRewardForm(false);
            fetchAllHistory();
          }}
          formType={formType}
          data={selectedRewardHistory}
        />
      )}
      {visibleModal && (
        <PopupModal
          icon="history"
          message={message}
          header="history"
          onClose={() => {
            setVisibleModal(false);
            fetchAllHistory();
          }}
        />
      )}
    </>
  );
};

export default History;

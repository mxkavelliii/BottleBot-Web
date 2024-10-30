import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../Components/Staff/Navbar";
import Image from "../../assets/Man.jpg";
import Logo from "../../assets/Bottle_Bot.png";
import {
  RiAddLine,
  RiArrowRightSLine,
  RiCloseLine,
  RiDeleteBin4Line,
  RiDoorOpenLine,
  RiEdit2Line,
  RiUserSmileLine,
} from "react-icons/ri";
import PopupModal from "../../Components/PopupModal";
import RewardsForm from "../../Components/Admin/Redeem/RewardsForm";
import CheckoutForm from "../../Components/Admin/Redeem/CheckoutForm";

//providers
import { useAuth } from "../../context/AuthProvider";
import axios from "axios";
import { useRewards } from "../../context/RewardsProvider";
import { useHistory } from "../../context/HistoryProvider";

const Redeem = () => {
  const { onLogout, updateUser, user } = useAuth();
  const { rewards, categories, fetchRewards, filterRewards } = useRewards();
  const [filter, setFilter] = useState("All");
  const [filtered, setFiltered] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState("add");
  const [selectedReward, setSelectedReward] = useState(null);
  const [checkoutForm, setCheckoutForm] = useState(false);
  const { fetchAllHistory } = useHistory();

  //functions
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      await fetchRewards();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteReward = async (rewardId) => {
    setLoading(true);

    try {
      let url = `http://localhost:8080/api/rewards/${rewardId}`;

      let response = await axios.delete(url);

      if (response.status === 200) {
        setVisibleModal(true);
        setIsError(false);
        setMessage(response.data.message);
      }
    } catch (error) {
      setVisibleModal(true);
      setMessage(error.response.data.message);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async (category) => {
    if (category === filter) {
      setFilter("All");
      setFiltered(false);
      await filterRewards("All");
    } else {
      setFilter(category);
      setFiltered(true);
      await filterRewards(category);
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
        <div className="w-full md:w-[820px] flex flex-col justify-between items-center space-y-6 font-dm">
          <div className="w-full flex flex-row items-center justify-start space-x-2">
            <div
              className="p-2 bg-[#050301] rounded-full cursor-pointer"
              onClick={() => {
                setShowForm(true);
                setFormType("add");
              }}
            >
              <RiAddLine size={16} color="white" />
            </div>
            <div className="w-1/2 flex flex-col items-start justify-center">
              <p className="text-sm font-semibold">Redeemable Items</p>
              <p className="text-xs font-normal text-[#6E6E6E]">
                select items to redeem
              </p>
            </div>
          </div>
          <div className="w-full flex flex-row overflow-x-auto scrollbar-hide space-x-2">
            {categories.map((category) => (
              <div
                className={`${
                  filter === category
                    ? "flex px-4 py-2 bg-gradient-to-tr from-[#466600] to-[#699900] rounded-full cursor-pointer"
                    : "flex px-4 py-2 bg-[#FAFAFA] rounded-full cursor-pointer"
                }`}
                key={category}
                onClick={() => handleFilter(category)}
              >
                <p
                  className={`${
                    filter === category
                      ? "text-xs font-normal text-white"
                      : "text-xs font-normal text-black"
                  }`}
                >
                  {category}
                </p>
              </div>
            ))}
          </div>
          <div
            className={`${
              rewards.length > 0
                ? "w-full grid grid-cols md:grid-cols-3 gap-4"
                : "w-full flex flex-col items-center justify-center"
            }`}
          >
            {rewards.length > 0 ? (
              rewards.map((reward) => (
                <div
                  className="w-full flex flex-col items-center justify-center bg-[#FAFAFA] rounded-xl overflow-hidden"
                  key={reward._id}
                >
                  <div
                    className="w-full flex bg-cover bg-center flex-row items-center justify-between"
                    style={{
                      backgroundImage: reward.image
                        ? `url(http://localhost:8080/api/images/${reward.image})`
                        : `url(${Image})`,
                    }}
                  >
                    <div className="w-full h-full flex flex-row items-center justify-between px-6 pt-4 pb-32 bg-gradient-to-tr from-[#050301]/75 to-[#050301]/10">
                      <div className="w-1/2 flex items-center justify-start">
                        <p className="text-xs font-normal uppercase text-white truncate">
                          #{reward._id}
                        </p>
                      </div>

                      <div className="flex flex-row items-center space-x-2 justify-start px-3 py-2 rounded-full bg-[#050301]/25">
                        <RiEdit2Line
                          size={16}
                          color="white"
                          className="cursor-pointer"
                          onClick={() => {
                            setShowForm(true);
                            setSelectedReward(reward);
                            setFormType("edit");
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex flex-row items-center justify-between space-x-2 px-6 py-4">
                    <div className="w-3/4 flex flex-row space-x-2 items-center justify-normal">
                      <div className="w-full flex flex-col items-start justify-center">
                        <p className="text-xs font-semibold w-full truncate">
                          {reward.rewardName}
                        </p>
                        <p className="text-xs font-normal text-[#6E6E6E] w-full truncate uppercase">
                          {`${reward.pointsRequired} ${
                            reward.pointsRequired > 1 ? "pts." : "pt."
                          }`}
                        </p>
                      </div>
                    </div>
                    <div
                      className="p-2 rounded-full bg-gradient-to-tr from-[#466600] to-[#699900] cursor-pointer"
                      onClick={() => {
                        setSelectedReward(reward);
                        setCheckoutForm(true);
                      }}
                    >
                      <RiArrowRightSLine size={16} color="white" />
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
        <div className="w-full pb-24"></div>
      </div>
      {showForm && (
        <RewardsForm
          formType={formType}
          onClose={() => setShowForm(false)}
          data={selectedReward}
        />
      )}
      {checkoutForm && (
        <CheckoutForm
          onClose={() => {
            setCheckoutForm(false);
            fetchRewards();
            fetchAllHistory();
            setFilter("All");
            setFiltered(false);
          }}
          data={selectedReward}
        />
      )}
      {visibleModal && (
        <PopupModal
          icon="redeem"
          message={message}
          header="redeem"
          onClose={() => {
            setVisibleModal(false);
            fetchData();
          }}
        />
      )}
    </>
  );
};

export default Redeem;

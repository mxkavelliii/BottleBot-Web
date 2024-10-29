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
import ChooseUserReward from "./ChooseUserReward";

const RewardsHistoryForm = ({ onClose, formType, data }) => {
  const { rewards, categories, fetchRewards, filterRewards } = useRewards();
  const [filter, setFilter] = useState("All");
  const [filtered, setFiltered] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);
  const [showForm, setShowForm] = useState(false);

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
      <div className="fixed top-0 left-0 w-full h-[100svh] flex items-center justify-center overflow-hidden bg-[#050301]/50 z-10 font-dm">
        <div className="w-full h-full flex flex-col items-center justify-start overflow-y-auto p-4">
          <div className="w-full md:w-[620px] flex flex-col justify-between items-center space-y-6 bg-[#FAFAFA] font-dm rounded-2xl p-6">
            {/* header */}
            <div className="w-full flex flex-row items-center justify-between pb-6">
              <div className="flex flex-row items-center justify-start w-2/3">
                <p className="text-xs font-normal truncate">{`History > ${
                  formType === "add"
                    ? "Add History "
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
            <div className="w-full flex flex-row items-center justify-start space-x-2">
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
                      : "flex px-4 py-2 bg-[#EDEDED] rounded-full cursor-pointer"
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
                  ? "w-full grid grid-cols md:grid-cols-2 gap-4"
                  : "w-full flex flex-col items-center justify-center"
              }`}
            >
              {rewards.length > 0 ? (
                rewards.map((reward) => (
                  <div
                    className="w-full flex items-center justify-between bg-[#EDEDED] rounded-xl px-4 py-3"
                    key={reward._id}
                  >
                    <div className="w-3/4 flex flex-row items-center justify-start space-x-3">
                      <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
                        <img
                          src={`http://192.168.254.139:8080/api/images/${reward.image}`}
                          alt=""
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="w-2/3 flex flex-col items-start justify-center">
                        <p className="text-xs font-semibold truncate">
                          {reward.rewardName}
                        </p>
                        <p className="text-xs font-normal uppercase text-[#6E6E6E] truncate">
                          {reward.pointsRequired} pt., {reward.stocks} avail.
                        </p>
                      </div>
                    </div>
                    <div
                      className="p-2 rounded-full cursor-pointer bg-gradient-to-tr from-[#466600] to-[#699900]"
                      onClick={() => {
                        setSelectedReward(reward);
                        setShowForm(true);
                      }}
                    >
                      <RiArrowRightSLine size={16} color="white" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full flex flex-col items-center justify-center space-y-4">
                  <div className="flex p-4 rounded-full bg-gradient-to-tr from-[#466600] to-[#699900]">
                    <RiShoppingBagLine size={40} color="white" />
                  </div>
                  <p className="text-xs font-normal">No Rewards Found</p>
                </div>
              )}
            </div>
          </div>
          <div className="w-full pb-24"></div>
        </div>
      </div>
      {showForm && (
        <ChooseUserReward
          formType={formType}
          data={data}
          reward={selectedReward}
          onClose={() => {
            onClose();
            setShowForm(false);
          }}
        />
      )}
    </>
  );
};

export default RewardsHistoryForm;

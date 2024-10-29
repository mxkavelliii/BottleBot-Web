import React, { useEffect, useRef, useState } from "react";
import {
  RiAddLine,
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiCheckLine,
  RiCloseLine,
  RiRefreshLine,
} from "react-icons/ri";
import PopupModal from "../../PopupModal";
import { useRewards } from "../../../context/RewardsProvider";
import { useHistory } from "../../../context/HistoryProvider";
import axios from "axios";

const RewardsForm = ({ formType, onClose, data }) => {
  const { rewards, fetchRewards, filterRewards } = useRewards();
  const {
    pointsHistory,
    rewardsHistory,
    fetchAllPointsHistory,
    fetchAllRewardsHistory,
    searchRewardHistory,
    searchPointHistory,
    fetchAllHistory,
  } = useHistory();

  //Data
  const [rewardName, setRewardName] = useState("");
  const [pointsRequired, setPointsRequired] = useState("");
  const [rewardDescription, setRewardDescription] = useState("");
  const [category, setCategory] = useState("Goods");
  const [stocks, setStocks] = useState("");
  const [image, setImage] = useState(null);
  const [imageChanged, setImageChanged] = useState(false);
  const [rewardImageString, setRewardImageString] = useState("");

  //function
  const [openCategories, setOpenCategories] = useState(false);
  const categories = ["Goods", "Clothing", "Beverage", "Other"];
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [isError, setIsError] = useState(false);
  const fileInputRef = useRef(null);

  const fetchReward = async () => {
    setLoading(true);
    try {
      let url = `http://localhost:8080/api/rewards/${data._id}`;

      let response = await axios.get(url);

      if (response.status === 200) {
        setRewardImageString(response.data.reward.image);
        setCategory(response.data.reward.category);
        setPointsRequired(response.data.reward.pointsRequired);
        setRewardDescription(response.data.reward.rewardDescription);
        setRewardName(response.data.reward.rewardName);
        setStocks(response.data.reward.stocks);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (formType === "edit") {
      fetchReward();
    }
  }, []);

  const pickImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const addReward = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("rewardName", rewardName);
    formData.append("rewardDescription", rewardDescription);
    formData.append("pointsRequired", pointsRequired.toString());
    formData.append("stocks", stocks.toString());
    formData.append("category", category);
    if (image) {
      formData.append("image", image); // Directly append the file object
    }

    try {
      const url = `http://localhost:8080/api/rewards/`;

      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setIsError(false);
        setVisibleModal(true);
        setMessage(response.data.message);
      }
    } catch (error) {
      setVisibleModal(true);
      setIsError(true);
      setMessage(error.response?.data?.message || "Error uploading reward");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateReward = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("rewardName", rewardName);
    formData.append("rewardDescription", rewardDescription);
    formData.append("pointsRequired", pointsRequired.toString());
    formData.append("stocks", stocks.toString());
    formData.append("category", category);
    if (image) {
      formData.append("image", image);
    }

    formData.append("imageChanged", image ? "true" : "false");
    if (image) {
      formData.append("prevImageString", rewardImageString);
    }

    try {
      const url = `http://localhost:8080/api/rewards/${data._id}`;

      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setIsError(false);
        setVisibleModal(true);
        setMessage(response.data.message);
      }
    } catch (error) {
      setVisibleModal(true);
      setIsError(true);
      setMessage(error.response?.data?.message || "Error updating reward");
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-[100svh] flex items-center justify-center overflow-hidden bg-[#050301]/50 z-10">
        <div className="w-full h-full flex items-start justify-center overflow-y-auto p-4">
          <div className="w-full md:w-[620px] flex flex-col justify-between items-center space-y-6 bg-[#FAFAFA] font-dm rounded-2xl p-6">
            {/* header */}
            <div className="w-full flex flex-row items-center justify-between pb-6">
              <div className="flex flex-row items-center justify-start">
                <p className="text-xs font-normal">{`Redeem > ${
                  formType === "add"
                    ? "Add Reward"
                    : `Edit Reward > ${data.rewardName}`
                }`}</p>
              </div>
              <div className="flex flex-row items-center justify-center space-x-2">
                <div
                  className="flex items-center justify-center p-2 rounded-full bg-[#EDEDED] cursor-pointer"
                  onClick={onClose}
                >
                  <RiCloseLine size={16} color="black" />
                </div>
                <div
                  className="flex items-center justify-center p-2 rounded-full bg-[#EDEDED] cursor-pointer"
                  onClick={() => {
                    formType === "add"
                      ? addReward()
                      : formType === "edit"
                      ? updateReward()
                      : null;
                  }}
                >
                  <RiCheckLine size={16} color="black" />
                </div>
              </div>
            </div>
            <div className="w-full flex items-center justify-center">
              <div className="h-[120px] w-[120px] rounded-full bg-[#EDEDED] relative">
                <div className="w-full h-full overflow-hidden rounded-full">
                  {image ? (
                    <img
                      src={URL.createObjectURL(image)}
                      alt="New Reward"
                      className="object-cover object-center w-full h-full"
                    />
                  ) : (
                    rewardImageString && (
                      <img
                        src={`http://localhost:8080/api/images/${rewardImageString}`}
                        alt="Existing Reward"
                        className="object-cover object-center w-full h-full"
                      />
                    )
                  )}
                </div>
                <div
                  className="absolute bottom-0 right-1 flex p-2 rounded-xl bg-gradient-to-tr from-[#466600] to-[#699900] cursor-pointer"
                  onClick={handleImageClick}
                >
                  <RiAddLine size={16} color="white" />
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={pickImage}
                  />
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col items-center justify-center space-y-4">
              {/* header */}
              <div className="w-full flex flex-col items-start justify-center pb-2">
                <p className="text-sm font-semibold">Reward Information</p>
                <p className="text-xs font-normal text-[#6E6E6E]">
                  fill all fields to proceed
                </p>
              </div>
              {/* content */}
              <div className="w-full flex flex-row items-center justify-between">
                <div className="w-1/2">
                  <p className="text-xs font-normal">Reward Name</p>
                </div>
                <input
                  type="text"
                  className="w-1/2 text-left bg-[#EDEDED] outline-none border-none rounded-xl px-4 py-3 text-xs"
                  placeholder="reward name"
                  value={rewardName}
                  onChange={(e) => setRewardName(e.target.value)}
                />
              </div>
              <div className="w-full flex flex-row items-center justify-between">
                <div className="w-1/2">
                  <p className="text-xs font-normal">Points Required</p>
                </div>
                <input
                  type="text"
                  className="w-1/2 text-left bg-[#EDEDED] outline-none border-none rounded-xl px-4 py-3 text-xs"
                  placeholder="points required"
                  value={pointsRequired}
                  onChange={(e) =>
                    setPointsRequired(e.target.value.replace(/[^0-9]/g, ""))
                  }
                />
              </div>
              <div className="w-full flex flex-row items-center justify-between">
                <div className="w-1/2">
                  <p className="text-xs font-normal">Reward Description</p>
                </div>
                <input
                  type="text"
                  className="w-1/2 text-left bg-[#EDEDED] outline-none border-none rounded-xl px-4 py-3 text-xs"
                  placeholder="reward description"
                  value={rewardDescription}
                  onChange={(e) => setRewardDescription(e.target.value)}
                />
              </div>
              <div className="w-full flex flex-row items-center justify-between">
                <div className="w-1/2">
                  <p className="text-xs font-normal">Stocks</p>
                </div>
                <input
                  type="text"
                  className="w-1/2 text-left bg-[#EDEDED] outline-none border-none rounded-xl px-4 py-3 text-xs"
                  placeholder="stocks"
                  value={stocks}
                  onChange={(e) =>
                    setStocks(e.target.value.replace(/[^0-9]/g, ""))
                  }
                />
              </div>
              <div className="w-full flex flex-row items-center justify-between">
                <div className="w-1/2">
                  <p className="text-xs font-normal">Category</p>
                </div>
                <div className="w-1/2 relative flex flex-col items-center justify-center">
                  <div className="w-full flex flex-row items-center justify-between px-4 py-3 rounded-xl bg-[#EDEDED]">
                    <p className="text-xs font-normal">{category}</p>
                    {openCategories ? (
                      <RiArrowUpSLine
                        size={16}
                        color="black"
                        className="cursor-pointer"
                        onClick={() => setOpenCategories(!openCategories)}
                      />
                    ) : (
                      <RiArrowDownSLine
                        size={16}
                        color="black"
                        className="cursor-pointer"
                        onClick={() => setOpenCategories(!openCategories)}
                      />
                    )}
                  </div>
                  {openCategories ? (
                    <div className="absolute left-0 top-[120%] w-full flex flex-col items-center justify-center px-4 py-3 rounded-xl bg-[#EDEDED] space-y-2">
                      {categories.map((category) => (
                        <div
                          className="w-full flex items-center justify-center"
                          key={category}
                        >
                          <p
                            className="text-xs font-normal cursor-pointer"
                            onClick={() => {
                              setCategory(category);
                              setOpenCategories(false);
                            }}
                          >
                            {category}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {visibleModal && (
        <PopupModal
          icon="redeem"
          header="redeem"
          message={message}
          onClose={() => {
            setVisibleModal(false);

            if (!isError) {
              fetchRewards();
              fetchAllHistory();
              onClose();
            }
          }}
        />
      )}
    </>
  );
};

export default RewardsForm;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { RiAddLine, RiCheckLine, RiCloseLine } from "react-icons/ri";
import PopupModal from "../../PopupModal";

const PointsHistoryForm = ({ formType, onClose, data, user }) => {
  const [bottleCount, setBottleCount] = useState("");
  const [pointsAccumulated, setPointsAccumulated] = useState("");

  //functions
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);

  useEffect(() => {
    if (formType === "edit") {
      setBottleCount(data.bottleCount);
      setPointsAccumulated(data.pointsAccumulated);
    }
  }, []);

  const addPointsHistory = async () => {
    setLoading(true);
    try {
      let url = `http://localhost:8080/api/history/dispose`;

      let response = await axios.post(url, {
        userId: user?._id,
        bottleCount: bottleCount,
        pointsAccumulated: pointsAccumulated,
      });

      if (response.status === 200) {
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

  const updatePointHistory = async () => {
    setLoading(true);
    try {
      let url = `http://localhost:8080/api/history/dispose/${data._id}`;

      let response = await axios.put(url, {
        userId: user._id,
        bottleCount: bottleCount,
        pointsAccumulated: pointsAccumulated,
      });

      if (response.status === 200) {
        setMessage(response.data.message);
        setIsError(false);
        setVisibleModal(true);
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
      <div className="fixed top-0 left-0 w-full h-[100svh] flex items-center justify-center overflow-hidden bg-[#050301]/50 z-10 font-dm">
        <div className="w-full h-full flex flex-col items-center justify-start overflow-y-auto p-4">
          <div className="w-full md:w-[620px] flex flex-col justify-between items-center space-y-6 bg-[#FAFAFA] font-dm rounded-2xl p-6">
            {/* header */}
            <div className="w-full flex flex-row items-center justify-between pb-6">
              <div className="flex flex-row items-center justify-start w-2/3">
                <p className="text-xs font-normal truncate">{`History > ${
                  formType === "add"
                    ? "Add History > Points Form"
                    : formType === "edit"
                    ? `Edit History > #${data._id.toUpperCase()} > Points Form`
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
                <div
                  className="flex items-center justify-center p-2 rounded-full bg-[#EDEDED] cursor-pointer"
                  onClick={() => {
                    formType === "add"
                      ? addPointsHistory()
                      : formType === "edit"
                      ? updatePointHistory()
                      : null;
                  }}
                >
                  <RiCheckLine size={16} color="black" />
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col items-start justify-center space-y-4">
              <div className="w-full flex flex-col items-start justify-center pb-2">
                <p className="text-sm font-semibold">Points Form</p>
                <p className="text-xs font-normal text-[#6E6E6E]">
                  fill all required fields to proceed
                </p>
              </div>
              <div className="w-full flex flex-row items-center justify-between">
                <div className="w-1/2">
                  <p className="text-xs font-normal">Bottle Count</p>
                </div>
                <input
                  type="text"
                  className="w-1/2 text-left bg-[#EDEDED] outline-none border-none rounded-xl px-4 py-3 text-xs"
                  placeholder="bottle count"
                  value={bottleCount}
                  onChange={(e) =>
                    setBottleCount(e.target.value.replace(/\D/g, ""))
                  }
                />
              </div>
              <div className="w-full flex flex-row items-center justify-between">
                <div className="w-1/2">
                  <p className="text-xs font-normal">Points Accumulated</p>
                </div>
                <input
                  type="text"
                  className="w-1/2 text-left bg-[#EDEDED] outline-none border-none rounded-xl px-4 py-3 text-xs"
                  placeholder="points earned"
                  value={pointsAccumulated}
                  onChange={(e) =>
                    setPointsAccumulated(e.target.value.replace(/\D/g, ""))
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {visibleModal && (
        <PopupModal
          icon="history"
          header="history"
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

export default PointsHistoryForm;

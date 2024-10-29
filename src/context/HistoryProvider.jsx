import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const HistoryContext = createContext(null);

export const HistoryProvider = ({ children }) => {
  const [rewardsHistory, setRewardsHistory] = useState([]);
  const [pointsHistory, setPointsHistory] = useState([]);

  const fetchAllRewardsHistory = async () => {
    try {
      let url = `http://localhost:8080/api/history/claim`;

      let response = await axios.get(url);

      if (response.status === 200) {
        setRewardsHistory(response.data.allusersrewardclaimhistory);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAllPointsHistory = async () => {
    try {
      let url = `http://localhost:8080/api/history/dispose`;

      let response = await axios.get(url);

      if (response.status === 200) {
        setPointsHistory(response.data.allusersdisposalhistory);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllHistory = async () => {
    try {
      await fetchAllRewardsHistory();
      await fetchAllPointsHistory();
    } catch (error) {
      console.log(error);
    }
  };

  const searchRewardHistory = async (user) => {
    try {
      let url = `http://localhost:8080/api/history/claim?userName=${user}`;

      let response = await axios.get(url);

      if (response.status === 200) {
        setRewardsHistory(response.data.allusersrewardclaimhistory);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const searchPointHistory = async (user) => {
    try {
      let url = `http://localhost:8080/api/history/dispose?userName=${user}`;

      let response = await axios.get(url);

      if (response.status === 200) {
        setPointsHistory(response.data.allusersdisposalhistory);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <HistoryContext.Provider
      value={{
        fetchAllRewardsHistory,
        fetchAllPointsHistory,
        rewardsHistory,
        pointsHistory,
        searchRewardHistory,
        searchPointHistory,
        fetchAllHistory,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => useContext(HistoryContext);

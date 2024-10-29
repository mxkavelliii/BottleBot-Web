import React, { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

const RewardsContext = createContext(null);

export const RewardsProvider = ({ children }) => {
  const [rewards, setRewards] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchRewards = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/rewards`);
      setRewards(response.data.rewards);
      setCategories(
        Array.from(
          new Set(response.data.rewards.map((reward) => reward.category))
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRewardQty = async () => {};

  const filterRewards = async (category) => {
    try {
      if (category === "All") {
        fetchRewards();
      } else {
        let url = `http://localhost:8080/api/rewards?category=${category}`;

        let response = await axios.get(url);

        if (response.status === 200) {
          setRewards(response.data.rewards);
        } else {
          console.log(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <RewardsContext.Provider
      value={{ rewards, categories, fetchRewards, filterRewards }}
    >
      {children}
    </RewardsContext.Provider>
  );
};

export const useRewards = () => useContext(RewardsContext);

import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const UsersContext = createContext(null);

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  const getUsers = async () => {
    try {
      let url = `http://localhost:8080/api/users/`;
      let response = await axios.get(url);

      if (response.status === 200) {
        setUsers(response.data.users);
        setRoles(
          Array.from(
            new Set(response.data.users.map((user) => user.credentials.level))
          )
        );
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filterUsers = async (role, user) => {
    try {
      let url = `http://localhost:8080/api/users?`;

      if (role !== "All") {
        url += `level=${role}`;
      }

      if (user !== "") {
        url += `${role !== "All" ? "&" : ""}userName=${user}`;
      }

      let response = await axios.get(url);

      if (response.status === 200) {
        setUsers(response.data.users);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UsersContext.Provider
      value={{ users, setUsers, roles, getUsers, filterUsers }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => useContext(UsersContext);

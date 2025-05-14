import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const useUserOperations = (user) => {
  const [users, setUsers] = useState([]);

  //GET
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/users/users/", {
          withCredentials: true,
        });
        setUsers(response.data);
      } catch (err) {
        setUsers([]);
        toast.error(`Failed to fetch users: ${err.message}`);
      }
    };
    fetchUsers();
  }, []);

  const handleAddUser = async (newUserData) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/users/users/create/",
        newUserData
      );
      setUsers([...users, response.data]);
      toast.success("User added successfully!");
    } catch (error) {
      console.error("Failed to add user:", error);
      toast.error("Failed to add user. Please try again.");
    }
  };

  const handleSave = async (updatedUserData, selectedUser) => {
    const originalUser = { ...selectedUser }; //rollback
    const updatedUser = { ...selectedUser, ...updatedUserData };

    setUsers(
      users.map((u) =>
        u.account_id === selectedUser.account_id ? updatedUser : u
      )
    );

    try {
      const payload = {};
      if (
        updatedUserData.username &&
        updatedUserData.username !== selectedUser.username
      ) {
        payload.username = updatedUserData.username;
      }
      if (updatedUserData.password) {
        payload.password = updatedUserData.password;
      }

      const response = await axios.patch(
        `http://127.0.0.1:8000/users/users/${selectedUser.account_id}/`,
        payload
      );

      setUsers(
        users.map((u) =>
          u.account_id === selectedUser.account_id ? response.data : u
        )
      );

      toast.success("User updated successfully!", { autoClose: 1300 });
    } catch (error) {
      toast.error(
        "Failed to update user or the username is similar to other user(s). Please try again."
      );
      setUsers(
        users.map((u) =>
          u.account_id === selectedUser.account_id ? originalUser : u
        )
      );
    }
  };

  return {
    users,
    setUsers,
    handleAddUser,
    handleSave,
  };
};

export default useUserOperations;

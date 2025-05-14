import React from "react";
import { User, Pen, Plus, Search } from "lucide-react";
import EditUserModal from "./EditUserModal";
import AddUserModal from "./AddUserModal";
import "react-toastify/dist/ReactToastify.css";
import "../styles.css";
import { useAuth } from "../context/AuthContext";
import useModalState from "../hooks/user/useModalState";
import useSearchAndPagination from "../hooks/user/useSearchAndPagination";
import useUserOperations from "../hooks/user/useUserOperations";

function UserTable() {
  const { user } = useAuth();
  const { users, setUsers, handleAddUser, handleSave } =
    useUserOperations(user);

  const filteredUsers = users.filter((u) => u.account_id !== user.account_id);

  const { isModalOpen, setIsModalOpen, selectedUser, setSelectedUser } =
    useModalState();

  const {
    searchQuery,
    setSearchQuery,
    handleInputSearch,
    currentPage,
    totalPages,
    paginatedItems: paginatedUsers,
    handlePreviousPage,
    handleNextPage,
  } = useSearchAndPagination(filteredUsers);

  return (
    <>
      <div
        className="relative overflow-x-auto shadow-md sm:rounded-lg"
        onClick={() => setSearchQuery("")}
      >
        <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white">
          <div className="relative pt-5 pl-5 transition-all ease-in-out duration-700 animate-fadeIn">
            <div className="absolute inset-y-0 top-5 left-5 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-gray-500" />
            </div>
            <input
              type="text"
              id="table-search-users"
              value={searchQuery}
              onChange={handleInputSearch}
              className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-white"
              placeholder="Search for users"
            />
          </div>
          <div className="relative pt-5 pl-5 pr-9 transition-all ease-in-out duration-700 animate-fadeIn">
            <button
              onClick={() => {
                setSelectedUser(null);
                setIsModalOpen(true);
              }}
              className="border border-gray-400 rounded-lg w-30 p-2 flex items-center justify-center shadow font-semibold bg-teal-700 text-white hover:bg-teal-800 hover:text-white cursor-pointer"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add User
            </button>
          </div>
        </div>

        <table className="w-full text-sm text-left rtl:text-right text-gray-500 transform transition-all ease-in duration-700 opacity-0 animate-fadeIn">
          <thead className="text-sm text-gray-700 uppercase bg-white">
            <tr className="border-b border-t border-gray-200 bg-gray-200">
              <th scope="col" className="px-6 py-3">
                Account ID
              </th>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                User Level
              </th>
              <th scope="col" className="px-10 py-3 text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => (
                <tr
                  key={user.account_id}
                  className="bg-white border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="px-6 py-4 text-black">{user.account_id}</td>
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
                  >
                    <User className="w-5 h-5 rounded-full" />
                    <div className="ps-3">
                      <div className="text-base font-semibold">
                        {user.username}
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4 text-black">{user.user_level}</td>
                  <td className="px-10 py-4 flex items-center justify-end">
                    <Pen className="w-5 h-5 text-teal-700 mr-1" />
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setIsModalOpen(true);
                      }}
                      className="font-medium text-teal-700 hover:underline cursor-pointer"
                    >
                      Edit user
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="transition-all ease-in-out duration-300">
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {users.length > 7 && (
          <div className="flex items-center justify-center gap-4 p-5">
            <button
              className="px-3 py-1 bg-teal-700 text-white rounded disabled:opacity-50 cursor-pointer hover:bg-teal-800"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {totalPages === 0 ? 1 : currentPage} of{" "}
              {totalPages === 0 ? 1 : totalPages}
            </span>
            <button
              className="px-3 py-1 rounded bg-teal-700 text-white disabled:opacity-50 cursor-pointer hover:bg-teal-800"
              onClick={handleNextPage}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              Next
            </button>
          </div>
        )}

        <EditUserModal
          user={selectedUser}
          isOpen={isModalOpen && !!selectedUser}
          onClose={() => setIsModalOpen(false)}
          onSave={(updatedUserData) =>
            handleSave(updatedUserData, selectedUser)
          }
        />

        <AddUserModal
          isOpen={isModalOpen && !selectedUser}
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddUser}
        />
      </div>
    </>
  );
}

export default UserTable;

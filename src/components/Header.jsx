import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";
import { User, Edit, LogOut, X } from "lucide-react";
import LogoutModal from "./LogoutModal";
import EditUserModal from "./EditUserModal";
import useUserOperations from "../hooks/user/useUserOperations";

const Header = () => {
  const location = useLocation();
  const { user, setUser } = useAuth();
  const { handleSave } = useUserOperations(user);
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [headerUser, setHeaderUser] = useState(user);

  useEffect(() => {
    setHeaderUser(user);
  }, [user]);

  const handleEditSave = async (updatedData) => {
    await handleSave(updatedData, user);

    const updatedUser = {
      ...user,
      ...updatedData,
      username: updatedData.username || user.username,
    };
    setHeaderUser(updatedUser);
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setIsEditModalOpen(false);
  };

  const getHeaderName = () => {
    switch (location.pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/users":
        return "Manage User";
      case "/announcements":
        return "Manage Announcement";
      case "/map":
        return "Manage Map";
      case "/feedback":
        return "Manage Feedback";
      case "/report":
        return "Generate Report";
      default:
        return "Dashboard";
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log("Current user in Header:", user?.username, user?.user_level);

  return (
    <>
      <header className="bg-white dark:bg-teal-800 p-6 shadow-md flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          {getHeaderName()}
        </h1>

        {user && (
          <div className="relative flex items-center justify-end gap-1">
            <User className="w-4 h-4 text-white" />
            <button
              className="text-white cursor-pointer hover:border-b-2 border-white focus:outline-none"
              onClick={() => setIsOptionsModalOpen(!isOptionsModalOpen)}
            >
              {user?.username || "User"}, {user?.user_level}
            </button>

            {/* Options Modal */}
            {isOptionsModalOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 animate-fadeIn">
                <div className="py-1">
                  {/* Edit */}
                  <div className="flex justify-center items-center px-4 gap-1 hover:bg-teal-50 hover:text-teal-900 focus:outline-none focus:bg-teal-50 cursor-pointer">
                    <Edit className="w-4 h-4" />
                    <button
                      onClick={() => {
                        setIsEditModalOpen(true);
                        setIsOptionsModalOpen(false);
                      }}
                      className="block w-full text-left py-2 text-sm text-gray-700 cursor-pointer"
                    >
                      Edit Profile
                    </button>
                  </div>

                  {/* Logout */}
                  <div className="flex justify-center items-center px-4 gap-1 hover:bg-teal-50 hover:text-teal-900 focus:outline-none focus:bg-teal-50 cursor-pointer">
                    <LogOut className="w-4 h-4" />
                    <button
                      onClick={() => {
                        setIsModalOpen(true);
                        setIsOptionsModalOpen(false);
                      }}
                      className="block w-full text-left py-2 text-sm text-gray-700 cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>

                  <div className="flex justify-center items-center px-4 gap-1 hover:bg-teal-50 hover:text-teal-900 focus:outline-none focus:bg-teal-50 cursor-pointer">
                    <X className="w-4 h-4" />
                    <button
                      onClick={() => setIsOptionsModalOpen(false)}
                      className="block w-full text-left py-2 text-sm text-gray-700 cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <EditUserModal
          user={headerUser}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={(data) => {
            handleEditSave(data);
          }}
        />
      )}

      <LogoutModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Header;

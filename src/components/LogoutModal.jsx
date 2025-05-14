import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import { LogOut } from "lucide-react";

export default function LogoutModal({ isOpen, onClose }) {
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();

  if (!isOpen) return null;

  const handleLogout = async () => {
    try {
      await logout();
      onClose();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto shadow">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20">
        {/* Overlay */}
        <div className="fixed inset-0 bg-black opacity-25 transition-opacity"></div>

        {/* Modal Content */}
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-auto">
          <div className="p-10 text-center">
            <h1>Are you sure you want to log out?</h1>
          </div>

          {/* Buttons */}
          <div className=" flex justify-center space-x-3 border-t border-gray-200 p-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer"
            >
              Cancel
            </button>
            <Link to="/">
              <button
                type="submit"
                onClick={handleLogout}
                className="flex justify-between items-center gap-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:dark:bg-red-700 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Logout"
                )}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { X } from "lucide-react";
import QRCode from "react-qr-code";

export default function QrModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto shadow">
      <div className="fixed inset-0 bg-black opacity-25 transition-opacity"></div>
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20">
        {/* Modal Content */}
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-auto transition-all ease-in-out duration-700 animate-fadeIn">
          <div className="flex px-6 py-4 border-b border-gray-200 gap-10 items-center justify-between bg-teal-700">
            <h2 className="text-lg font-semibold text-white">QR Code</h2>
            <button
              onClick={onClose}
              className="text-white text-2xl hover:text-gray-600"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex justify-center items-center">
            <QRCode value="http://192.168.0.213:5173/feedbackform" size={200} className="m-5" />
          </div>
        </div>
      </div>
    </div>
  );
}

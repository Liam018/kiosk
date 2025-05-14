import React from "react";
import logo from "../assets/logo.png";
import qranimation from "../assets/scanner.mp4";
import QRCode from "react-qr-code";
function UserFeedbackItems() {
  return (
    <div className="p-4">
      {/* Header with Logo and School Name */}
      <div className="flex items-center justify-start mb-4">
        <img src={logo} alt="School Logo" className="w-15 h-15 mr-4" />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Castor Z. Concepcion Memorial National High School
          </h1>
          <p className="text-lg text-yellow-400 font-semibold">FEEDBACK</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center md:flex-row transition-all ease-in-out duration-700 animate-fadeIn">
        <div className="flex flex-col items-center justify-center pt-10">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-3xl font-semibold text-teal-800 mb-4">
              QR Code for Feedback Form
            </h2>
          </div>
          <div className="flex shadow">
            <video width="400" loop autoPlay>
              <source src={qranimation} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="flex justify-center items-center bg-white pr-10">
              <QRCode
                value="http://192.168.0.213:5173/feedbackform/"
                title="Scan"
                size={200}
                className="m-5"
              />
            </div>
          </div>
          <p className="text-center font-semibold text-md mt-4">
            Scan the QR code to access the feedback form. Your feedback is
            important to us!
            <br />
            <br />
            <span className="text-lg text-teal-800 font-bold">
              Thank you for your feedback!
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserFeedbackItems;

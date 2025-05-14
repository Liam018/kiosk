import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import logo from "../assets/logo.png";
import background from "../assets/school-bg.png";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { User, Lock, LogIn } from "lucide-react";

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!credentials.username || !credentials.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const success = await login(credentials);
      if (success) {
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-screen h-screen bg-cover bg-no-repeat bg-center flex flex-col items-center justify-center p-1"
      style={{
        backgroundImage: `linear-gradient(rgba(69, 69, 69, 0.9), rgba(69, 69, 69, 0.9)), url(${background})`,
      }}
    >
      <div className="p-8 w-full max-w-md">
        <div
          className="flex justify-center items-center pb-4 animate-fadeIn"
          style={{ animationDelay: "0.1s" }}
        >
          <img
            src={logo}
            alt="Logo"
            className="w-25 h-25 object-contain rounded-full border-2 border-white bg-white"
          />
        </div>

        <h2
          className="text-white text-2xl font-bold text-center mb-1 animate-fadeIn"
          style={{ animationDelay: "0.2s" }}
        >
          INTERACTIVE CAMPUS KIOSK
        </h2>
        <p
          className="text-white text-2xl font-bold text-center mb-6 animate-fadeIn"
          style={{ animationDelay: "0.3s" }}
        >
          WITH FEEDBACK MANAGEMENT SYSTEM
        </p>

        <div
          className="flex justify-center mb-8 border-b-2 border-gray-300 mx-40 gap-20 animate-fadeIn"
          style={{ animationDelay: "0.4s" }}
        >
          <h1 className="text-teal-500 font-bold">LOGIN</h1>
        </div>

        <form
          className="space-y-4 animate-fadeIn"
          style={{ animationDelay: "0.4s" }}
          onSubmit={handleSubmit}
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <User className="h-5 w-5 text-white" />
            </div>
            <input
              type="text"
              name="username"
              onChange={handleChange}
              className="w-full pl-10 px-3 py-2 text-white border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder:text-white"
              placeholder="Enter Username/ID"
            />
          </div>

          <div className="relative mt-4">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Lock className="h-5 w-5 text-white" />
            </div>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              className="w-full pl-10 px-3 py-2 text-white border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-transparent placeholder:text-white"
              placeholder="Enter Password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 bg-teal-600 text-white py-2 px-4 rounded-md transition-all duration-300 ease-in-out hover:bg-teal-700 cursor-pointer ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            <LogIn className="h-5 w-5"/>
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
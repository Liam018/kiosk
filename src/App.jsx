import { Routes, Route, Navigate, useLocation } from "react-router";
import Dashboard from "./pages/Dashboard";
import ManageUser from "./pages/ManageUser";
import ManageAnnouncement from "./pages/ManageAnnouncement";
import ManageMap from "./pages/ManageMap";
import ManageFeedback from "./pages/ManageFeedback";
import GenerateReport from "./pages/GenerateReport";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Login from "./pages/LoginPage";
import { ToastContainer } from "react-toastify";
import { useAuth } from "./context/AuthContext";
import UserDashboard from "./pages/UserDashboard";
import FeedbackForm from "./pages/FeedbackForm";
import PageNotFound from "./pages/PageNotFound";
import UserAnnouncement from "./pages/UserAnnouncement";
import UserMap from "./pages/UserMap";
import UserFeedback from "./pages/UserFeedback";

function App() {
  const { user } = useAuth();
  const location = useLocation();

  const PrivateRoute = ({ element }) => {
    return user ? element : <Navigate to="/" />;
  };

  const kioskPaths = [
    "/",
    "/user-dashboard",
    "/user-announcement",
    "/user-campus-map",
    "/user-feedback",
    "/feedbackform",
  ];

  const validPaths = [
    ...kioskPaths,
    "/dashboard",
    "/users",
    "/announcements",
    "/map",
    "/feedback",
    "/report",
  ];

  const isKioskPath = kioskPaths.includes(location.pathname);
  const isValidPath = validPaths.includes(location.pathname);
  const isNotFound = !isValidPath;

  const hideLayout = isKioskPath || isNotFound;

  return (
    <div className="flex w-screen h-screen bg-gray-100">
      {!hideLayout && user && <Sidebar />}
      <div className="flex-1 flex flex-col h-full w-full overflow-auto">
        {!hideLayout && user && <Header />}
        <main className="flex-1 overflow-auto">
          <ToastContainer
            position="top-center"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            style={{ zIndex: 9999 }}
          />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Login />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/user-announcement" element={<UserAnnouncement />} />
            <Route path="/user-campus-map" element={<UserMap />} />
            <Route path="/user-feedback" element={<UserFeedback />} />
            <Route path="/feedbackform" element={<FeedbackForm />} />

            {/* Private/Admin Routes */}
            <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
            <Route path="/users" element={<PrivateRoute element={<ManageUser />} />} />
            <Route path="/announcements" element={<PrivateRoute element={<ManageAnnouncement />} />} />
            <Route path="/map" element={<PrivateRoute element={<ManageMap />} />} />
            <Route path="/feedback" element={<PrivateRoute element={<ManageFeedback />} />} />
            <Route path="/report" element={<PrivateRoute element={<GenerateReport />} />} />

            {/* Catch-all (404) */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;

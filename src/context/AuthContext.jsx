import { useState, useEffect, createContext, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [isLogin, setIsLogin] = useState(() => {
    return localStorage.getItem("isLogin") === "true";
  });

  const login = async (credentials) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/users/login/",
        credentials,
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Login successful");
        setUser(response.data.user);
        setIsLogin(true);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("isLogin", "true");
        if (response.data.access) {
          localStorage.setItem("access_token", response.data.access);
        }
        return true;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      localStorage.removeItem("access_token");
      return false;
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/users/logout/",
        {},
        { withCredentials: true }
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    } finally {
      setUser(null);
      setIsLogin(false);
      localStorage.removeItem("user");
      localStorage.removeItem("isLogin");
      localStorage.removeItem("access_token");
    }
  };

  //auto log out for inactivity
  useEffect(() => {
    let logoutTimer;

    const handleUserActivity = () => {
      clearTimeout(logoutTimer);
      logoutTimer = setTimeout(() => {
        logout();
        toast.info("You have been logged out due to inactivity.");
      }, 60000);
    };

    if (isLogin) {
      window.addEventListener("mousemove", handleUserActivity);
      window.addEventListener("keypress", handleUserActivity);
      window.addEventListener("click", handleUserActivity);
      window.addEventListener("scroll", handleUserActivity, true);

      handleUserActivity();
    }

    return () => {
      clearTimeout(logoutTimer);
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keypress", handleUserActivity);
      window.removeEventListener("click", handleUserActivity);
      window.removeEventListener("scroll", handleUserActivity, true);
    };
  }, [isLogin]);

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/users/refresh/",
        {},
        { withCredentials: true }
      );
      if (response.data.access) {
        localStorage.setItem("access_token", response.data.access);
        return response.data.access;
      }
      throw new Error("No access token in response");
    } catch (error) {
      await logout();
      toast.error("Session expired. Please log in again.");
      return Promise.reject(error);
    }
  };

  // Axios interceptors
  useEffect(() => {
    const reqInterceptor = axios.interceptors.request.use((config) => {
      const accessToken = localStorage.getItem("access_token");
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    });

    const resInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response &&
          error.response.status === 401 &&
          !originalRequest._retry &&
          originalRequest.url !== "http://127.0.0.1:8000/users/refresh/"
        ) {
          originalRequest._retry = true;
          const newAccessToken = await refreshAccessToken();
          if (newAccessToken) {
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;
            return axios(originalRequest);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(reqInterceptor);
      axios.interceptors.response.eject(resInterceptor);
    };
  }, []);

  // Verify session on mount
  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/users/protected/",
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        if (response.data.user) {
          setUser(response.data.user);
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }
      } catch (err) {
        if (err.response?.status === 401) {
          const newAccessToken = await refreshAccessToken();
          if (newAccessToken) {
            try {
              const response = await axios.get(
                "http://127.0.0.1:8000/users/protected/",
                {
                  withCredentials: true,
                  headers: {
                    Authorization: `Bearer ${newAccessToken}`,
                  },
                }
              );
              if (response.data.user) {
                setUser(response.data.user);
                localStorage.setItem(
                  "user",
                  JSON.stringify(response.data.user)
                );
              }
            } catch {
              await logout();
            }
          } else {
            await logout();
          }
        }
      }
    };

    if (isLogin) verifySession();
  }, [isLogin]);

  return (
    <AuthContext.Provider value={{ user, setUser, isLogin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

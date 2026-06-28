import { useState, useEffect } from "react";
import { UserContext } from "./context.jsx";
import axios from "axios";

// Helper: decode JWT payload (no external lib needed)
function parseJwt(token) {
  try {
    const base64Payload = token.split(".")[1];
    const payload = atob(base64Payload);
    return JSON.parse(payload);
  } catch {
    return null;
  }
}

function Authcontext({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // On mount: restore session from localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (savedToken && savedUser) {
      // Check if token is expired
      const decoded = parseJwt(savedToken);
      if (decoded && decoded.exp * 1000 > Date.now()) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } else {
        // Expired — clear storage
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
    setAuthLoading(false);
  }, []);

  const registerUser = async (userData) => {
    const res = await axios.post("/api/user/register", userData);
    // apiResponse structure: { success, message, data: <user>, token: <token> }
    // register controller calls: apiResponse(res, 201, "msg", user, token)
    const newToken = res.data?.token;
    const newUser  = res.data?.data;
    if (newToken && newUser) {
      const userToSave = {
        _id: newUser._id,
        email: newUser.email,
        role: newUser.role,
        userName: newUser.userName,
      };
      localStorage.setItem("token", newToken);
      localStorage.setItem("user", JSON.stringify(userToSave));
      setToken(newToken);
      setUser(userToSave);
    }
    return res.data;
  };

  const loginUser = async (userData) => {
    const res = await axios.post("/api/user/login", userData);
    // apiResponse structure: { success, message, data: <token>, token: null }
    // login controller calls: apiResponse(res, 201, "msg", token)
    // so token lands in res.data.data
    const newToken = res.data?.token || res.data?.data;
    if (newToken) {
      const decoded = parseJwt(newToken);
      const loggedUser = {
        _id: decoded?._id,
        email: decoded?.email,
        role: decoded?.role,
      };
      localStorage.setItem("token", newToken);
      localStorage.setItem("user", JSON.stringify(loggedUser));
      setToken(newToken);
      setUser(loggedUser);
    }
    return res.data;
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  // Attach token to every axios request automatically
  useEffect(() => {
    const interceptor = axios.interceptors.request.use((config) => {
      const t = localStorage.getItem("token");
      if (t) {
        config.headers.Authorization = `Bearer ${t}`;
      }
      return config;
    });
    return () => axios.interceptors.request.eject(interceptor);
  }, []);

  return (
    <UserContext.Provider
      value={{ user, token, authLoading, registerUser, loginUser, logoutUser }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default Authcontext;

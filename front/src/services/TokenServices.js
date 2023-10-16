import jwt_decode from "jwt-decode";

const getToken = () => localStorage.getItem("token");

const isAuthenticated = () => !!getToken();

const isTokenValid = () => {
  const token = getToken();
  try {
    if (!token) return false;
    const decodedToken = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp > currentTime;
  } catch (error) {
    return false;
  }
};

const isTokenVerified = () => isAuthenticated() && isTokenValid();

const getUserRole = () => {
  const token = getToken();
  try {
    if (!token) return null;
    const decodedToken = jwt_decode(token);
    if (!decodedToken.role) return null;
    if (decodedToken.role === "admin") return "admin";
    if (decodedToken.role === "manager") return "manager";
    if (decodedToken.role === "user") return "user";
    else return null;
  } catch (error) {
    return null;
  }
};

const TokenService = {
  getToken,
  isAuthenticated,
  isTokenValid,
  isTokenVerified,
  getUserRole,
};

export default TokenService;

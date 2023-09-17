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

const TokenService = {
  getToken,
  isAuthenticated,
  isTokenValid,
  isTokenVerified,
};

export default TokenService;

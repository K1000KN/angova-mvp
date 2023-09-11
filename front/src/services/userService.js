import axios from "axios";
import { decodeToken } from "react-jwt";

const apiUrl = process.env.REACT_APP_API_URL;

// Function to get the current user
export const getCurrentUser = async (token, navigate) => {
  try {
    const decodedToken = decodeToken(token);
    const id = decodedToken.id;
    const role = decodedToken.role;
    let endpoint = `${apiUrl}/user/${id}`;

    if (role === "admin") {
      endpoint = `${apiUrl}/admin/${id}`;
    } else if (role === "manager") {
      endpoint = `${apiUrl}/manager/${id}`;
    }

    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);

    // If the user is not authorized, redirect to the login page or log them out
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token"); // Remove the token
      navigate("/login"); // Use navigate for redirection
    }

    throw error;
  }
};

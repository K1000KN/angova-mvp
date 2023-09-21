import axios from "axios";
import decodeToken from "jwt-decode";

const apiUrl = process.env.REACT_APP_API_URL;

export const fetchCurrentUser = async (token) => {
  const decodedToken = decodeToken(token);
  const id = decodedToken.id;
  const role = decodedToken.role;

  let endpoint = `${apiUrl}/user/${id}`;

  if (role === "admin") {
    endpoint = `${apiUrl}/admin/${id}`;
  } else if (role === "manager") {
    endpoint = `${apiUrl}/manager/${id}`;
  }
  if (role !== "user" && role !== "admin" && role !== "manager") {
    throw new Error("Invalid attempt");
  }

  try {
    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data; // Return the user data directly
  } catch (error) {
    console.error("Error:", error);
    throw error; // You can handle the error in the calling component
  }
};

export const fetchUsername = (currentUser) => {
  if (currentUser) {
    return currentUser.username; // Assuming that the username is a property in your user data
  }
  return null;
};

export const fetchUserEmail = (currentUser) => {
  if (currentUser) {
    return currentUser.email; // Assuming that the email is a property in your user data
  }
  return null;
};

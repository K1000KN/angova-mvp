import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const MailService = {
  sendFeedback: async ({ name, email, message }) => {
    try {
      const response = await axios.post(`${API_URL}/contact/mail`, {
        name,
        email,
        message,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default MailService;

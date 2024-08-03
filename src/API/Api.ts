import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'https://localhost:44318/api';

const getTechStacks = async () => {
    try {
      const response = await axios.get(`${API_URL}/TechStack`);
      return response.data;
    } catch (error) {
      toast.error('Error Fetching TechStacks!');
      throw error;
    }
  };

export {
    getTechStacks 
  };
  
import axios from "axios";
import { toast } from "react-toastify";

// const API_URL = 'https://localhost:44318/api';
const API_URL = "http://localhost:5241/api";

const getTechStacks = async () => {
  try {
    const response = await axios.get(`${API_URL}/TechStack`);
    return response.data;
  } catch (error) {
    toast.error("Error Fetching TechStacks!");
    throw error;
  }
};

const uploadFile = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('files', file);  

    const response = await axios.post(`${API_URL}/FileUpload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    toast.success('File Uploaded!');
    return response.data;
  } catch (error) {
    toast.error('Error Uploading File!');
    throw error;
  }
};


export { getTechStacks, uploadFile };

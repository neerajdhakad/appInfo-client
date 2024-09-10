import axios from "axios";
import { z } from "zod"; 
import { toast } from "react-toastify";

// const API_URL = 'https://localhost:44318/api';
const API_URL = "https://appinfo-api.azurewebsites.net/api";

const techStackSchema = z.object({
  _id: z.string(),
  techStackName: z.string(),
  logo: z.string().url({ message: "Invalid URL for logo" })
});
const formSchema = z.object({
  applicationName: z.string().min(2, {
    message: "Application Name must be at least 2 characters.",
  }),
  prodUrl: z.string().url({ message: "Invalid url" }),
  applicationType: z.string().min(5, { message: "Must be 5 or fewer characters long" }),
  repoPath: z
    .record(z.string(), z.string().url({ message: "Invalid URL" }))
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one Repo path must be added.",
    }),
  database: z
    .record(z.string(), z.string())
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one Database must be added.",
    }),
  // SPExcelSheet : z.string().url({message:"upload Excel sheet"}) ,
  excelLink: z.string().url().optional(),
  applicationSMEName: z.string().min(2, {
    message: "Application SME Name must be at least 2 characters.",
  }),
  accessRequired: z.string().min(5, { message: "Must be 5 or fewer characters long" }),
  sharepointLink: z.string().url({ message: "Invalid url" }),
  techStack: z
  .array(techStackSchema)
  .nonempty({ message: "At least one tech stack must be selected." }), 
});
 
 
const getTechStacks = async () => {
  try {
    const response = await axios.get(`${API_URL}/TechStack`);
    return response.data;
  } catch (error) {
    toast.error("Error Fetching TechStacks!");
    throw error;
  }
};

const postApplication = async (formData: z.infer<typeof formSchema>) => {
  try {
    const response = await axios.post(`${API_URL}/ApplicationDetail/saveApplicationDataset`, formData);
    // Assuming the API response contains a success flag and result data
    return {
      success: response.data === true,
      data: response.data,
    };
  } catch (error) {
    console.error("API call failed:", error);
    return {
      success: false,
      data: null,
    };
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


export { getTechStacks, uploadFile ,postApplication };

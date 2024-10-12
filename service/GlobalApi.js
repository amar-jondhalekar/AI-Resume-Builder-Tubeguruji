import axios from "axios";

// Make sure to set your base URL and API key in the .env file
const API_KEY = import.meta.env.VITE_STRAPI_API_KEY; // Your Strapi API key
const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/`, // Ensure this is pointing to your Strapi API
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`, // If you don't need an API key, you can remove this line
    }
});

// Function to create a new resume
const CreateNewResume = async (data) => {
    try {
        const response = await axiosClient.post('/user-resumes', { data });
        return response.data; // Return the data from the response
    } catch (error) {
        console.error("Error creating resume:", error.response || error.message);
        throw error; // Rethrow the error for further handling
    }
};

// Function to get resumes by user email
const GetUserResumes = async (userEmail) => {
    try {
        const response = await axiosClient.get(`/user-resumes?filters[userEmail][$eq]=${userEmail}`);
        return response.data; // Return the data from the response
    } catch (error) {
        console.error("Error fetching resumes:", error.response || error.message);
        throw error; // Rethrow the error for further handling
    }
};

// Function to update a resume by ID
const UpdateResumeDetail = async (id, data) => {
    try {
        const response = await axiosClient.put(`/user-resumes/${id}`, { data });
        return response.data; // Return the data from the response
    } catch (error) {
        console.error("Error updating resume:", error.response || error.message);
        throw error; // Rethrow the error for further handling
    }
};

// Function to get a resume by ID
const GetResumeById = async (id) => {
    try {
        const response = await axiosClient.get(`/user-resumes/${id}?populate=*`);
        return response.data; // Return the data from the response
    } catch (error) {
        console.error("Error fetching resume by ID:", error.response || error.message);
        throw error; // Rethrow the error for further handling
    }
};

// Function to delete a resume by ID
const DeleteResumeById = async (id) => {
    try {
        const response = await axiosClient.delete(`/user-resumes/${id}`);
        return response.data; // Return the data from the response
    } catch (error) {
        console.error("Error deleting resume:", error.response || error.message);
        throw error; // Rethrow the error for further handling
    }
};

export default {
    CreateNewResume,
    GetUserResumes,
    UpdateResumeDetail,
    GetResumeById,
    DeleteResumeById
};

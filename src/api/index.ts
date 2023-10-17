import axios from "axios";
export const AxiosInstance = axios.create({baseURL: import.meta.env.MODE === "development" ? 'http://localhost:9900' : 'https://mern-service-m8va.onrender.com', withCredentials: import.meta.env.MODE === "development"})


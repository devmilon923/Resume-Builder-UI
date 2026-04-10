import axios from "axios";
import { TLogin } from "./validations";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
const backendURL = process.env.NEXT_PUBLIC_Backend_URL;
const youtubeKey = process.env.NEXT_PUBLIC_YoutubeAPI;
const api = axios.create({
  baseURL: backendURL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token") || null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle 401 (Unauthorized)
    }
    return Promise.reject(error);
  },
);
export const useLoginUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (inputs: TLogin) => {
      const result = await api.post<TLogin>("/login", inputs);
      console.log(result.data);
      return result.data;
    },
    onSuccess: (data) => {
      console.log("Login success");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

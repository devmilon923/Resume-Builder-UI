import axios from "axios";
import { TLogin } from "./validations";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "next-client-cookies";


const backendURL = process.env.NEXT_PUBLIC_Backend_URL;
const api = axios.create({
  baseURL: backendURL,
  withCredentials:true
});
api.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined"
      ? document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1]
      : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;

  }
  console.log(token)
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {

    if (error.response?.status === 401) {
        const token =
    typeof window !== "undefined"
      ? document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1]
      : null;
      const result = await axios.post(
        backendURL + "/auth/renew-token",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // or however your token is structured
          },
        },
      );
      console.log(result.data)

    }
    return Promise.reject(error);
  },
);
export const useLoginUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (inputs: TLogin) => {
      const result = await api.post<TLogin>("/auth/login", inputs);
      return result.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const result = await api.get("/user/profile");
      return result.data.data;
    },

  });
};


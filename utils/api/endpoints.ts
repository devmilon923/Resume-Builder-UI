import axios from "axios";
import { TLogin, TRegister } from "./validations";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const backendURL = process.env.NEXT_PUBLIC_Backend_URL;

// --- Auth session flag helpers ---
// We use a lightweight localStorage flag to track whether the user *might*
// have valid httpOnly cookies. This avoids firing profile + renew-token
// requests on every page load when the user is clearly logged out.
const AUTH_FLAG_KEY = "logged_in";

function setAuthFlag() {
  try {
    localStorage.setItem(AUTH_FLAG_KEY, "1");
  } catch {}
}

function clearAuthFlag() {
  try {
    localStorage.removeItem(AUTH_FLAG_KEY);
  } catch {}
}

function hasAuthFlag(): boolean {
  try {
    return localStorage.getItem(AUTH_FLAG_KEY) === "1";
  } catch {
    return false;
  }
}

const api = axios.create({
  baseURL: backendURL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const authState = hasAuthFlag();
      if (!authState) {
        return Promise.reject(error);
      }
      try {
        const result = await axios.post(
          backendURL + "/auth/renew-token",
          {},
          { withCredentials: true },
        );

        if (result.status === 200) {
          return api(originalRequest);
        }
      } catch (renewError) {
        // Token renewal failed — cookies are gone, clear the flag so
        // future page loads skip the profile call entirely.
        clearAuthFlag();
        return Promise.reject(renewError);
      }
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
      setAuthFlag();
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};
export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (inputs: TRegister) => {
      const result = await api.post<TRegister>("/auth/register", inputs);
      return result.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};

export const useResendOTP = () => {
  return useMutation({
    mutationFn: async () => {
      const result = await api.post("/auth/resend-otp");
      return result.data;
    },
    onSuccess: (data) => {
      console.log("OTP resent successfully", data);
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

    enabled: typeof window !== "undefined" && hasAuthFlag(),
    retry: false,
  });
};
export const useVerifyAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (otp: number) => {
      const result = await api.patch("/auth/verify-account", { otp });
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    retry: false,
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const result = await api.post("/auth/logout");
      return result.data;
    },
    onSuccess: (data) => {
      clearAuthFlag();
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      content: string;
      feeling: {
        emoji: string;
        label: string;
      } | null;
    }) => {
      const result = await api.post("/post/create", data);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useGetAllPosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const result = await api.get("/post/get-all");
      return result.data.data;
    },
  });
};

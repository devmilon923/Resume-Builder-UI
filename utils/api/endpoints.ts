import axios from "axios";
import { TLogin } from "./validations";
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
      // Mark the user as "possibly authenticated" so future page loads
      // will attempt to fetch the profile.
      setAuthFlag();
      queryClient.invalidateQueries({ queryKey: ["profile"] });
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
    // Only attempt to fetch the profile when the auth flag exists.
    // Without the flag we know there are no cookies → skip the request.
    // enabled: typeof window !== "undefined" && hasAuthFlag(),
    // Auth failures should not be retried — the interceptor already
    // tried renewing the token once; retrying just adds more delay.
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

import { LoginPayload, RegisterPayload } from "~/types/auth.type";
import axiosInstance from "./axios";
import useAuthStore from "~/store/auth.store";

export const AuthService = {
  async login(payload: LoginPayload) {
    try {
      const response = await axiosInstance.post("/auth/login", payload);
      //   console.log(response.data);
      useAuthStore.getState().setToken(response?.data?.data?.token || "");
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  async register(payload: RegisterPayload) {
    try {
      const response = await axiosInstance.post("/auth/register", payload);
      //   console.log(response);
      useAuthStore.getState().setToken(response?.data?.data?.token || "");
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  async logout() {
    try {
      //   await axiosInstance.post("/logout");
      localStorage.clear();
    } catch (error) {
      console.error("Logout error:", error);
    }
  },

  handleError(error: any) {
    if (error.response) {
      // Server responded with error
      return {
        status: error.response.status,
        message: error.response.data.message || "An error occurred",
      };
    } else if (error.request) {
      // Request made but no response
      return {
        status: 503,
        message: "Service unavailable",
      };
    } else {
      // Request setup error
      return {
        status: 500,
        message: "Error setting up the request",
      };
    }
  },
};

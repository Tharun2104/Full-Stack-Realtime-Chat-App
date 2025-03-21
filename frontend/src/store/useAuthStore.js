import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js"

 export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIng: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            // Sends a GET request to "/auth/check" using Axios to verify the user’s authentication status.
            const res = await axiosInstance.get("/auth/check");

            set({ authUser: res.data });
        } catch (error) {
            console.log("Error in checkAuth:", error);
            set({ authUser: null });
        } finally{
            set({ isCheckingAuth: false });
        }
    },
 }));
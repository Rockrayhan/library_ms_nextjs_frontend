import axios from "./axios";
import { toast } from "sonner";




export async function getCurrentUser() {
  try {
    const res = await axios.get("/user/me");
    return res.data.data;
  } catch (e) {
    return null;
  }
}


export async function logoutUser(): Promise<void> {
  try {
    await axios.post("/auth/logout");
    toast.success("Logged out successfully");
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Logout failed");
  }
}
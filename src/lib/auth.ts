import axios from "./axios";
import { toast } from "sonner";




// export async function getCurrentUser() {
//   try {
//     const res = await axios.get("/user/me");
//     return res.data.data;
//   } catch (e) {
//     return null;
//   }
// }


export async function getCurrentUser({ cookies: serverCookies }: { cookies?: any } = {}) {
  try {
    if (serverCookies) {
      // Server-side: pass cookie header
      const cookieHeader = serverCookies.get("next-auth.session-token")?.value; // adjust if different cookie name
      const res = await axios.get("/user/me", {
        headers: { cookie: cookieHeader || "" },
      });
      return res.data.data;
    } else {
      // Client-side
      const res = await axios.get("/user/me");
      return res.data.data;
    }
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
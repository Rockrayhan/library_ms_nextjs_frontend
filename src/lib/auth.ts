import { toast } from "sonner";

export async function getCurrentUser() {
  try {
    const res = await fetch("/api/user/me", {
      credentials: "include", // Important for cookies
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data?.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function logoutUser(): Promise<void> {
  try {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Logout failed");
    }

    toast.success("Logged out successfully");
    
    // Redirect to login
    window.location.href = "/login";
  } catch (error: any) {
    toast.error(error?.message || "Logout failed");
  }
}
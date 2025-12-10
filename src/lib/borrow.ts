import axios from "./axios";
import { toast } from "sonner";

export async function getUserBorrowHistory(userId: string) {
  const res = await axios.get(`/borrow/user/${userId}`);
  return res.data.data;
}


export async function getUserCurrentBorrows(userId: string) {
  const res = await axios.get(`/borrow/current/${userId}`);
  return res.data.data;
}


export async function borrowBook(data: {
  user: string;
  book: string;
  quantity: number;
  dueDate: string;
}) {
  try {
    const res = await axios.post("/borrow", data);
    toast.success("Book borrowed successfully!");
    return res.data.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Borrow failed");
    return null; 
  }
}





export async function getAllBorrows() {
  try {
    const res = await axios.get("/borrow");
    return res.data.data;
  } catch (error: any) {
    toast.error("Failed to load borrow list");
    throw error;
  }
}





export async function returnBorrow(borrowId: string) {
  try {
    const res = await axios.patch(`/borrow/return/${borrowId}`);
    toast.success("Book returned successfully!");
    return res.data.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Return failed");
    throw error;
  }
}
import axios from "./axios";

export async function getAllBooks() {
  const res = await axios.get("/books");
  return res.data.data;
}

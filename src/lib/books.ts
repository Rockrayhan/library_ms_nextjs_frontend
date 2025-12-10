import axios from "./axios";

export async function getAllBooks() {
  const res = await axios.get("/books");
  return res.data.data;
}



// Fetch single book
export async function getBookById(id: string) {
  const res = await axios.get(`/books/${id}`);
  return res.data.data;
}

// Create new book
export async function createBook(data: any) {
  const res = await axios.post("/books/create-book", data);
  return res.data.data;
}

// Update book
export async function updateBook(id: string, data: any) {
  const res = await axios.patch(`/books/${id}`, data);
  return res.data.data;
}

// delete book
export async function deleteBook(id: string, data: any) {
  const res = await axios.delete(`/books/${id}`, data);
  return res.data.data;
}
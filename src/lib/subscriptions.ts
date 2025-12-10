import axios from "./axios";

export async function getAllSubscriptions() {
  const res = await axios.get("/subscriptions");
  return res.data.data;
}

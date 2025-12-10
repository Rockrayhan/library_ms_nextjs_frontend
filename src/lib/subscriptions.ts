import axios from "./axios";

export async function getAllSubscriptions() {
  const res = await axios.get("/subscriptions");
  return res.data.data;
}



export async function createSubscription(data: any) {
  const res = await axios.post("/subscriptions", data);
  return res.data.data;
}

export async function updateSubscription(id: string, data: any) {
  const res = await axios.patch(`/subscriptions/${id}`, data);
  return res.data.data;
}

export async function deleteSubscription(id: string) {
  const res = await axios.delete(`/subscriptions/${id}`);
  return res.data.data;
}
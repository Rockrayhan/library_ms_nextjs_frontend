export async function fetchAllBooks() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
    cache: "no-store",
  });
  const json = await res.json();
  return json.data;
}

export async function fetchSubscriptions() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscriptions`, {
    cache: "no-store",
  });
  const json = await res.json();
  return json.data;
}

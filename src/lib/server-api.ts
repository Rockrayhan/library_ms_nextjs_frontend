export async function fetchAllBooks() {
  if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is missing!");
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
    cache: "no-store",
  });

  const json = await res.json();
  return json.data;
}




export async function fetchSubscriptions() {
  if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is missing!");
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscriptions`, {
    cache: "no-store",
  });
  const json = await res.json();
  return json.data;
}

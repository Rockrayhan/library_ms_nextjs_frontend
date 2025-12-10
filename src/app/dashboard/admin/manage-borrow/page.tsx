import ReturnTable from "@/components/dashboard/ReturnTable";
import { getAllBorrows } from "@/lib/borrow";


export const dynamic = "force-dynamic"; // SSR every time

export default async function ManageBorrowPage() {
  const borrows = await getAllBorrows();

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Return Management</h1>

      <ReturnTable borrows={borrows} />
    </div>
  );
}

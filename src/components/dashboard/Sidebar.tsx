import Link from "next/link";

export default function Sidebar({ user }: { user: any }) {
  if (!user) return null;

  return (
    <div className="w-64 bg-gray-100 h-screen p-4">
      <div className="font-bold text-xl mb-6">Dashboard</div>

      <nav className="flex flex-col gap-3">
        {user.role === "admin" && (
          <>
            <Link href="/dashboard/admin">Dashboard Home</Link>
            <Link href="/dashboard/admin/users">Users</Link>
            <Link href="/dashboard/admin/subscriptions">Subscriptions</Link>
            <Link href="/dashboard/admin/books">Books</Link>
          </>
        )}

        {user.role === "user" && (
          <>
            <Link href="/dashboard/user">Dashboard Home</Link>
            <Link href="/dashboard/user/subscription">My Subscription</Link>
            <Link href="/dashboard/user/borrowed-books">Borrowed Books</Link>
          </>
        )}
      </nav>
    </div>
  );
}

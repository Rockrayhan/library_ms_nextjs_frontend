import { HomeIcon } from "lucide-react";
import Link from "next/link";

export default function Sidebar({ user }: { user: any }) {
  if (!user) return null;

  return (
    <div className="w-64 bg-gray-800 border-r border-gray-700 h-screen p-5">
      <div className="font-bold text-xl mb-6 text-gray-100">Dashboard</div>

      <nav className="flex flex-col gap-2">
        {user.role === "admin" && (
          <>
            <SidebarLink href="/dashboard/admin">Dashboard Home</SidebarLink>
            <SidebarLink href="/dashboard/admin/manage-books">Manage All Books</SidebarLink>
            <SidebarLink href="/dashboard/admin/all-users">All Users</SidebarLink>
            <SidebarLink href="/dashboard/admin/manage-subscription">
              Subscriptions
            </SidebarLink>
            <SidebarLink href="/dashboard/admin/manage-borrow">Manage-Return</SidebarLink>

            <SidebarLink href="/"><span className="flex gap-1.5"> 
              <HomeIcon /> Go to Home Page</span>
              </SidebarLink>

          </>
        )}

        {user.role === "user" && (
          <>
            <SidebarLink href="/dashboard/user">Dashboard Home</SidebarLink>
            <SidebarLink href="/dashboard/user/subscription">
              My Subscription
            </SidebarLink>
            <SidebarLink href="/dashboard/user/currently-borrowed">
              Currently Borrowed 
            </SidebarLink>

            <SidebarLink href="/dashboard/user/borrowed-books">
              Borrowed Books History 
            </SidebarLink>

            <SidebarLink href="/"><span className="flex gap-1.5"> 
              <HomeIcon /> Go to Home</span>
              </SidebarLink>
          </>
        )}
      </nav>
    </div>
  );
}

function SidebarLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="px-3 py-2 rounded-md hover:bg-gray-700 text-gray-300 hover:text-white transition"
    >
      {children}
    </Link>
  );
}

"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/auth";
import SkeletonLoader from "@/components/shared/SkeletonLoader";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser().then((u) => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  if (loading)
    return (
      <SkeletonLoader/>
    );

  return (
    <div className="flex min-h-screen bg-gray-950 text-gray-200">
      <Sidebar user={user} />
      <div className="flex-1 flex flex-col">
        <Topbar user={user} />
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

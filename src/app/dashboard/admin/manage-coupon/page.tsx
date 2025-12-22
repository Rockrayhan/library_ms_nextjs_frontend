"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import axios from "@/lib/axios";
import { toast } from "sonner";

const ManageCouponPage = () => {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/coupon"); 
      setCoupons(res.data.data || []);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to fetch coupons");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const toggleStatus = async (id: string, isActive: boolean) => {
    try {
      await axios.patch(`/coupon/status/${id}`, { isActive: !isActive });
      toast.success("Coupon status updated");
      fetchCoupons();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update status");
    }
  };

  const deleteCoupon = async (id: string) => {
    if (!confirm("Are you sure you want to delete this coupon?")) return;
    try {
      await axios.delete(`/coupons/${id}`);
      toast.success("Coupon deleted successfully");
      fetchCoupons();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to delete coupon");
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold text-gray-200 mb-6">Manage Coupons</h1>

      {loading ? (
        <p className="text-gray-400">Loading coupons...</p>
      ) : (
        <Table className="bg-gray-900 border border-gray-800 rounded-xl">
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Discount (%)</TableHead>
              <TableHead>Expires At</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {coupons.map((c) => (
              <TableRow key={c._id}>
                <TableCell>{c.code}</TableCell>
                <TableCell>{c.discountPercent}</TableCell>
                <TableCell>
                  {c.expiresAt
                    ? new Date(c.expiresAt).toLocaleDateString()
                    : "No expiry"}
                </TableCell>
                <TableCell>
                  <Badge variant={c.isActive ? "default" : "destructive"}>
                    {c.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleStatus(c._id, c.isActive)}
                  >
                    Toggle Status
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteCoupon(c._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default ManageCouponPage;

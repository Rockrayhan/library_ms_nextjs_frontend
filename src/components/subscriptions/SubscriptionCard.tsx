"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function SubscriptionCard({ plan }: any) {
  return (
    <Card className="hover:shadow-xl transition rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl capitalize">{plan.planName}</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-sm mb-3">
          Borrow Limit: {plan.borrowLimit}
        </p>

        <Button className="w-full">
          Buy Plan
        </Button>
      </CardContent>
    </Card>
  );
}

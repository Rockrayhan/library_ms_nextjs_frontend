import { Loader2 } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

const SkeletonLoader = () => {
  return (
    <div className="center mt-10">
       <Loader2 className="h-10 w-10 animate-spin text-gray-500" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};

export default SkeletonLoader;

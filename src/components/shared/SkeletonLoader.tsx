import { Loader2 } from "lucide-react";

const SkeletonLoader = () => {
  return (
    <div className="center mt-10">
       <Loader2 className="h-10 w-10 animate-spin text-gray-500" />
    </div>
  );
};

export default SkeletonLoader;

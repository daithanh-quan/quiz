import React from "react";

import { cn } from "src/lib/utils";

const Skeleton = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "animate-pulse rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200",
      className,
    )}
    style={{
      backgroundSize: "200% 100%",
      animation: "shimmer 1.5s infinite",
    }}
  />
);

const InfoItemSkeleton = ({ className }: { className?: string }) => (
  <div className={cn("flex items-center gap-2", className)}>
    <Skeleton className="h-5 w-24" />
    <Skeleton className="h-5 w-32" />
  </div>
);

const TitleSkeleton = () => (
  <div className="mb-5">
    <Skeleton className="h-6 w-48" />
  </div>
);

const SectionSkeleton = ({ className }: { className?: string }) => (
  <div className={cn("space-y-4", className)}>
    <InfoItemSkeleton />
    <InfoItemSkeleton />
  </div>
);

export const InformationSkeleton = () => {
  return (
    <div className="rounded-sm border border-gray-300 bg-white p-4 shadow-sm">
      <TitleSkeleton />
      <div className="flex flex-wrap items-start justify-between">
        <div className="border-gray-300 sm:flex-1 sm:border-r sm:pr-4">
          <SectionSkeleton />
        </div>
        <div className="mt-4 sm:mt-0 sm:flex-1 sm:pl-4">
          <SectionSkeleton />
        </div>
      </div>
    </div>
  );
};

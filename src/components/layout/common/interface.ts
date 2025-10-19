import React from "react";

import { LucideProps } from "lucide-react";

export type NavigateItem = {
  name: string;
  href: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  activeRoutes?: string[] | string;
};

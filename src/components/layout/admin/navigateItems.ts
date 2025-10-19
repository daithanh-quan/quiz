"use client";

import {
  FileQuestion,
  FileText,
  Home,
  School,
  Settings,
  User,
} from "lucide-react";

export const navigationItems = [
  { name: "Dashboard", href: "/admin", icon: Home },
  {
    name: "Classes",
    href: "/admin/classes",
    icon: School,
    activeRoutes: ["/admin/classes"],
  },
  {
    name: "Students",
    href: "/admin/students",
    icon: User,
    activeRoutes: ["/admin/students"],
  },
  {
    name: "Exams",
    href: "/admin/exams",
    icon: FileText,
    activeRoutes: ["/admin/exams"],
  },
  {
    name: "Questions",
    href: "/admin/questions",
    icon: FileQuestion,
    activeRoutes: ["/admin/questions"],
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
    activeRoutes: ["/admin/settings"],
  },
];

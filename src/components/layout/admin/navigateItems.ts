"use client";

import { FileQuestion, FileText, Home, School, Settings } from "lucide-react";

export const navigationItems = [
  { name: "Dashboard", href: "/admin", icon: Home },
  { name: "Classes", href: "/admin/classes", icon: School },
  { name: "Exams", href: "/admin/exams", icon: FileText },
  { name: "Questions", href: "/admin/questions", icon: FileQuestion },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

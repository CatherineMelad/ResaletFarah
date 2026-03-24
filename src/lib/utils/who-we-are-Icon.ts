import { Eye, ClipboardList, Check } from "lucide-react";

export function getWhoWeAreIcon(title: string | null) {
  const normalized = title?.toLowerCase() ?? "";

  if (normalized.includes("vision")) return Eye;
  if (normalized.includes("mission")) return ClipboardList;
  if (normalized.includes("value")) return Check;

  return ClipboardList;
}
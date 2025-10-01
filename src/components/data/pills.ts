// Pills data for home page
import type { PillIconName } from "./pillIcons";

export type PillSpec = { label: string; icon: PillIconName };

export const LEFT_PILLS: PillSpec[] = [
  { label: "Automated routine tasks", icon: "automate" },
  { label: "Network Management System", icon: "nms" },
  { label: "Round-the-clock support", icon: "support" },
  { label: "Fast & light network polling", icon: "polling" },
];

export const RIGHT_PILLS: PillSpec[] = [
  { label: "High availability platform", icon: "ha" },
  { label: "Real-time network changes", icon: "realtime" },
  { label: "Monitor and report", icon: "monitor" },
  { label: "Data loss prevention", icon: "dlp" },
];

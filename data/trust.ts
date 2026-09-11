import { BookOpen, Headset, ShieldCheck, Sprout } from "lucide-react";

import type { TrustItem } from "@/types/content";

export const trustItems: TrustItem[] = [
  {
    icon: ShieldCheck,
    title: "Quality Tools",
    description: "Forged heads and seasoned hardwood handles that survive Indian summers and monsoon damp.",
  },
  {
    icon: BookOpen,
    title: "Expert Guidance",
    description: "Straight answers from people who garden in Indian soil, not a call-centre script.",
  },
  {
    icon: Sprout,
    title: "Garden Solutions",
    description: "Practical help for balconies, terraces, kitchen gardens, farms and estates.",
  },
  {
    icon: Headset,
    title: "Reliable Support",
    description: "Sharpening, spares and servicing long after the first monsoon.",
  },
];

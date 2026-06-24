import type React from "react";

export interface SlideDefBase {
  id: string;
  title: string;
  notes: string;
  Component: React.ComponentType<{ step?: number }>;
  steps?: number;
}

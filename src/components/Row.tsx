import { cn } from "@/utils/utils";
import HtmlDivProps from "@/types/HtmlDivProps";
import React from "react";

type RowProps = HtmlDivProps & {
  children: React.ReactNode;
};

export default function Row({ children, className }: RowProps) {
  return (
    <div className={cn("flex flex-row items-center", className)}>
      {children}
    </div>
  );
}

import { cn } from "@/utils/utils";
import HtmlDivProps from "@/types/HtmlDivProps";
import React from "react";

type ColProps = HtmlDivProps & {
  children: React.ReactNode;
};

export default function Col({ children, className }: ColProps) {
  return <div className={cn("flex flex-col", className)}>{children}</div>;
}

import { cn } from "@/utils/utils";
import React from "react";

type LinkProps = React.HTMLAttributes<HTMLAnchorElement> & {
  children: React.ReactNode;
  href: string;
};

export default function Link({ href, children, className }: LinkProps) {
  return (
    <a target="__blank" href={href} className={cn(className)}>
      {children}
    </a>
  );
}

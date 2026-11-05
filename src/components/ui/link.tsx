import * as React from "react";
import { cn } from "@/components/ui/utils";

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(({ className, ...props }, ref) => {
  return (
    <a
      ref={ref}
      className={cn("text-primary underline-offset-4 hover:underline", className)}
      {...props}
    />
  );
});
Link.displayName = "Link";

export default Link;

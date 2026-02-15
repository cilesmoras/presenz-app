import { ReactNode } from "react";

type PageHeadingProps = {
  children: ReactNode;
  className?: string;
};

export default function PageHeading({ children, className }: PageHeadingProps) {
  const base = "text-xl font-semibold";
  return <h1 className={`${base} ${className}`}>{children}</h1>;
}

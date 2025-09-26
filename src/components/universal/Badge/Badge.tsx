import React from "react";
import "./Badge.css";

interface BadgeProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  > {}

const Badge: React.FC<BadgeProps> = ({ className, children, ...props }) => {
  return (
    <span className={`badge${className ? " " + className : ""}`} {...props}>
      {children}
    </span>
  );
};

export default Badge;

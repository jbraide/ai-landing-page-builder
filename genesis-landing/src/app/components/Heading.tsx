import React from "react";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
}

const Heading: React.FC<HeadingProps> = ({
  level,
  children,
  className,
  ...props
}) => {
  const Tag = `h${level}` as const;

  return (
    <Tag className={`font-sans font-semibold ${className || ""}`} {...props}>
      {children}
    </Tag>
  );
};

export default Heading;

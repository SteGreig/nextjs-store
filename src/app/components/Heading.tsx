import React from "react";

type headingType = {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
};

const Heading = ({ level, children, className }: headingType) => {
  const HeadingTag = `h${level}`;

  return React.createElement(HeadingTag, { className }, children);
};

export default Heading;

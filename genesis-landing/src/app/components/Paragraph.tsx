import React, { HTMLAttributes } from 'react';

interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement> {
  text: string;
}

const Paragraph: React.FC<ParagraphProps> = ({ text, className, ...props }) => {
  return (
    <p
      className={`font-sans font-normal text-base ${className || ''}`}
      {...props}
    >
      {text}
    </p>
  );
};

export default Paragraph;

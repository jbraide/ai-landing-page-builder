import React from "react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
}

const Image: React.FC<ImageProps> = ({ src, alt, className, ...props }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`rounded-lg shadow-sm ${className || ""}`}
      {...props}
    />
  );
};

export default Image;
```


<file_path>
landingpage-builder/genesis-landing/src/app/components/Button.tsx
</file_path>

<edit_description>
Create Button component for the basic element library
</edit_description>
```

```
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ text, className, ...props }) => {
  return (
    <button
      className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${className || ""}`}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;

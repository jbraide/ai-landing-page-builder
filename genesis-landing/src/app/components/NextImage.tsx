import NextImage from "next/image";
import { ComponentProps } from "react";

interface NextImageProps extends ComponentProps<typeof NextImage> {
  src: string;
  alt: string;
  className?: string;
}

export default function NextImageWrapper({
  src,
  alt,
  className = "",
  ...props
}: NextImageProps) {
  return (
    <div className={`relative ${className}`}>
      <NextImage
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover"
        {...props}
      />
    </div>
  );
}

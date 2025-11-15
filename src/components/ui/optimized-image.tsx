interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  priority?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const OptimizedImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  priority = false,
  className,
  style
}: OptimizedImageProps) => {
  const webpSrc = src.replace(/\.(png|jpg|jpeg)$/, '.webp');
  
  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={className}
        style={style}
      />
    </picture>
  );
};

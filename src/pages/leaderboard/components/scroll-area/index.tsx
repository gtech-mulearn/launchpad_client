import React, { ReactNode, useRef, useState, useEffect } from "react";
import styles from "./scroll-area.module.css";

interface ScrollAreaProps {
  children: ReactNode;
  className?: string;
}

const ScrollArea = ({ children, className = "" }: ScrollAreaProps) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [thumbWidth, setThumbWidth] = useState<number>(100);
  const [thumbPosition, setThumbPosition] = useState<number>(0);

  // Update thumb width and position based on viewport scroll
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const updateThumb = () => {
      const { scrollWidth, clientWidth, scrollLeft } = viewport;
      const scrollableWidth = scrollWidth - clientWidth;
      
      // Calculate thumb width as a percentage of visible content
      const widthPercentage = (clientWidth / scrollWidth) * 100;
      const width = Math.max(10, widthPercentage); // Min thumb width of 10%
      setThumbWidth(width);
      
      // Calculate position based on scroll position
      const position = (scrollLeft / scrollableWidth) * (100 - width);
      setThumbPosition(position);
    };

    updateThumb();
    viewport.addEventListener("scroll", updateThumb);
    window.addEventListener("resize", updateThumb);

    return () => {
      viewport.removeEventListener("scroll", updateThumb);
      window.removeEventListener("resize", updateThumb);
    };
  }, []);

  return (
    <div className={`${styles.scrollAreaRoot} ${className}`}>
      <div ref={viewportRef} className={styles.scrollAreaViewport}>
        {children}
      </div>
      <div className={styles.scrollbarHorizontal}>
        <div 
          className={styles.scrollbarThumb} 
          style={{ 
            width: `${thumbWidth}%`,
            left: `${thumbPosition}%`
          }} 
        />
      </div>
    </div>
  );
};

export default ScrollArea;

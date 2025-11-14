// src/components/ShadowRoot.tsx
import { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ShadowRootProps {
  stylesheets?: string[];
  children: React.ReactNode;
}

export const ShadowRoot: React.FC<ShadowRootProps> = ({ stylesheets = [], children }) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const [shadowRoot, setShadowRoot] = useState<ShadowRoot | null>(null);

  useEffect(() => {
    if (hostRef.current && !hostRef.current.shadowRoot) {
      const shadow = hostRef.current.attachShadow({ mode: 'open' });
      setShadowRoot(shadow);
      
      // 加载所有样式表
      stylesheets.forEach((href) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        shadow.appendChild(link);
      });
    }
  }, [stylesheets]);

  return (
    <div ref={hostRef}>
      {shadowRoot &&
        createPortal(
          <>
            {children}
          </>,
          shadowRoot
        )}
    </div>
  );
};
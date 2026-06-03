import React from 'react';

export function OrganicBlob({ className, delay = 0 }) {
  return (
    <div 
      className={`absolute pointer-events-none mix-blend-multiply opacity-40 animate-blob ${className}`}
      style={{ 
        animationDelay: `${delay}s`,
        borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' 
      }}
    ></div>
  );
}

export function OrganicBlobAlt({ className, delay = 0 }) {
  return (
    <div 
      className={`absolute pointer-events-none mix-blend-multiply opacity-30 animate-blob ${className}`}
      style={{ 
        animationDelay: `${delay}s`,
        borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' 
      }}
    ></div>
  );
}

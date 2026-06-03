import { ArrowUpRight } from 'lucide-react';

export default function Button({ href, label, variant = 'primary', className = '' }) {
  const isPrimary = variant === 'primary';

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        group relative inline-flex items-center justify-between
        rounded-full font-medium
        transition-all duration-700 ease-[var(--ease-fluid)]
        active:scale-[0.98]
        ${isPrimary 
          ? 'bg-pastelia-burgundy text-pastelia-cream hover:bg-pastelia-burgundy/90' 
          : 'bg-transparent text-pastelia-brown border border-pastelia-brown/20 hover:border-pastelia-brown/40'
        }
        ${className}
      `}
    >
      <span className="mr-2 whitespace-nowrap">{label}</span>
      <span 
        className={`
          flex h-8 w-8 items-center justify-center rounded-full
          transition-transform duration-700 ease-[var(--ease-fluid)]
          group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105
          bg-transparent
        `}
      >
        <ArrowUpRight className="h-5 w-5" />
      </span>
    </a>
  );
}

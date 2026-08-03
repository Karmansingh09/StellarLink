import clsx from 'clsx';

export default function Logo({
  variant = 'full',
  size = 'md',
  className = '',
  ...props
}) {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const textSizes = {
    sm: 'text-base font-bold',
    md: 'text-xl font-bold',
    lg: 'text-2xl font-bold',
  };

  return (
    <div
      className={clsx('inline-flex items-center gap-2.5 select-none', className)}
      {...props}
    >
      <div className={clsx('shrink-0 text-[#0F766E]', iconSizes[size])}>
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <rect width="32" height="32" rx="8" fill="#0F766E" />
          <circle cx="10" cy="16" r="3" fill="#FFFFFF" />
          <circle cx="22" cy="16" r="3" fill="#FFFFFF" />
          <circle cx="16" cy="10" r="2.5" fill="#14B8A6" />
          <circle cx="16" cy="22" r="2.5" fill="#14B8A6" />
          <path
            d="M10 16L22 16M16 10L16 22"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      {variant === 'full' && (
        <span className={clsx('tracking-tight text-[#0F172A]', textSizes[size])}>
          Stellar<span className="text-[#0F766E]">Link</span>
        </span>
      )}
    </div>
  );
}

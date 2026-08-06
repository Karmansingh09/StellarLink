import clsx from 'clsx';

export default function Badge({
  children,
  variant = 'primary',
  size = 'md',
  dot = false,
  className = '',
  ...props
}) {
  const baseStyles = 'inline-flex items-center gap-1.5 font-medium rounded-full select-none';

  const variants = {
    primary: 'bg-[#EAF8F6] text-[#0F766E] border border-[#CBE9E3]',
    secondary: 'bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0]',
    accent: 'bg-[#DDF6F0] text-[#0F766E] border border-[#BDE9DE]',
    success: 'bg-[#EAF7EE] text-[#166534] border border-[#CDECCD]',
    warning: 'bg-[#FFF7E6] text-[#92400E] border border-[#F6E2B5]',
    error: 'bg-[#FEF2F2] text-[#B42318] border border-[#FECACA]',
    outline: 'bg-white border border-[#D9E2E1] text-[#475569]',
  };

  const dotColors = {
    primary: 'bg-[#0F766E]',
    secondary: 'bg-[#475569]',
    accent: 'bg-[#0F766E]',
    success: 'bg-emerald-600',
    warning: 'bg-amber-600',
    error: 'bg-rose-600',
    outline: 'bg-[#475569]',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1 text-sm',
  };

  return (
    <span
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {dot && (
        <span
          className={clsx('w-1.5 h-1.5 rounded-full shrink-0', dotColors[variant])}
        />
      )}
      {children}
    </span>
  );
}

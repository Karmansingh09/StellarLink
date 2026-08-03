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
    primary: 'bg-teal-50 text-[#0F766E] border border-teal-200/60',
    secondary: 'bg-slate-100 text-[#475569] border border-slate-200/60',
    accent: 'bg-teal-500/10 text-[#0F766E] border border-teal-500/20',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200/60',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200/60',
    error: 'bg-rose-50 text-rose-700 border border-rose-200/60',
    outline: 'bg-white border border-[#E2E8F0] text-[#475569]',
  };

  const dotColors = {
    primary: 'bg-[#0F766E]',
    secondary: 'bg-[#475569]',
    accent: 'bg-[#14B8A6]',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    error: 'bg-rose-500',
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

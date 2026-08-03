import clsx from 'clsx';

export default function Card({
  children,
  variant = 'default',
  className = '',
  padding = 'normal',
  ...props
}) {
  const variants = {
    default: 'bg-white border border-[#E2E8F0] shadow-sm shadow-slate-100/50',
    flat: 'bg-slate-50 border border-[#E2E8F0]',
    bordered: 'bg-white border-2 border-[#E2E8F0]',
  };

  const paddings = {
    none: 'p-0',
    compact: 'p-4',
    normal: 'p-6',
    generous: 'p-8',
  };

  return (
    <div
      className={clsx(
        'rounded-2xl transition-colors duration-150',
        variants[variant],
        paddings[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '', ...props }) {
  return (
    <div className={clsx('flex flex-col gap-1 mb-4', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '', ...props }) {
  return (
    <h3
      className={clsx('text-lg font-semibold text-[#0F172A] tracking-tight', className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({ children, className = '', ...props }) {
  return (
    <p className={clsx('text-sm text-[#475569]', className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ children, className = '', ...props }) {
  return (
    <div className={clsx('text-[#0F172A]', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '', ...props }) {
  return (
    <div
      className={clsx(
        'flex items-center justify-between pt-4 mt-6 border-t border-[#E2E8F0]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

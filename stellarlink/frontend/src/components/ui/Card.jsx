import clsx from 'clsx';

export default function Card({
  children,
  variant = 'default',
  className = '',
  padding = 'normal',
  ...props
}) {
  const variants = {
    default: 'bg-white border border-[#E2E8F0] shadow-[0_1px_2px_rgba(15,23,42,0.04)]',
    flat: 'bg-[#F8FAFC] border border-[#E2E8F0]',
    bordered: 'bg-white border-2 border-[#D9E2E1]',
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
        'rounded-[16px] transition-colors duration-150',
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
    <div className={clsx('flex flex-col gap-1.5 mb-4', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '', ...props }) {
  return (
    <h3
      className={clsx("font-['Space_Grotesk'] text-lg font-semibold tracking-tight text-[#0F172A]", className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({ children, className = '', ...props }) {
  return (
    <p className={clsx('text-sm leading-6 text-[#475569]', className)} {...props}>
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

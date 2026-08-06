import clsx from 'clsx';

export default function Container({
  children,
  size = 'lg',
  className = '',
  ...props
}) {
  const sizes = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-7xl',
    xl: 'max-w-[90rem]',
    full: 'max-w-360',
  };

  return (
    <div
      className={clsx('mx-auto w-full px-4 sm:px-6 lg:px-8', sizes[size], className)}
      {...props}
    >
      {children}
    </div>
  );
}

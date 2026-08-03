import clsx from 'clsx';

export default function Section({
  children,
  spacing = 'lg',
  bg = 'white',
  className = '',
  id,
  ...props
}) {
  const spacings = {
    none: 'py-0',
    sm: 'py-6 md:py-8',
    md: 'py-10 md:py-12',
    lg: 'py-14 md:py-20',
    xl: 'py-20 md:py-28',
  };

  const backgrounds = {
    white: 'bg-white text-[#0F172A]',
    slate: 'bg-slate-50 text-[#0F172A]',
    muted: 'bg-slate-100/60 text-[#0F172A]',
    dark: 'bg-[#0F172A] text-white',
    transparent: 'bg-transparent',
  };

  return (
    <section
      id={id}
      className={clsx('w-full', spacings[spacing], backgrounds[bg], className)}
      {...props}
    >
      {children}
    </section>
  );
}

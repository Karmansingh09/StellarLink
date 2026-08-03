import clsx from 'clsx';

export default function Heading({
  level = 2,
  children,
  subtitle,
  className = '',
  align = 'left',
  ...props
}) {
  const Tag = `h${level}`;

  const styles = {
    1: 'text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0F172A]',
    2: 'text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A]',
    3: 'text-xl sm:text-2xl font-bold text-[#0F172A]',
    4: 'text-lg font-semibold text-[#0F172A]',
    5: 'text-base font-semibold text-[#0F172A]',
    6: 'text-sm font-semibold uppercase tracking-wider text-[#475569]',
  };

  const alignments = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  if (subtitle) {
    return (
      <div className={clsx('flex flex-col gap-1.5', alignments[align], className)}>
        <Tag className={styles[level]} {...props}>
          {children}
        </Tag>
        <p className="text-base text-[#475569] max-w-2xl">{subtitle}</p>
      </div>
    );
  }

  return (
    <Tag className={clsx(styles[level], alignments[align], className)} {...props}>
      {children}
    </Tag>
  );
}

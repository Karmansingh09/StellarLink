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
    1: "font-['Space_Grotesk'] text-4xl leading-tight sm:text-5xl md:text-6xl font-semibold tracking-tight text-[#0F172A]",
    2: "font-['Space_Grotesk'] text-3xl sm:text-4xl font-semibold tracking-tight text-[#0F172A]",
    3: "font-['Space_Grotesk'] text-2xl sm:text-3xl font-semibold tracking-tight text-[#0F172A]",
    4: "font-['Space_Grotesk'] text-xl font-semibold tracking-tight text-[#0F172A]",
    5: "font-['Space_Grotesk'] text-base font-semibold tracking-tight text-[#0F172A]",
    6: 'text-sm font-semibold uppercase tracking-[0.18em] text-[#64748B]',
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
        <p className="max-w-2xl text-base leading-7 text-[#475569]">{subtitle}</p>
      </div>
    );
  }

  return (
    <Tag className={clsx(styles[level], alignments[align], className)} {...props}>
      {children}
    </Tag>
  );
}

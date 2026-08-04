import { motion } from 'framer-motion';
import clsx from 'clsx';
import Card from '../ui/Card';

export default function IndustryCard({
  title,
  description,
  stat,
  icon: Icon,
  accent = 'teal',
  className = '',
  delay = 0,
}) {
  const accents = {
    teal: 'border-[#CBE9E3] bg-[#EAF8F6] text-[#0F766E]',
    slate: 'border-[#E2E8F0] bg-[#F8FAFC] text-[#0F172A]',
    navy: 'border-[#D9E2E1] bg-white text-[#0F172A]',
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.45, delay }}
      whileHover={{ y: -6 }}
      className={clsx('h-full', className)}
    >
      <Card padding="generous" className="h-full border-[#E2E8F0] bg-white">
        <div className="flex h-full flex-col justify-between gap-8">
          <div className="space-y-5">
            <div className={clsx('flex h-12 w-12 items-center justify-center rounded-[16px] border', accents[accent])}>
              {Icon ? <Icon className="h-6 w-6" /> : null}
            </div>

            <div className="space-y-3">
              <h3 className="font-['Space_Grotesk'] text-[1.05rem] font-semibold tracking-tight text-[#0F172A]">
                {title}
              </h3>
              <p className="text-[15px] leading-7 text-[#475569]">{description}</p>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-[#E2E8F0] pt-4">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B]">
              {stat.label}
            </span>
            <span className="font-['Space_Grotesk'] text-lg font-semibold tracking-tight text-[#0F172A]">
              {stat.value}
            </span>
          </div>
        </div>
      </Card>
    </motion.article>
  );
}
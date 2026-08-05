import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

export default function OverviewCard({ title, value, change, icon: Icon, tone = 'primary', className = '' }) {
  const tones = {
    primary: 'bg-[#EAF8F6] text-[#0F766E] border-[#CBE9E3]',
    success: 'bg-[#EAF7EE] text-[#166534] border-[#CDECCD]',
    warning: 'bg-[#FFF7E6] text-[#92400E] border-[#F6E2B5]',
    neutral: 'bg-[#F1F5F9] text-[#475569] border-[#E2E8F0]',
  };

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 400, damping: 28 }}>
      <Card className={clsx('h-full', className)} padding="generous">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B]">{title}</p>
            <div className="mt-3 font-['Space_Grotesk'] text-2xl font-semibold tracking-tight text-[#0F172A] sm:text-[2rem] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={value}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.25 }}
                  className="inline-block"
                >
                  {value}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          <div className={clsx('flex h-12 w-12 items-center justify-center rounded-[16px] border shrink-0', tones[tone])}>
            <Icon className="h-5 w-5" />
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2">
          <Badge variant={change?.tone ?? 'success'} dot size="sm">
            {change?.label}
          </Badge>
          <span className="text-xs text-[#64748B] truncate">{change?.description}</span>
        </div>
      </Card>
    </motion.div>
  );
}
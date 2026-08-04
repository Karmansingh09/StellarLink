import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function LandingLayout() {
  const location = useLocation();

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="min-h-screen bg-white text-[#0F172A] selection:bg-[#0F766E]/15 selection:text-[#0F766E]"
    >
      <Outlet />
    </motion.div>
  );
}

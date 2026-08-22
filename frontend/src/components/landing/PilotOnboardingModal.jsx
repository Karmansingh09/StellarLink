import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, ShieldCheck, Star, CheckCircle, Wallet, Mail, User, MessageSquare } from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { useToast } from '../../context/ToastContext';

export default function PilotOnboardingModal({ isOpen, onClose }) {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    walletAddress: '',
    rating: 5,
    feedback: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full Name is required';
    if (!formData.email.includes('@')) errs.email = 'Valid work email is required';
    if (formData.walletAddress && !formData.walletAddress.startsWith('G')) {
      errs.walletAddress = 'Stellar public key must start with G';
    }
    if (!formData.feedback.trim()) errs.feedback = 'Feedback / Use case notes are required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      addToast('Please correct form errors before submitting', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      // Save locally to user feedback records array
      const existing = JSON.parse(localStorage.getItem('stellarlink_user_feedback') || '[]');
      const newEntry = {
        ...formData,
        id: `fb_${Date.now()}`,
        submittedAt: new Date().toISOString(),
      };
      existing.push(newEntry);
      localStorage.setItem('stellarlink_user_feedback', JSON.stringify(existing));

      setIsSubmitting(false);
      setSubmitted(true);
      addToast('Pilot request & feedback submitted successfully!', 'success');
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({ name: '', email: '', walletAddress: '', rating: 5, feedback: '' });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose?.();
          }}
        >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-lg rounded-[24px] border border-[#E2E8F0] bg-white p-6 sm:p-8 shadow-2xl overflow-hidden my-8"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-6 top-6 rounded-full p-2 text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF8F6] text-[#0F766E]">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold font-['Space_Grotesk'] text-[#0F172A]">
                Pilot Application Received!
              </h3>
              <p className="text-sm text-[#475569] max-w-sm mx-auto">
                Thank you for applying for the StellarLink Enterprise Pilot. Your feedback and wallet details have been securely recorded.
              </p>
              <div className="pt-4">
                <Button variant="primary" size="md" onClick={handleReset}>
                  Close Window
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-2 pr-8 border-b border-[#E2E8F0] pb-4">
                <Badge variant="success" dot size="sm">
                  StellarLink Level 5 Onboarding
                </Badge>
                <h2 className="font-['Space_Grotesk'] text-2xl font-bold text-[#0F172A]">
                  Start a Pilot & Product Feedback
                </h2>
                <p className="text-xs text-[#64748B]">
                  Submit your organization details, Stellar Testnet address, and feedback to join the machine settlement pilot network.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 h-4 w-4 text-[#94A3B8]" />
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full rounded-xl border pl-10 pr-3 py-2.5 text-xs text-[#0F172A] outline-none ${
                        errors.name ? 'border-rose-500' : 'border-[#D9E2E1] focus:border-[#0F766E]'
                      }`}
                    />
                  </div>
                  {errors.name && <p className="mt-1 text-[11px] text-rose-600">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 h-4 w-4 text-[#94A3B8]" />
                    <input
                      type="email"
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full rounded-xl border pl-10 pr-3 py-2.5 text-xs text-[#0F172A] outline-none ${
                        errors.email ? 'border-rose-500' : 'border-[#D9E2E1] focus:border-[#0F766E]'
                      }`}
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-[11px] text-rose-600">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-1">
                    Stellar Testnet Wallet Address (Optional)
                  </label>
                  <div className="relative">
                    <Wallet className="absolute left-3 top-3.5 h-4 w-4 text-[#94A3B8]" />
                    <input
                      type="text"
                      placeholder="GBHPLJTE52JP..."
                      value={formData.walletAddress}
                      onChange={(e) => setFormData({ ...formData, walletAddress: e.target.value })}
                      className={`w-full rounded-xl border pl-10 pr-3 py-2.5 text-xs font-mono text-[#0F172A] outline-none ${
                        errors.walletAddress ? 'border-rose-500' : 'border-[#D9E2E1] focus:border-[#0F766E]'
                      }`}
                    />
                  </div>
                  {errors.walletAddress && <p className="mt-1 text-[11px] text-rose-600">{errors.walletAddress}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-1">
                    Product Experience Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`h-6 w-6 ${
                            star <= formData.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-semibold text-[#0F766E] ml-2">
                      {formData.rating} / 5 Stars
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-1">
                    Pilot Requirements & Feedback *
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-[#94A3B8]" />
                    <textarea
                      rows={3}
                      placeholder="Describe your machine-to-machine payment requirements or product feedback..."
                      value={formData.feedback}
                      onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                      className={`w-full rounded-xl border pl-10 pr-3 py-2 text-xs text-[#0F172A] outline-none ${
                        errors.feedback ? 'border-rose-500' : 'border-[#D9E2E1] focus:border-[#0F766E]'
                      }`}
                    />
                  </div>
                  {errors.feedback && <p className="mt-1 text-[11px] text-rose-600">{errors.feedback}</p>}
                </div>

                <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#E2E8F0]">
                  <Button variant="ghost" size="md" onClick={onClose} type="button">
                    Cancel
                  </Button>
                  <Button variant="primary" size="md" isLoading={isSubmitting} type="submit" icon={Send}>
                    Submit Application
                  </Button>
                </div>
              </form>
            </>
          )}
        </motion.div>
      </div>
      )}
    </AnimatePresence>
  );
}

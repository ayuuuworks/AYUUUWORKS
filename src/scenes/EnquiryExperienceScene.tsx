import React, { useState } from 'react';
import { useAWE } from '../awe/context';
import { Send, Check, ArrowRight, ArrowDown } from 'lucide-react';

export const EnquiryExperienceScene: React.FC = () => {
  const { session, trackEvent, isReducedMotion } = useAWE();

  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    businessName: session.businessName || '',
    businessType: session.industry || 'Physical / Local Business',
    mainChallenge: session.primaryProblem || 'Look more premium',
    helpNeeded: session.diagnosis?.relevant_services?.[0] || 'Brand Identity & Flagship Website',
    budgetRange: 'Rs 2.5L – Rs 5L',
    timeline: 'Next 1–2 months',
    contact: '',
    additionalContext: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent('cta_clicked', { target: 'submit_project_brief', ...formData });
    setSubmitted(true);
  };

  const scrollToExplorer = () => {
    const el = document.getElementById('business-explorer');
    if (el) {
      el.scrollIntoView({ behavior: isReducedMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <section
      id="enquiry-experience"
      className="relative py-28 px-6 max-w-5xl mx-auto border-t border-[#242424] bg-[#111111]"
    >
      <div id="enquiry-section" className="hidden" />

      {/* Section 28: Final CTA */}
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <div className="text-[11px] font-mono tracking-widest text-[#B65B3C] uppercase">
          INITIATE · 09
        </div>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-display text-[#F2EFE8] tracking-tight leading-[0.98]">
          WHAT SHOULD YOUR BUSINESS<br />
          <span className="text-[#D7D0C5]">BECOME NEXT?</span>
        </h2>

        <p className="text-base sm:text-lg text-[#9B978F] max-w-xl mx-auto leading-relaxed pt-2">
          We take on a limited number of commissions each quarter to ensure uncompromised strategic focus, custom design, and engineering depth.
        </p>

        {/* Primary and Secondary CTA Buttons */}
        {!formOpen && !submitted && (
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setFormOpen(true)}
              className="w-full sm:w-auto px-8 py-4 rounded bg-[#F2EFE8] hover:bg-[#B65B3C] text-[#111111] hover:text-[#F2EFE8] font-display font-bold text-xs uppercase tracking-widest transition-all cursor-pointer shadow-sm"
            >
              START A PROJECT
            </button>

            <button
              onClick={scrollToExplorer}
              className="w-full sm:w-auto px-6 py-4 rounded bg-[#161616] hover:bg-[#202020] text-[#D7D0C5] hover:text-[#F2EFE8] border border-[#242424] text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
            >
              EXPLORE MY BUSINESS
            </button>
          </div>
        )}
      </div>

      {/* Section 29: Business Brief Form */}
      {formOpen && !submitted && (
        <div className="mt-14 p-8 sm:p-10 rounded border border-[#242424] bg-[#141414] max-w-3xl mx-auto space-y-8 animate-fadeIn">
          <div className="border-b border-[#242424] pb-4 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono uppercase text-[#B65B3C] font-bold">
                COMMISSION BRIEF
              </span>
              <h3 className="text-xl font-bold font-display text-[#F2EFE8] mt-1">
                TELL US ABOUT THE OPPORTUNITY.
              </h3>
            </div>
            <span className="text-xs font-mono text-[#9B978F]">
              INPUTS PRE-FILLED FROM SESSION
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-[#9B978F] block mb-1">
                  YOUR NAME *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Vikramaditya Singh"
                  className="w-full p-3 rounded bg-[#111111] border border-[#242424] text-xs text-[#F2EFE8] focus:border-[#B65B3C] outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-[#9B978F] block mb-1">
                  BUSINESS NAME
                </label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  placeholder="e.g. The Heritage Haveli"
                  className="w-full p-3 rounded bg-[#111111] border border-[#242424] text-xs text-[#F2EFE8] focus:border-[#B65B3C] outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-[#9B978F] block mb-1">
                  BUSINESS TYPE
                </label>
                <input
                  type="text"
                  value={formData.businessType}
                  onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                  className="w-full p-3 rounded bg-[#111111] border border-[#242424] text-xs text-[#D7D0C5] focus:border-[#B65B3C] outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-[#9B978F] block mb-1">
                  MAIN CHALLENGE
                </label>
                <input
                  type="text"
                  value={formData.mainChallenge}
                  onChange={(e) => setFormData({ ...formData, mainChallenge: e.target.value })}
                  className="w-full p-3 rounded bg-[#111111] border border-[#242424] text-xs text-[#D7D0C5] focus:border-[#B65B3C] outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-[#9B978F] block mb-1">
                  WHAT DO YOU NEED HELP WITH?
                </label>
                <select
                  value={formData.helpNeeded}
                  onChange={(e) => setFormData({ ...formData, helpNeeded: e.target.value })}
                  className="w-full p-3 rounded bg-[#111111] border border-[#242424] text-xs text-[#F2EFE8] focus:border-[#B65B3C] outline-none"
                >
                  <option>Brand Identity & Flagship Website</option>
                  <option>High-Performance Web Experience & Development</option>
                  <option>Atmospheric Content & Cinematic Video</option>
                  <option>Comprehensive Business Engine (Full-Stack)</option>
                  <option>Strategic Brand Repositioning</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono text-[#9B978F] block mb-1">
                  EXPECTED BUDGET RANGE
                </label>
                <select
                  value={formData.budgetRange}
                  onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                  className="w-full p-3 rounded bg-[#111111] border border-[#242424] text-xs text-[#F2EFE8] focus:border-[#B65B3C] outline-none"
                >
                  <option>Rs 1.5L – Rs 3L (Foundation)</option>
                  <option>Rs 3L – Rs 7L (Flagship Experience)</option>
                  <option>Rs 7L – Rs 15L+ (Enterprise / Comprehensive)</option>
                  <option>To be determined following diagnosis</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-[#9B978F] block mb-1">
                  DESIRED TIMELINE
                </label>
                <select
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  className="w-full p-3 rounded bg-[#111111] border border-[#242424] text-xs text-[#F2EFE8] focus:border-[#B65B3C] outline-none"
                >
                  <option>Immediate (Next 1–2 months)</option>
                  <option>Next Quarter (2–4 months)</option>
                  <option>Planning phase (4+ months)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono text-[#9B978F] block mb-1">
                  CONTACT (EMAIL OR WHATSAPP) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  placeholder="e.g. name@domain.com or +91 98765 43210"
                  className="w-full p-3 rounded bg-[#111111] border border-[#242424] text-xs text-[#F2EFE8] focus:border-[#B65B3C] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono text-[#9B978F] block mb-1">
                ADDITIONAL CONTEXT
              </label>
              <textarea
                rows={3}
                value={formData.additionalContext}
                onChange={(e) => setFormData({ ...formData, additionalContext: e.target.value })}
                placeholder="What are you trying to change? What would success look like for your business?"
                className="w-full p-3 rounded bg-[#111111] border border-[#242424] text-xs text-[#F2EFE8] focus:border-[#B65B3C] outline-none"
              />
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#242424]">
              <span className="text-xs text-[#9B978F]">
                Direct response within 24 hours from studio leadership.
              </span>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded bg-[#F2EFE8] hover:bg-[#B65B3C] text-[#111111] hover:text-[#F2EFE8] text-xs font-bold font-display uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>SUBMIT COMMISSION BRIEF</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Confirmation State */}
      {submitted && (
        <div className="mt-14 p-10 rounded border border-[#B65B3C] bg-[#161413] max-w-2xl mx-auto text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#B65B3C] text-[#F2EFE8] flex items-center justify-center mx-auto">
            <Check className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold font-display text-[#F2EFE8]">
            COMMISSION BRIEF RECEIVED.
          </h3>
          <p className="text-sm text-[#D7D0C5] max-w-md mx-auto leading-relaxed">
            Thank you, {formData.name || 'there'}. We have received your brief and diagnostic profile. Ayush Mishra will review your context and reach out directly via {formData.contact || 'your contact'}.
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                setSubmitted(false);
                setFormOpen(false);
              }}
              className="text-xs font-mono text-[#9B978F] hover:text-[#F2EFE8] underline"
            >
              ← Back to Studio Experience
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

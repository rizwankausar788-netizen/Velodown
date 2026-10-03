import React from 'react';
import { Zap, Palette, Smartphone, ShieldCheck } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Zap,
      title: 'Fast Processing',
      description: 'Optimized processing for quick results. Streamlined parsing eliminates artificial throttling.',
      iconColor: 'text-amber-400',
      bgColor: 'from-amber-500/10 to-transparent',
      borderColor: 'group-hover:border-amber-500/40',
    },
    {
      icon: Palette,
      title: 'Clean Interface',
      description: 'Simple UI without unnecessary distractions. Zero ads, zero spam popups, and no deceptive buttons.',
      iconColor: 'text-indigo-400',
      bgColor: 'from-indigo-500/10 to-transparent',
      borderColor: 'group-hover:border-indigo-500/40',
    },
    {
      icon: Smartphone,
      title: 'Mobile Friendly',
      description: 'Works beautifully on phones, tablets and desktops. Responsive touch controls designed like a native app.',
      iconColor: 'text-blue-400',
      bgColor: 'from-blue-500/10 to-transparent',
      borderColor: 'group-hover:border-blue-500/40',
    },
    {
      icon: ShieldCheck,
      title: 'Privacy Focused',
      description: 'Keep the interface simple and minimize unnecessary data collection. No logs, tracking cookies, or stored copies.',
      iconColor: 'text-emerald-400',
      bgColor: 'from-emerald-500/10 to-transparent',
      borderColor: 'group-hover:border-emerald-500/40',
    },
  ];

  return (
    <section id="features" className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto space-y-14">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase">
            Engineering Excellence
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Designed for Modern Media
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Everything you need for effortless video downloads without clutter or friction.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className={`group glass-panel rounded-2xl p-6 border border-white/[0.08] ${feat.borderColor} transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl flex flex-col justify-between`}
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-b ${feat.bgColor} border border-white/10 flex items-center justify-center ${feat.iconColor} mb-5 group-hover:scale-105 transition-transform duration-300 shadow-inner`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-indigo-200 transition-colors">
                    {feat.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.04] text-[11px] text-slate-400 font-medium">
                  Verified standard
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

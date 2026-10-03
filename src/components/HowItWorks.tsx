import React from 'react';
import { Link2, SlidersHorizontal, DownloadCloud, Sparkles } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Paste Link',
      desc: 'Copy your video URL from YouTube or Instagram and paste it into VeloDown.',
      icon: Link2,
      accent: 'from-blue-500/20 to-indigo-500/20',
      iconColor: 'text-blue-400',
      borderColor: 'group-hover:border-blue-500/40',
    },
    {
      num: '02',
      title: 'Choose Quality',
      desc: 'Select the available resolution (up to 4K 60FPS) or extract audio format.',
      icon: SlidersHorizontal,
      accent: 'from-indigo-500/20 to-purple-500/20',
      iconColor: 'text-indigo-400',
      borderColor: 'group-hover:border-indigo-500/40',
    },
    {
      num: '03',
      title: 'Download',
      desc: 'Download your high-speed packaged media directly to your device with one click.',
      icon: DownloadCloud,
      accent: 'from-purple-500/20 to-pink-500/20',
      iconColor: 'text-purple-400',
      borderColor: 'group-hover:border-purple-500/40',
    },
  ];

  return (
    <section id="how-it-works" className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto space-y-14">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase">
            Simple 3-Step Flow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How It Works
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Streamlined process designed to get your video saved in under ten seconds.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connector Line behind steps for desktop */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-blue-500/20 via-indigo-500/30 to-purple-500/20 -translate-y-8 z-0 pointer-events-none" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className={`group relative glass-panel rounded-2xl p-7 border border-white/[0.08] ${step.borderColor} transition-all duration-300 hover:-translate-y-1.5 z-10 flex flex-col justify-between`}
              >
                {/* Step Index Number */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-extrabold font-mono text-white/20 group-hover:text-indigo-400/40 transition-colors">
                    {step.num}
                  </span>
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${step.accent} border border-white/10 flex items-center justify-center ${step.iconColor} shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-200 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Micro highlight indicator */}
                <div className="mt-6 pt-4 border-t border-white/[0.05] flex items-center text-[11px] text-slate-400 font-medium">
                  <span>Step {idx + 1} of 3</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

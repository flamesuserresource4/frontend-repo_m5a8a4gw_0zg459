import React from 'react';
import Spline from '@splinetool/react-spline';

const Hero = () => {
  return (
    <section className="relative w-full h-[420px] sm:h-[520px] md:h-[640px] overflow-hidden rounded-3xl">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/qQUip0dJPqrrPryE/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-900/20 via-slate-900/40 to-slate-900/70" />

      <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white drop-shadow-lg">
            Venyo
          </h1>
          <p className="mt-4 sm:mt-6 text-slate-200/90 text-base sm:text-lg md:text-xl">
            Smart Venue Management for Campus and Community
          </p>
          <div className="mt-6 sm:mt-8 flex items-center justify-center gap-3">
            <span className="px-3 py-1 rounded-full bg-cyan-400/20 text-cyan-200 text-sm border border-cyan-300/30 backdrop-blur-md">
              Futuristic • Glassmorphism • Calm
            </span>
            <span className="px-3 py-1 rounded-full bg-blue-400/20 text-blue-200 text-sm border border-blue-300/30 backdrop-blur-md hidden sm:inline-flex">
              Secure Identity Focus
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

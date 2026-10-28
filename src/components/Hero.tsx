import React from "react";
import { Cloud, Eye, RefreshCw, Shield, Smartphone } from "lucide-react";
import { PortfolioStyle } from "../types";
import { BrandButton } from "./BrandButton";
import { SectionDecorations } from "./SectionDecorations";
import fallbackImage from "../public/images/hompage-animation-1-fallback.png";

interface HeroProps {
  onGetStartedClick: () => void;
  onExploreClick: () => void;
  onOpenDemo: (style: PortfolioStyle) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onGetStartedClick,
  onExploreClick,
}) => (
  <section className="relative isolate min-h-[calc(100vh-64px)] overflow-hidden bg-[radial-gradient(ellipse_at_50%_45%,#ffffff_20%,#f5faff_72%,#eaf5ff_100%)] px-4 pb-12 pt-10 sm:px-6 lg:px-8 lg:pt-14">
    <SectionDecorations variant="hero" className="-z-10" />

    <div className="relative mx-auto max-w-[1460px]">
      <div className="grid items-center gap-8 lg:grid-cols-[1.06fr_0.94fr] lg:gap-2">
        <div className="relative z-10 space-y-7 sm:space-y-8 lg:pl-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-100/90 px-4 py-2 text-lg font-bold text-slate-900">
            <span className="text-xl" aria-hidden="true">
              👋
            </span>
            <span>Hi, I’m Jomo</span>
          </div>
          <h1 className="relative w-fit text-balance text-xl md:text-5xl font-extrabold leading-[1.03] tracking-[-0.045em] text-[#07142f] ">
            It’s Almost Free
            <span
              aria-hidden="true"
              className="absolute -bottom-3 left-[65%] h-2.5 w-36 -rotate-2 rounded-full bg-yellow-400 sm:w-52"
            />
            <span
              aria-hidden="true"
              className="absolute -bottom-6 left-[73%] h-2 w-24 rotate-[-5deg] rounded-full bg-yellow-400"
            />
          </h1>
          <p className="max-w-[760px] text-lg font-medium leading-[1.55] text-[#344668] sm:text-2xl">
            Get your own clean, personalized portfolio website to showcase your
            skills, projects, and experience — for just ₦5,000.
          </p>
          <div className="relative flex flex-col items-center gap-4 pt-1 sm:flex-row sm:items-center">
            <span
              aria-hidden="true"
              className="absolute -left-12 top-1/2 hidden h-16 w-8 -translate-y-1/2 sm:block"
            >
              <i className="absolute right-0 top-1 h-1 w-6 rotate-[32deg] rounded-full bg-yellow-400" />
              <i className="absolute right-1 top-1/2 h-1 w-6 rounded-full bg-yellow-400" />
              <i className="absolute right-0 bottom-1 h-1 w-6 -rotate-[32deg] rounded-full bg-yellow-400" />
            </span>
            <BrandButton
              type="button"
              onClick={onGetStartedClick}
              showPortfolioIcon
              className="min-h-[72px] px-10 text-lg"
            >
              Get My Portfolio
            </BrandButton>
            <BrandButton
              type="button"
              onClick={onExploreClick}
              variant="outline"
              className="min-h-[64px] px-8 text-lg text-nowrap"
            >
              <div className="flex flex-row gap-2">
                <Eye className="h-5 w-5" />
                Explore Examples
              </div>
            </BrandButton>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[800px] lg:-mr-4">
          <div
            aria-hidden="true"
            className="absolute inset-[5%] rounded-full bg-blue-100/70 blur-2xl"
          />
          <figure className="relative">
            <img
              className="block h-auto w-full"
              src={fallbackImage}
              alt="Illustrated preview of a personalized portfolio website"
            />
          </figure>
        </div>
      </div>

      <div className="mx-auto mt-8 flex max-w-[1100px] flex-wrap items-center justify-center gap-x-7 gap-y-4 rounded-full border border-blue-100 bg-white/45 px-6 py-5 text-sm font-medium text-[#263c67] sm:mt-9 sm:gap-x-8 sm:px-10 sm:text-base">
        <span className="inline-flex items-center gap-3">
          <Smartphone className="h-6 w-6 text-blue-600" />
          Mobile-friendly
        </span>
        <span className="hidden h-5 border-l border-blue-200 sm:block" />
        <span className="inline-flex items-center gap-3">
          <Cloud className="h-7 w-7 text-blue-600" />
          Free hosting
        </span>
        <span className="hidden h-5 border-l border-blue-200 sm:block" />
        <span className="inline-flex items-center gap-3">
          <RefreshCw className="h-6 w-6 text-blue-600" />5 revision rounds
        </span>
        <span className="hidden h-5 border-l border-blue-200 sm:block" />
        <span className="inline-flex items-center gap-3">
          <Shield className="h-6 w-6 text-blue-600" />
          Money-back guarantee under our stated terms
        </span>
      </div>

      <div className="relative z-10 mt-8 flex items-center justify-center gap-4 text-center text-sm text-[#536789] sm:mt-10 sm:text-base">
        <div className="flex -space-x-2" aria-hidden="true">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-xs font-bold text-white">
            J
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-amber-600 text-xs font-bold text-white">
            A
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-slate-700 text-xs font-bold text-white">
            T
          </span>
        </div>
        <span>
          By JomoCode — helping you access the technology you deserve.
        </span>
      </div>
    </div>
  </section>
);

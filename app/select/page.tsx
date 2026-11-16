"use client";

import NavBar from "@/components/NavBar";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";
import small from "@/public/Rectangle-small.png";
import medium from "@/public/Rectangle-medium.png";
import large from "@/public/Rectangle-large.png";
import { useState } from "react";

export default function select() {
  const [hoverId, setHoverId] = useState<number | null>(null);

  return (
    <div className="h-dvh flex flex-col overflow-hidden">
      <NavBar />
      <div>
        <div className="absolute top-10 left-8 text-left mt-5">
          <h1 className="text-base font-semibold leading-6 tracking-tight">
            A.I. ANALYSIS
          </h1>
          <p className="text-sm mt-1 text-muted-foreground uppercase leading-6">
            A.I. has estimated the following.<br></br>Fix estimated information
            if needed.
          </p>
        </div>
        <div className="h-[78.3vh] flex flex-col items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className={`absolute transition-all duration-400 ${hoverId === 1 ? "w-150.5 h-150.5 opacity-100" : "w-100 h-100 opacity-0"}`}
              >
                <img
                  src={small.src}
                  alt="Small"
                  className="absolute h-full w-full inset-0 object-fit"
                />
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className={`absolute transition-all duration-400 ${hoverId === 2 ? "w-170.5 h-170.5 opacity-100" : "w-100 h-100 opacity-0"}`}
              >
                <img
                  src={medium.src}
                  alt="Medium"
                  className="absolute h-full w-full inset-0 object-fit"
                />
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className={`absolute transition-all duration-400 ${hoverId === 3 ? "w-190.5 h-190.5 opacity-100" : "w-100 h-100 opacity-0"}`}
              >
                <img
                  src={large.src}
                  alt="Large"
                  className="absolute h-full w-full inset-0 object-fit"
                />
              </div>
            </div>
            <div className="relative z-10 grid grid-cols-3 grid-rows-3 gap-0 scale-65 sm:scale-100">
              <div className="flex items-center justify-center col-start-2">
                <Link href="/summary">
                  <button
                    className="w-[153.88px] h-[153.88px] bg-gray-200 hover:bg-gray-300 transform rotate-45 flex items-center justify-center -m-5 cursor-pointer font-semibold leading-6 tracking-tight uppercase hover:scale-[1.05] transition-transform duration-300"
                    onMouseEnter={() => setHoverId(1)}
                    onMouseLeave={() => setHoverId(null)}
                  >
                    <span className="transform -rotate-45">Demographics</span>
                  </button>
                </Link>
              </div>
              <div className="flex items-center justify-center row-start-2 col-start-1">
                <button
                  className="w-[153.88px] h-[153.88px] bg-gray-100 hover:bg-gray-300 transform rotate-45 flex items-center justify-center -m-5 cursor-not-allowed font-semibold leading-6 tracking-tight uppercase"
                  onMouseEnter={() => setHoverId(2)}
                  onMouseLeave={() => setHoverId(null)}
                >
                  <span className="transform -rotate-45">
                    Cosmetic Concerns
                  </span>
                </button>
              </div>
              <div className="flex items-center justify-center row-start-2 col-start-3">
                <button
                  className="w-[153.88px] h-[153.88px] bg-gray-100 hover:bg-gray-300 transform rotate-45 flex items-center justify-center -m-5 cursor-not-allowed font-semibold leading-6 tracking-tight uppercase"
                  onMouseEnter={() => setHoverId(2)}
                  onMouseLeave={() => setHoverId(null)}
                >
                  <span className="transform -rotate-45">
                    Skin Type Details
                  </span>
                </button>
              </div>
              <div className="flex items-center justify-center row-start-3 col-start-2">
                <button
                  className="w-[153.88px] h-[153.88px] bg-gray-100 hover:bg-gray-300 transform rotate-45 flex items-center justify-center -m-5 cursor-not-allowed font-semibold leading-6 tracking-tight uppercase"
                  onMouseEnter={() => setHoverId(3)}
                  onMouseLeave={() => setHoverId(null)}
                >
                  <span className="transform -rotate-45">Weather</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-4 md:pt-12 pb-8 sticky md:static bottom-20 md:bottom-40 mb-0 md:mb-0">
          <div className="flex justify-between max-w-full mx-auto px-13 md:px-9">
            <Link href="/result" className="relative" aria-label="back">
              <div>
                <div className="relative w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
                  <span className="-rotate-45 text-xs font-semibold sm:hidden">
                    BACK
                  </span>
                </div>
                <div className="group hidden sm:flex flex-row relative justify-center items-center">
                  <div className="w-12 h-12 hidden sm:flex justify-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300"></div>
                  <FaPlay className="absolute rotate-180 left-3.25 bottom-3.75 scale-[0.7] hidden sm:block group-hover:scale-[0.82] ease duration-300" />
                  <span className="text-sm font-semibold hidden sm:block ml-6">
                    BACK
                  </span>
                </div>
              </div>
            </Link>
            <Link href="/summary">
              <div>
                <div className="w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
                  <span className="-rotate-45 text-xs text-center font-semibold sm:hidden">
                    SUM
                  </span>
                </div>
                <div className="group hidden sm:flex flex-row relative justify-center items-center">
                  <span className="text-sm font-semibold hidden sm:block mr-5">
                    GET SUMMARY
                  </span>
                  <div className="w-12 h-12 hidden sm:flex justify-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300"></div>
                  <FaPlay className="absolute right-3.25 bottom-3.75 scale-[0.7] hidden sm:block group-hover:scale-[0.82] ease duration-300" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

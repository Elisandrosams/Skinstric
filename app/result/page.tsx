import NavBar from "@/components/NavBar";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";

export default function result() {
  return (
    <div className="md:min-h-screen md:flex md:flex-col">
      <NavBar />
      <div className="flex-1 flex flex-col justify-center relative md:pt-16">
        <div className="absolute top-2 left-9 md:left-8 text left">
          <p className="font-semibold text-xs md:text-sm">TO START ANALYSIS</p>
        </div>
        <div className="flex-[0.4] md:flex-1 flex flex-col md:flex-row items-center xl:justify-center relative mb-0 md:mb-30 -space-y-5 md:space-y-0">
          <div className="relative md:absolute md:left-[55%] lg:left-[50%] xl:left-[40%] md:translate-y-0 translate-y-[-1%] md:-translate-x-full flex flex-col items-center justify-center">
            <div className="w-67.5 h-67.5 md:w-120.5 md:h-120.5"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="absolute bottom-[1%] right-22.5 md:top-[30.9%] md:-right-3 -translate-y-5">
                <p className="text-xs md:text-sm font-normal mt-1 leading-6">
                  ALLOW A.I. <br></br>TO SCAN YOUR FACE
                </p>
              </div>
            </div>
          </div>
          <div className="relative md:absolute md:left-[45%] lg:left-[50%] xl:left-[55%] flex flex-col items-center mt-12 md:mt-0 justify-center md:translate-y-0 translate-y-[-10%] transition-opacity dration-30 opacity-100">
            <div className="w-67.5 h-67.5 md:w-120.5 md:h-120.5"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="absolute top-[75%] md:top-[70%] md:left-4.25 -translate-y-2.5">
                <p className="text-[12px] md:text-[14px] font-normal mt-2 leading-6 text-right">
                  ALLOW A.I. <br></br>ACCESS GALLERY
                </p>
              </div>
            </div>
          </div>
          <div className="absolute -top-6 right-7 md:-top-12.5 md:right-8 transition-opacity duration-300 opacity-100">
            <h1 className="text-xs md:text-sm font-normal mb-1">Preview</h1>
            <div className="w-24 h-24 md:w-32 md:h-32 border border-gray-300 overflow-hidden"></div>
          </div>
          <input accept="image/*" type="file" className="hidden" />
        </div>
        <div className="pt-4 md:pt-0 pb-8 sticky md:static bottom-30.5 mb-0 md:mb-0">
          <div className="absolute bottom-8 w-full flex justify-between md:px-9 px-13">
            <Link href="/testing" className="relative" aria-label="back">
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
            <Link href="/select">
              <div className="hidden">
                <div className="w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
                  <span className="-rotate-45 text-xs font-semibold sm:hidden">
                    PROCEED
                  </span>
                </div>
                <div className="group hidden sm:flex flex-row relative justify-center items-center">
                  <span className="text-sm font-semibold hidden sm:block mr-5">
                    PROCEED
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

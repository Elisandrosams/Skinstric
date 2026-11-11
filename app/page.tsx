import NavBar from "../components/NavBar";
import { FaPlay } from "react-icons/fa";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <NavBar />
      <div className="max-sm:scale-[0.75] max-sm:origin-center max-sm:p-6">
        <div className="flex flex-col items-center justify-center h-[71dvh] md:fixed md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
          <div className="absolute inset-0 flex items-center justify-center lg:hidden">
            <div className="w-87.5 h-87.5 border border-dotted border-[#A0A4AB] rotate-45 absolute top-1/2 left-1/2 translate-x-[-52%] -translate-y-1/2"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center lg:hidden">
            <div className="w-105 h-105 border border-dotted border-[#A0A4AB] rotate-45 absolute top-1/2 left-1/2 translate-x-[-52%] -translate-y-1/2"></div>
          </div>
          <div id="main-heading" className="relative z-10 text-center">
            <h1 className="text-[60px] text-[#1A1B1C] lg:text-[100px] font-inter font-normal tracking-tighter leading-none opacity-0" style={{ opacity: 1 }}>
              Sophisticated
              <br></br>
              <span className="text-[#1A1B1C] block">skincare</span>
              </h1>
          </div>
          <p className="z-10 block lg:hidden w-[30ch] mt-4 text-[16px] font-semibold text-center text-[#1A1B1C83]">
            Skinstric developed an A.I. that creates a highly-personalized routine tailored to what your skin needs.
          </p>
          <div className="z-10 mt-4 lg:hidden">
            <Link href="/testing">
              <button className="relative flex items-center gap-4 hover:scale-105 duration-300">
                <span className="text-[12px] font-bold cursor-pointer">ENTER EXPERIENCE</span>
                <div className="w-6 h-6 border border-solid border-black rotate-45 cursor-pointer"></div>
                <span className="absolute left-35.5 scale-[0.5] hover:scale-60 duration-300">
                  <FaPlay className="h-4 w-4 cursor-pointer"/>
                </span>
              </button>
            </Link>
          </div>
          <div className="hidden lg:block fixed bottom-[calc(-7vh)] left-[calc(-20vw)] xl:left-[calc(-27vw)] 2xl:left-[calc(-31vw)] [@media(width>1920px)]:left-[calc(-33vw)] font-normal text-sm text-[#1A1B1C] space-y-3 uppercase">
            <p>
              Skinstric developed A.I. that creates a
              <br></br>
              highly-personalized routine tailored to 
              <br></br>
              what your skin needs.
            </p>
          </div>
          <div id="left-section" className="hidden lg:block fixed left-[calc(-53vw)] xl:left-[calc(-50vw)] top-1/2 -translate-y-1/2 w-125 h-125 transition-opacity duration-500 ease-in-out opacity-100" style={{ opacity: 1 }}>
            <div className="relative w-full h-full">
              <div className="w-full h-full border border-dotted border-[#A0A4AB] rotate-45 fixed inset-0"></div>
              <button id="discover-button" className="group inline-flex items-center justify-center gap-4 whitespace-nowrap rounded-md text-sm font-normal text-[#1A1B1C] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer h-9 absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/5 xl:translate-x-1/6 [@media(width>=1920px)]:translate-x-1/20 px-3 py-1">
                <div className="w-7.5 h-7.5 border border-solid border-black rotate-45 cursor-pointer group-hover:scale-110 duration-300"></div>
                <FaPlay className="absolute left-4.5 top-2.75 scale-[0.7] rotate-180 group-hover:scale-80 duration-300"/>
                <span>DISCOVER A.I.</span>
              </button>
            </div>
          </div>
          <div id="right-section" className="hidden lg:block fixed right-[calc(-53vw)] xl:right-[calc(-50vw)] top-1/2 -translate-y-1/2 w-125 h-125 transition-opacity duration-500 ease-in-out opacity-100" style={{ opacity: 1 }}>
            <div className="relative w-full h-full">
              <div className="w-full h-full border border-dotted border-[#A0A4AB] rotate-45 fixed inset-0"></div>
              <Link href="/testing">
                <button className="group inline-flex items-center justify-center gap-4 whitespace-nowrap rounded-md text-sm font-normal text-[#1A1B1C] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer h-9 absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/5 xl:-translate-x-1/6 [@media(width>=1920px)]:-translate-x-1/20 px-3 py-1">
                  <div className="w-7.5 h-7.5 border border-solid border-black rotate-45 cursor-pointer group-hover:scale-110 duration-300"></div>
                  <FaPlay className="absolute left-5.5 top-2.75 scale-[0.7] group-hover:scale-80 duration-300"/>
                  <span>TAKE TEST</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

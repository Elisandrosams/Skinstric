import left from "@/public/left-bracket.png"
import right from "@/public/right-bracket.png"

export default function NavBar() {
  return (
  <nav className="flex flex-row w-full h-16 justify-between py-3 mb-3 px-1 relative z-1000">
    <div className="flex flex-row pt-1 scale-75 justify-center items-center">
        <a href="/" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md h-9 px-4 py-2 font-semibold text-sm mr-2 line-clamp-4 leading-4 text-[#1A1B1C] cursor-pointer">SKINSTRIC</a>
        <img src={left.src} className="w-1 h-4.25 opacity-70" />
        <p className="text-[#1A1B1C83] text-opacity-70 text-sm font-semibold mx-1.5">INTRO</p>
        <img src={right.src} className="w-1 h-4.25 opacity-70" />
    </div>
    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap h-9 px-4 py-2 mx-4 scale-[0.8] font-semibold text-[#FCFCFC] leading-4 bg-[#1A1B1C] text-[10px] cursor-not-allowed">ENTER CODE</button>
  </nav>
  );
}
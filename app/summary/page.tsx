"use client";
import NavBar from "@/components/NavBar";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";

type Category = "race" | "age" | "gender";
type Demographics = Record<Category, Record<string, number>>;

const CATEGORIES: { key: Category; label: string }[] = [
  { key: "race", label: "RACE" },
  { key: "age", label: "AGE" },
  { key: "gender", label: "SEX" },
];

const CIRCUMFERENCE = 308.819;

const sortByConfidence = (scores: Record<string, number> = {}) =>
  Object.entries(scores)
    .map(([label, value]) => [label, Math.round(value * 100)] as const)
    .sort((a, b) => b[1] - a[1]);

export default function Summary() {
  const [image, setImage] = useState<string | null>(null);
  const [demographics, setDemographics] = useState<Demographics | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>("race");
  const [selected, setSelected] = useState<Partial<Record<Category, string>>>(
    {},
  );

  const sorted = sortByConfidence(demographics?.[activeCategory]);
  const displayLabel = selected[activeCategory] ?? sorted[0]?.[0] ?? "";
  const displayPercent =
    sorted.find(([label]) => label === displayLabel)?.[1] ?? 0;
  const activeLabel = CATEGORIES.find((c) => c.key === activeCategory)!.label;

  useEffect(() => {
    setImage(sessionStorage.getItem("capturedImage"));
  }, []);

  const analyzeImage = async (img: string) => {
    try {
      const res = await fetch(
        "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: img.split(",")[1] ?? img }),
        },
      );
      const data = await res.json();
      setDemographics(data.data);
    } catch (err) {
      console.error("Phase two request failed:", err);
    }
  };

  useEffect(() => {
    if (image) analyzeImage(image);
  }, [image]);

  return (
    <div>
      <NavBar />
      <div className="h-screen md:h-[90vh] flex felx-col md:mt-5">
        <main className="flex-1 w-full md:overflow-hidden overflow-auto">
          <div className="md:h-full max-w-full mx-5 px-4 md:px-auto flex flex-col">
            <div className="text-start ml-4 mb-4 md:ml-0 md:mb-10">
              <h2 className="text-base md:text-base font-semibold mb-1 leading-6">
                A.I. ANALYSIS
              </h2>
              <h3 className="text-3xl md:text-7xl font-normal tracking-tighter leading-16">
                DEMOGRAPHICS
              </h3>
              <h4 className="text-sm mt-2 leading-6">PREDICTED RACE & AGE</h4>
            </div>
            <div className="grid md:grid-cols-[1.5fr_8.5fr_3.15fr] gap-4 mt-10 mb-40 md:gap-4 pb-0 md:pb-0 md:mb-0">
              <div className="bg-white-100 space-y-3 md:flex md:flex-col h-[62%]">
                {CATEGORIES.map(({ key, label }) => {
                  const isActive = key === activeCategory;
                  const top =
                    selected[key] ??
                    sortByConfidence(demographics?.[key])[0]?.[0];
                  return (
                    <div
                      key={key}
                      onClick={() => setActiveCategory(key)}
                      className={`p-3 cursor-pointer flex-1 flex flex-col justify-between border-t ${
                        isActive
                          ? "bg-[#1A1B1C] text-white"
                          : "bg-[#f3f3f4] hover:bg-[#e1e1e2]"
                      }`}
                    >
                      <p className="text-base font-semibold capitalize">
                        {top ?? "Loading..."}
                      </p>
                      <h4 className="text-base font-semibold mb-1">{label}</h4>
                    </div>
                  );
                })}
              </div>
              <div className="relative bg-gray-100 p-4 flex flex-col items-center justify-center md:h-[57vh] md:border-t">
                <p className="hidden md:block md:absolute text-[40px] mb-2 left-5 top-2 capitalize">
                  {displayLabel || "Analyzing..."}
                </p>
                <div className="relative md:absolute w-full max-w-96 aspect-square mb-4 md:right-5 md:bottom-2">
                  <div className="w-full h-full max-h-96 relative scale-100 origin-center">
                    <svg
                      className="CircularProgressbar text-[#1A1B1C]"
                      viewBox="0 0 100 100"
                      data-test-id="CircularProgressbar"
                    >
                      <path
                        className="CircularProgressbar-trail"
                        d="
                        M 50,50
                        m 0,-49.15
                        a 49.15,49.15 0 1 1 0,98.3
                        a 49.15,49.15 0 1 1 0,-98.3
                        "
                        strokeWidth="1.7"
                        fillOpacity="0"
                        style={{
                          stroke: "var(--color-gray-300, #9ca3af)",
                          strokeLinecap: "butt",
                          strokeDasharray: "308.819px, 308.819px",
                          strokeDashoffset: "0px",
                        }}
                      ></path>
                      <path
                        className="CircularProgressbar-path"
                        d="
                        M 50,50
                        m 0,-49.15
                        a 49.15,49.15 0 1 1 0,98.3
                        a 49.15,49.15 0 1 1 0,-98.3
                        "
                        strokeWidth="1.7"
                        fillOpacity="0"
                        style={{
                          stroke: "rgb(26, 27, 28)",
                          strokeLinecap: "butt",
                          transitionDuration: "0.8s",
                          strokeDasharray: "308.819px, 308.819px",
                          strokeDashoffset: `${CIRCUMFERENCE * (1 - displayPercent / 100)}px`,
                        }}
                      ></path>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-3xl md:text-[40px] font-normal">
                        {displayPercent}
                        <span className="absolute text-xl md:text-3xl">%</span>
                      </p>
                    </div>
                  </div>
                </div>
                <p className="md:absolute text-xs text-[#a0a4ab] md:text-sm lg:text-base font-normal mb-1 leading-6 md:bottom-[-15%] md:left-[22%] lg:left-[30%] xl:left-[40%] 2xl:left-[45%]">
                  If A.I. estimate is wrong, select the correct one
                </p>
              </div>
              <div className="bg-gray-100 pt-4 pb-4 md:border-t">
                <div className="space-y-0">
                  <div className="flex justify-between px-4">
                    <h4 className="text-base leading-6 tracking-tight font-medium mb-2">
                      {activeLabel}
                    </h4>
                    <h4 className="text-base leading-6 tracking-tight font-medium mb-2">
                      A.I. CONFIDENCE
                    </h4>
                  </div>
                  {sorted.map(([label, percent]) => (
                    <div
                      key={label}
                      onClick={() =>
                        setSelected((prev) => ({
                          ...prev,
                          [activeCategory]: label,
                        }))
                      }
                      className={`flex justify-between items-center h-12 px-4 cursor-pointer ${
                        label === displayLabel
                          ? "bg-[#1A1B1C] text-white"
                          : "hover:bg-[#e1e1e2]"
                      }`}
                    >
                      <span className="font-normal text-base leading-6 tracking-tight capitalize">
                        {label}
                      </span>
                      <span className="font-normal text-base leading-6 tracking-tight">
                        {percent}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="pt-4 md:pt-9.25 pb-6 sticky bottom-40 md:static md:bottom-0 mb-8 md:mb-16">
              <div className="flex justify-between max-w-full mx-auto px-4 md:px-0">
                <Link href="/select" className="relative" aria-label="back">
                  <div>
                    <div className="relative bg-white w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
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
                <Link href="/">
                  <div>
                    <div className="w-12 h-12 bg-white flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
                      <span className="-rotate-45 text-xs font-semibold sm:hidden">
                        HOME
                      </span>
                    </div>
                    <div className="group hidden sm:flex flex-row relative justify-center items-center">
                      <span className="text-sm font-semibold hidden sm:block mr-5">
                        HOME
                      </span>
                      <div className="w-12 h-12 hidden sm:flex justify-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300"></div>
                      <FaPlay className="absolute right-3.25 bottom-3.75 scale-[0.7] hidden sm:block group-hover:scale-[0.82] ease duration-300" />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

"use client";

import { useLayoutEffect, useRef, useState, type SubmitEvent } from "react";
import NavBar from "@/components/NavBar";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";

const API_URL =
  "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne";

type Step = "name" | "location" | "done";

const isValidText = (value: string) => /^[A-Za-z\s'-]+$/.test(value);

export default function Testing() {
  const [step, setStep] = useState<Step>("name");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const requestRef = useRef<AbortController | null>(null);

  useLayoutEffect(() => {
    return () => {
      requestRef.current?.abort();
      requestRef.current = null;
      setStep("name");
      setName("");
      setLocation("");
      setError("");
      setLoading(false);
    };
  }, []);

  const handleNameSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = name.trim();
    if (!value || !isValidText(value)) {
      setError("Please enter a valid name without numbers or special characters.");
      return;
    }
    setError("");
    setName(value);
    setStep("location");
  };

  const handleLocationSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = location.trim();
    if (!value || !isValidText(value)) {
      setError("Please enter a valid city without numbers or special characters.");
      return;
    }
    setError("");
    setLocation(value);
    setLoading(true);

    const controller = new AbortController();
    requestRef.current = controller;

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, location: value }),
        signal: controller.signal,
      });
      if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
      await res.json();
      setStep("done");
    } catch (err) {
      if (controller.signal.aborted) return;
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      if (requestRef.current === controller) requestRef.current = null;
      setLoading(false);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="min-h-[90vh] flex flex-col items-center justify-center text-center">
        <div className="absolute top-16 left-9 text left">
          <p className="font-semibold text-xs">TO START ANALYSIS</p>
        </div>
        <div className="relative flex flex-col items-center justify-center mb-40 w-full h-full">
          {step !== "done" && !loading && (
            <p className="text-sm text-gray-400 tracking-wider uppercase mb-1">CLICK TO TYPE</p>
          )}

          {step === "name" && (
            <form className="relative z-10" onSubmit={handleNameSubmit}>
              <input
                className="text-5xl sm:text-6xl font-normal text-center bg-transparent border-b border-black focus:outline-none appearance-none w-93 sm:w-108 pt-1 tracking-[-0.07em] leading-16 text-[#1A1B1C] z-10"
                type="text"
                placeholder="Introduce Yourself"
                autoFocus
                name="name"
                autoComplete="off"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button type="submit" className="sr-only">Submit</button>
            </form>
          )}

          {step === "location" && !loading && (
            <form className="relative z-10" onSubmit={handleLocationSubmit}>
              <input
                className="text-5xl sm:text-6xl font-normal text-center bg-transparent border-b border-black focus:outline-none appearance-none w-100 sm:w-115 pt-1 tracking-[-0.07em] leading-16 text-[#1A1B1C] z-10"
                type="text"
                placeholder="Your city name"
                autoFocus
                name="location"
                autoComplete="off"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                disabled={loading}
              />
              <button type="submit" className="sr-only">Submit</button>
            </form>
          )}

          {loading && (
            <p className="mt-4 text-sm text-gray-500 tracking-wide">Processing submission...</p>
          )}

          {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

          {step === "done" && (
            <div className="flex flex-col items-center gap-4 z-10">
              <p className="text-2xl font-normal text-[#1A1B1C] tracking-wide">Thank You!</p>
              <p className="text-lg text-gray-600">Proceed to the next step</p>
            </div>
          )}
        </div>
        <div className="absolute bottom-38.5 md:bottom-8 w-full flex justify-between md:px-9 px-13">
          <Link href="/" className="inset-0" aria-label="back">
            <div>
              <div className="relative w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
                <span className="-rotate-45 text-xs font-semibold sm:hidden">BACK</span>
              </div>
              <div className="group hidden sm:flex flex-row relative justify-center items-center">
                <div className="w-12 h-12 hidden sm:flex justify-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300"></div>
                <FaPlay className="absolute rotate-180 left-3.25 bottom-3.75 scale-[0.7] hidden sm:block group-hover:scale-[0.82] ease duration-300"/>
                <span className="text-sm font-semibold hidden sm:block ml-6">BACK</span>
              </div>
            </div>
          </Link>
          {step === "done" && (
          <Link href="/results" className="inline-block" aria-label="proceed">
            <div className="">
              <div>
                <div className="w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
                  <span className="-rotate-45 text-xs font-semibold sm:hidden">PROCEED</span>
                </div>
                <div className="group hidden sm:flex flex-row relative justify-center items-center">
                  <span className="text-sm font-semibold hidden sm:block mr-5">PROCEED</span>
                  <div className="w-12 h-12 hidden sm:flex justify-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300"></div>
                  <FaPlay className="absolute right-3.25 bottom-3.75 scale-[0.7] hidden sm:block group-hover:scale-[0.82] ease duration-300"/>
                </div>
              </div>
            </div>
          </Link>
          )}
        </div>
      </div>
    </div>
  );
}
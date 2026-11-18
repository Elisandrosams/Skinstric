"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import NavBar from "@/components/NavBar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa";
import { compressImage } from "@/lib/compressImage";
import camera from "@/public/camera-icon.png";
import picture from "@/public/gallery-icon.png";
import pointer from "@/public/pointer.png";
import large from "@/public/Rectangle-large.png";
import medium from "@/public/Rectangle-medium.png";
import small from "@/public/Rectangle-small.png";

export default function Result() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [showCameraPrompt, setShowCameraPrompt] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    return () => {
      setBase64Image(null);
      setShowCameraPrompt(false);
      setCameraError(null);
      setIsProcessing(false);
    };
  }, []);

  const handleAllowCamera = async () => {
    setCameraError(null);

    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError("Camera is not supported on this device or browser.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });

      stream.getTracks().forEach((track) => track.stop());
      setShowCameraPrompt(false);
      router.push("/camera");
    } catch (err) {
      console.error("Camera access denied", err);
      setCameraError(
        "Camera access was denied. Enable it in your browser settings.",
      );
    }
  };

  const handleAllowGallery = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setIsProcessing(true);

    try {
      const result = await compressImage(file);
      setBase64Image(result);
      sessionStorage.setItem("capturedImage", result);
      console.log("Image analyzed successfully!");

      await new Promise((resolve) => setTimeout(resolve, 50));
      alert("Image analyzed successfully!");
      router.push("/select");
    } catch (err) {
      console.error("Failed to process photo", err);
      setIsProcessing(false);
    }
  };

  const loadingState = (
    <div className="relative mt-20 md:absolute md:left-1/2 md:-translate-x-1/2 flex items-center justify-center">
      <div className="w-67.5 h-67.5 md:w-120.5 md:h-120.5"></div>
      <img
        src={large.src}
        alt="Large Rectangle"
        className="absolute w-67.5 h-67.5 md:w-120.5 md:h-120.5 animate-[spin_60s_linear_infinite] rotate-200"
      />
      <img
        src={medium.src}
        alt="Medium Rectangle"
        className="absolute w-57.5 h-57.5 md:w-[444.34px] md:h-[444.34px] animate-[spin_75s_linear_infinite] rotate-190"
      />
      <img
        src={small.src}
        alt="Small Rectangle"
        className="absolute w-47.5 h-47.5 md:w-[405.18px] md:h-[405.18px] animate-[spin_90s_linear_infinite] rotate-180"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
        <p className="text-xs md:text-sm font-semibold tracking-wide">
          PREPARING YOUR ANALYSIS...
        </p>
        <div className="flex gap-2">
          <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="overflow-hidden md:min-h-screen md:flex md:flex-col">
      <NavBar />
      <div className="flex-1 flex flex-col justify-center relative md:pt-16">
        <div className="absolute top-2 left-9 md:left-8 text left">
          <p className="font-semibold text-xs md:text-sm">TO START ANALYSIS</p>
        </div>
        <div className="flex-[0.4] md:flex-1 flex flex-col md:flex-row items-center xl:justify-center relative mb-0 md:mb-30 -space-y-5 md:space-y-0">
          {isProcessing ? (
            loadingState
          ) : (
            <>
              <div
                className={`relative md:absolute md:left-[55%] lg:left-[50%] xl:left-[40%] md:translate-y-0 translate-y-[-1%] md:-translate-x-full flex flex-col items-center justify-center ${showCameraPrompt ? "z-30" : ""}`}
              >
                <div className="w-67.5 h-67.5 md:w-120.5 md:h-120.5"></div>
                <img
                  src={large.src}
                  alt="Large Rectangle"
                  className="absolute w-67.5 h-67.5 md:w-120.5 md:h-120.5 animate-[spin_60s_linear_infinite] rotate-200"
                />
                <img
                  src={medium.src}
                  alt="Medium Rectangle"
                  className="absolute w-57.5 h-57.5 md:w-[444.34px] md:h-[444.34px] animate-[spin_75s_linear_infinite] rotate-190"
                />
                <img
                  src={small.src}
                  alt="Small Rectangle"
                  className="absolute w-47.5 h-47.5 md:w-[405.18px] md:h-[405.18px] animate-[spin_90s_linear_infinite] rotate-180"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <img
                    src={camera.src}
                    alt="Face Scan"
                    onClick={() => {
                      setCameraError(null);
                      setShowCameraPrompt(true);
                    }}
                    className="absolute w-25 h-25 md:w-34 md:h-34 hover:scale-108 duration-700 ease-in-out cursor-pointer"
                  />
                  {showCameraPrompt && (
                    <div className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-full w-75 max-w-[calc(100vw-2rem)] md:w-88 bg-[#1A1B1C] text-[#FCFCFC] pt-4 pb-2">
                      <h2 className="text-sm md:text-base font-semibold mb-12 leading-6 px-4">
                        ALLOW A.I. TO ACCESS YOUR CAMERA
                      </h2>
                      {cameraError && (
                        <p className="text-xs text-red-400 px-4 -mt-8 mb-4">
                          {cameraError}
                        </p>
                      )}
                      <div className="flex justify-end gap-6 border-t border-[#FCFCFC] pt-2 px-4">
                        <button
                          type="button"
                          onClick={() => setShowCameraPrompt(false)}
                          className="text-xs md:text-sm text-[#fcfcfca1] font-normal hover:text-gray-400 cursor-pointer"
                        >
                          DENY
                        </button>
                        <button
                          type="button"
                          onClick={handleAllowCamera}
                          className="text-xs md:text-sm font-semibold hover:text-gray-300 cursor-pointer"
                        >
                          ALLOW
                        </button>
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-[1%] right-22.5 md:top-[30.9%] md:-right-3 -translate-y-5">
                    <p className="text-xs md:text-sm font-normal mt-1 leading-6">
                      ALLOW A.I. <br></br>TO SCAN YOUR FACE
                    </p>
                    <img
                      src={pointer.src}
                      alt="Pointer"
                      className="absolute hidden w-15 h-14 md:block md:right-38 md:top-5"
                    />
                  </div>
                </div>
              </div>
              <div
                className={`relative md:absolute md:left-[45%] lg:left-[50%] xl:left-[55%] flex flex-col items-center mt-12 md:mt-0 justify-center md:translate-y-0 translate-y-[-10%] transition-opacity duration-300 ${showCameraPrompt ? "opacity-50 pointer-events-none" : "opacity-100"}`}
              >
                <div className="w-67.5 h-67.5 md:w-120.5 md:h-120.5"></div>
                <img
                  src={large.src}
                  alt="Large Rectangle"
                  className="absolute w-67.5 h-67.5 md:w-120.5 md:h-120.5 animate-[spin_60s_linear_infinite] rotate-205"
                />
                <img
                  src={medium.src}
                  alt="Medium Rectangle"
                  className="absolute w-57.5 h-57.5 md:w-[444.34px] md:h-[444.34px] animate-[spin_75s_linear_infinite] rotate-195"
                />
                <img
                  src={small.src}
                  alt="Small Rectangle"
                  className="absolute w-47.5 h-47.5 md:w-[405.18px] md:h-[405.18px] animate-[spin_90s_linear_infinite] rotate-180"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <img
                    src={picture.src}
                    alt="Gallery"
                    onClick={handleAllowGallery}
                    className="absolute w-25 h-25 md:w-34 md:h-34 hover:scale-108 duration-700 ease-in-out cursor-pointer"
                  />
                  <div className="absolute top-[75%] md:top-[70%] md:left-4.25 -translate-y-2.5">
                    <p className="text-[12px] md:text-[14px] font-normal mt-2 leading-6 text-right">
                      ALLOW A.I. <br></br>ACCESS GALLERY
                    </p>
                    <img
                      src={pointer.src}
                      alt="Pointer"
                      className="absolute hidden w-[60.33px] h-[59.37px] md:block md:left-32 md:bottom-9.75 rotate-180"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="absolute -top-6 right-7 md:-top-12.5 md:right-8 transition-opacity duration-300 opacity-100">
            <h1 className="text-xs md:text-sm font-normal mb-1">Preview</h1>
            <div className="w-24 h-24 md:w-32 md:h-32 bg-white border border-gray-300 overflow-hidden">
              {base64Image && (
                <img
                  src={base64Image}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
          <input
            ref={fileInputRef}
            accept="image/*"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        <div className="pt-4 md:pt-0 pb-8 sticky md:static mb-0 md:mb-0">
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

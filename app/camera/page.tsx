"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import takePhoto from "@/public/take-picture.png";
import { FaPlay } from "react-icons/fa";
import { drawCompressed } from "@/lib/compressImage";

export default function Camera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const router = useRouter();

  const handleUsePhoto = () => {
    if (!capturedImage) return;
    try {
      sessionStorage.setItem("capturedImage", capturedImage);
    } catch (err) {
      console.error("Failed to save photo", err);
    }
    router.push("/select");
  };

  const handleCapture = () => {
    const video = videoRef.current;
    if (!video || !video.videoWidth) return;

    try {
      // Mirror the capture so it matches the selfie-style preview.
      setCapturedImage(
        drawCompressed(video, video.videoWidth, video.videoHeight, {
          mirror: true,
        }),
      );
    } catch (err) {
      console.error("Failed to capture photo", err);
    }
  };

  useEffect(() => {
    let stream: MediaStream | null = null;
    let cancelled = false;

    const startCamera = async () => {
      if (!navigator.mediaDevices?.getUserMedia) {
        setError("Camera is not supported on this device or browser.");
        return;
      }
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Unable to open camera", err);
        setError(
          "Unable to access the camera. Check your browser permissions.",
        );
      }
    };

    startCamera();

    return () => {
      cancelled = true;
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      {error ? (
        <div className="flex h-full items-center justify-center px-6 text-center text-sm text-[#FCFCFC]">
          {error}
        </div>
      ) : (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="h-full w-full object-cover -scale-x-100"
        />
      )}

      {capturedImage && (
        <img
          src={capturedImage}
          alt="Captured"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {!error && !capturedImage && (
        <div className="absolute inset-0 z-10">
          <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10 flex items-center gap-4">
            <span className="hidden md:block text-sm font-semibold text-white">
              TAKE PICTURE
            </span>
            <button
              type="button"
              onClick={handleCapture}
              aria-label="Take picture"
              className=" hover:scale-108 duration-300 ease-in-out cursor-pointer"
            >
              <img
                src={takePhoto.src}
                alt="Take Picture"
                className="w-16 h-16 cursor-pointer"
              />
            </button>
          </div>
          <div className="absolute bottom-30 sm-bottom-40 left-0 right-0 text-center z-20">
            <p className="text-sm mb-2 font-normal leading-6 text-[#FCFCFC]">
              TO GET BETTER RESULTS MAKE SURE TO HAVE
            </p>
            <div className="flex justify-center space-x-8 text-xs leading-6 text-[#FCFCFC]">
              <p>◊ NEUTRAL EXPRESSION</p>
              <p>◊ FRONTAL POSE</p>
              <p>◊ ADEQUATE LIGHTING</p>
            </div>
          </div>
        </div>
      )}

      {capturedImage && (
        <div className="absolute inset-0 z-10 flex flex-col items-center">
          <div className="absolute text-sm leading-6 uppercase text-[#FCFCFC] top-40">
            GREAT SHOT!
          </div>
          <div className="absolute bottom-28 sm:bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-4">
            <p className="text-lg font-semibold text-white tracking-wide">
              Preview
            </p>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setCapturedImage(null)}
                className="px-4 py-2 text-xs md:text-sm text-[#1A1B1C] bg-white hover:bg-gray-300 cursor-pointer whitespace-nowrap"
              >
                Retake
              </button>
              <button
                type="button"
                onClick={handleUsePhoto}
                className="px-4 py-2 text-xs md:text-sm text-white bg-[#1A1B1C] hover:bg-gray-800 cursor-pointer whitespace-nowrap"
              >
                Use This Photo
              </button>
            </div>
          </div>
        </div>
      )}

      <Link
        href="/result"
        className="absolute bottom-8 left-8 z-10"
        aria-label="back"
      >
        <div>
          <div className="relative w-12 h-12 flex items-center justify-center border border-white rotate-45 scale-[1] sm:hidden">
            <span className="-rotate-45 text-xs text-white font-semibold sm:hidden">
              BACK
            </span>
          </div>
          <div className="group hidden sm:flex flex-row relative justify-center items-center">
            <div className="w-12 h-12 hidden sm:flex justify-center border border-white rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300"></div>
            <FaPlay className="absolute text-white rotate-180 left-3.25 bottom-3.75 scale-[0.7] hidden sm:block group-hover:scale-[0.82] ease duration-300" />
            <span className="text-sm text-white font-semibold hidden sm:block ml-6">
              BACK
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

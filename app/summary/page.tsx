"use client";
import { useEffect, useState } from "react";
    
export default function Summary() {
  const [image, setImage] = useState<string | null>(null);
  useEffect(() => {
    setImage(sessionStorage.getItem("capturedImage"));
  }, []);

  return ;
}

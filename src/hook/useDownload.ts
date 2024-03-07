"use client";
import { useState, useEffect } from "react";

export const useDownload = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>();

  async function fetchVideo(videoUrl: string) {
    setLoading(true);
    try {
      const response = await window.fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({ videoUrl: videoUrl }),
      });

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "";
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return { fetchVideo, error, loading };
};

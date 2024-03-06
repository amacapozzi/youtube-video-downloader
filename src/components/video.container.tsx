"use client";

import { useEffect } from "react";
import { Badge } from "./ui/badge";
import { resolve } from "path";
import { v4 as uuidv4 } from 'uuid';
import { tryDownloadVideo } from "@/utils/ytdl-core.utils";

interface VideoContainerProps {
  title: string;
  keywords: string[];
  iframeUrl: string;
  videoUrl: string;
}

export const VideoContainer: React.FC<VideoContainerProps> = ({
  title,
  keywords,
  iframeUrl,
  videoUrl,
}) => {
  useEffect(() => {

    async function download() {

 
      await tryDownloadVideo(videoUrl, "a");

      const response = await fetch("/api/download/video");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "";
      link.click();
      window.URL.revokeObjectURL(url);
    }
    download();

  }, []);

  return (
    <div>
      {keywords && (
        <div className="grid grid-cols-6 gap-3">
          {keywords.map((key, index) => (
            <Badge variant={"secondary"} key={index}>
              #{key}
            </Badge>
          ))}
        </div>
      )}
      <section className="flex my-4 items-start flex-col">
        <h1 className="font-semibold text-gray-200 text-xl">{title}</h1>
        <iframe className="my-3 w-full h-[300px]" src={iframeUrl} />
      </section>
    </div>
  );
};

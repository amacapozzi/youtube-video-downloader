"use client";
import { useState } from "react";
import { VideoInputUrl } from "@/components/Input";
import { Button } from "@/components/ui/button";
import { VideoContainer } from "@/components/video.container";
import {
  isValidVideo,
  getVideoInfo,
  tryDownloadVideo,
} from "@/utils/ytdl-core.utils";
import { VideoInfo } from "@/types/video";
import { Suspense } from "react";
import DownloadSkeleton from "@/components/download.skeleton";

export default function Home() {
  const [videoData, setVideoData] = useState<VideoInfo>({
    title: "",
    keywords: [],
    iframeUrl: "",
  });

  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [videoUrl, setVideoUrl] = useState("");

  const onChange = (value: string) => {
    setVideoUrl(value);
  };

  const downloadVideo = async () => {
    const isValid = await isValidVideo(videoUrl);
    setIsValid(isValid);

    if (!isValid) {
      return resetValues();
    }

    const videoInfo = await getVideoInfo(videoUrl);
    setVideoData({
      title: videoInfo.videoDetails.title,
      keywords: videoInfo.videoDetails.keywords as string[],
      iframeUrl: videoInfo.videoDetails.embed.iframeUrl,
    });
  };

  const resetValues = () => {
    setTimeout(() => {
      setIsValid(null);
      setVideoUrl("");
    }, 3000);
  };

  return (
    <main>
      <div className="flex flex-col">
        <h1 className="text-center text-4xl font-bold">
          Youtbue Video Downloader
        </h1>
        <div className="flex flex-row items-center gap-3 my-5">
          <VideoInputUrl videoUrl={videoUrl} onChange={onChange} />
          <Button onClick={downloadVideo}>Download</Button>
        </div>
        <div>
          {isValid ? (
            <Suspense fallback={<DownloadSkeleton />}>
              <VideoContainer
                videoUrl={videoUrl}
                title={videoData.title}
                keywords={videoData.keywords}
                iframeUrl={videoData.iframeUrl}
              />
            </Suspense>
          ) : !isValid && isValid !== null ? (
            <span className="text-red-400">Invalid VideoURL</span>
          ) : null}
        </div>
      </div>
    </main>
  );
}

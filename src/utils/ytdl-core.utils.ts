"use server";
import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";
import ytdl from "ytdl-core";

export const isValidVideo = async (videoUrl: string): Promise<boolean> => {
  return await ytdl.validateURL(videoUrl);
};

export const getVideoInfo = async (
  videoUrl: string
): Promise<ytdl.videoInfo> => {
  return await ytdl.getBasicInfo(videoUrl);
};
export const tryDownloadVideo = async (videoUrl: string, id: string) => {
  try {
    const videoInfo = await getVideoInfo(videoUrl);

    if (videoInfo) {
      const { title } = videoInfo.videoDetails;
      const filePath = path.join(process.cwd(), "videos", "video.mp4");
      const writeStream = fs.createWriteStream(filePath);

      await new Promise((resolve, reject) => {
        ytdl(videoUrl)
          .pipe(writeStream)
          .on("finish", resolve)
          .on("error", reject);
      });
    }
  } catch (error) {}
};

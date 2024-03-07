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

export const getVideoId = async (videoUrl: string): Promise<string> => {
const videoId = await ytdl.getVideoID(videoUrl);
  return videoId;
} 

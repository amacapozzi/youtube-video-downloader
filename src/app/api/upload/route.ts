import { getVideoId } from "@/utils/ytdl-core.utils";
import { NextResponse } from "next/server";
import fs, { readFile, readFileSync } from "fs";
import path from "path";
import ytdl from "ytdl-core";

export async function POST(req: Request) {
  try {
    const { videoUrl } = await req?.json();
    if (!videoUrl)
      return NextResponse.json({
        message: "Please provide a video URL",
        status: 400,
      });

    const videoId = await getVideoId(videoUrl);

    const videoFilePath = path.join(process.cwd(), "videos", `${videoId}.mp4`);
    const videoStream = fs.createWriteStream(videoFilePath);

    await new Promise((resolve, reject) => {
      ytdl(videoUrl)
        .pipe(videoStream)
        .on("finish", resolve)
        .on("error", reject);
    });

    const buffer = readFileSync(videoFilePath);

    const headers = new Headers();
    headers.append("Content-Disposition", `attachment; filename="${videoId}.mp4"`);
    headers.append("Content-Type", "video/mp4");

    return new Response(buffer, {
      headers,
    });

  } catch (err: any) {
    return NextResponse.json({ message: err?.message });
  }
}

import { fstat, readdir, readdirSync } from "fs";
import { readFile } from "fs/promises";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import path from "path";
import fs from "fs";

export async function GET(req: Request, params: Params) {

  const videoPath = path.join(
    process.cwd(),
    "videos",
    "video.mp4"
  );


  const buffer = await readFile(videoPath);


  const headers = new Headers();
  headers.append("Content-Disposition", 'attachment; filename="video.mp4"');
  headers.append("Content-Type", "video/mp4");
  

   return new Response(buffer, {
    headers,
  });


 
}

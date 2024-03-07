"use client";
import { Badge } from "./ui/badge";

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

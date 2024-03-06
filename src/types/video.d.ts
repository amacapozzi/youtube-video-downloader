export type VideoResponse = {
  response: "Ready" | "Invalid" | "Idle";
};

export interface VideoInfo {
    title: string;
    keywords: string[];
    iframeUrl: string;
}
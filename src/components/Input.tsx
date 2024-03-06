import { Input } from "@/components/ui/input";

interface Props {
  videoUrl: string;
  onChange: (value: string) => void;
}

export const VideoInputUrl: React.FC<Props> = ({ onChange, videoUrl }) => {
    return <Input onChange={(e) => onChange(e.target.value)} value={videoUrl} />;
};

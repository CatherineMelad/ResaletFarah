import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type StoryDialogProps = {
  story: {
    title: string | null;
    description: string | null;
    image: string | null;
  } | null;
  onClose: () => void;
};

export default function StoryDialog({ story, onClose }: StoryDialogProps) {
  return (
    <Dialog open={!!story} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <DialogHeader>
          <DialogTitle className="text-primary-500 text-2xl font-bold">
            {story?.title ?? ""}
          </DialogTitle>
        </DialogHeader>

        {story?.image && (
          <div className="relative w-full aspect-video rounded-lg">
            <Image
              src={story.image}
              alt={story.title ?? ""}
              fill
              className="object-cover"
            />
          </div>
        )}

        <p className="text-base text-base-800 leading-relaxed whitespace-pre-line">
          {story?.description ?? ""}
        </p>
      </DialogContent>
    </Dialog>
  );
}
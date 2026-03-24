import { ImageOff } from "lucide-react";

type Props = {
  title?: string;
  description?: string;
};

export default function EmptyState({
  title = "No images found",
  description = "This gallery doesn't contain any images yet.",
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      {/* Icon */}
      <div className="bg-gray-100 p-4 rounded-full mb-4">
        <ImageOff className="w-8 h-8 text-gray-500" />
      </div>

      {/* Title */}
      <h2 className="text-lg md:text-xl font-semibold text-gray-800">
        {title}
      </h2>

      {/* Description */}
      <p className="text-sm md:text-base text-gray-500 mt-2 max-w-md">
        {description}
      </p>
    </div>
  );
}
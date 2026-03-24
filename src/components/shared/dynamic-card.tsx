import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

type DynamicCardProps = {
  image: string | null;
  alt: string;
  title: string | null;
  href?: string;
  priority?: boolean;
};

export default function DynamicCard({
  image,
  alt,
  title,
  href = "/",
  priority = false,
}: DynamicCardProps) {
  return (
    <article className="h-full">
      <Card className="bg-primary-700 h-full flex flex-col">
        <CardHeader className="p-0">
          <Image
            src={image ?? "/assets/fallback.png"}
            alt={alt}
            width={300}
            height={350}
            className="aspect-square w-full mx-auto rounded-md rounded-b-none object-cover"
            priority={priority}
          />
        </CardHeader>

        <CardContent className="text-center pt-4 lg:pt-6 flex flex-col flex-1 justify-between">
          <p className="text-white font-semibold lg:text-xl mb-2 line-clamp-2">
            {title || "No description available"}
          </p>

          <Link href={href}>
            <Button variant="outlined" className="w-full">
              learn more
            </Button>
          </Link>
        </CardContent>
      </Card>
    </article>
  );
}

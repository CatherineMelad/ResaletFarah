import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

type SocialLinksType = {
  facebook?: string | null;
  instagram?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
};

type Props = {
  links: SocialLinksType;
  iconClassName?: string;
  containerClassName?: string;
};

const socialConfig = [
  { key: "facebook", icon: Facebook, label: "Facebook" },
  { key: "instagram", icon: Instagram, label: "Instagram" },
  { key: "linkedin", icon: Linkedin, label: "LinkedIn" },
  { key: "twitter", icon: Twitter, label: "Twitter" },
] as const;

export default function SocialLinks({
  links,
  iconClassName = "",
  containerClassName = "",
}: Props) {
  return (
    <div className="flex items-center gap-3">
      {socialConfig
        .filter((item) => links[item.key])
        .map((item) => {
          const Icon = item.icon;

          return (
            <a
              key={item.key}
              href={links[item.key]!}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              className={containerClassName}
            >
              <Icon size={24} className={`transition hover:scale-110 ${iconClassName}`} />
            </a>
          );
        })}
    </div>
  );
}
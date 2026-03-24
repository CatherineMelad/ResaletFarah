import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils/tailwind-merge";
import {
  Footer,
  FooterBottom,
  FooterColumn,
  FooterContent,
} from "../../ui/footer";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group";
import FooterContact from "./footer-contact";

const usefulLinks = [
  { href: "/about-us", label: "About Us" },
  { href: "/donate", label: "Donate" },
  { href: "/news", label: "Our News" },
  { href: "/contact", label: "Contact Us" },
];

const developerLinks = {
  catherine: "https://www.linkedin.com/in/catherine-melad/",
  taha: "https://www.linkedin.com/in/tahashaban/",
};

function DevProfileLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const url = href.trim();
  if (!url) return <>{children}</>;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-white underline decoration-white/70 underline-offset-2 transition-colors hover:text-white hover:decoration-white"
    >
      {children}
    </a>
  );
}

export default function FooterSection() {
  return (
    <footer
      className={cn("w-full bg-primary-500 px-4 text-base-100")}
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Site Footer
      </h2>

      <Footer className="bg-primary-500">
        <FooterContent className="flex flex-col gap-10 md:flex-row lg:gap-5 text-base-100">
          {/* Brand & Newsletter */}
          <FooterColumn className="w-full lg:w-1/2 lg:pr-20">
            <div className="flex flex-col gap-4">
              <Image
                src="/assets/English text.jpg"
                alt="Resalet Farah logo"
                width={150}
                height={150}
                className="h-auto w-full max-w-[150px] rounded-lg"
                priority
              />

              <p className="lg:text-xl">
                Subscribe to Resalet Farah newsletter and receive news,
                requests, and notifications.
              </p>

              <form aria-label="Newsletter subscription">
                <label htmlFor="email" className="block mb-1">
                  E-mail
                </label>

                <InputGroup className="h-11 bg-white">
                  <InputGroupInput
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      type="submit"
                      variant="default"
                      className="h-8 px-7"
                    >
                      Subscribe
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </form>
            </div>
          </FooterColumn>

          {/* Useful Links */}
          <FooterColumn className="w-full md:w-1/2 lg:w-1/4">
            <h3 className="text-lg font-semibold lg:text-xl">Useful links</h3>

            <nav aria-label="Footer navigation">
              <ul className="mt-3 space-y-3">
                {usefulLinks.map((link) => (
                  <li
                    key={link.href}
                    className="transition-all duration-200 hover:translate-x-1 hover:text-secondary-300"
                  >
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </FooterColumn>

          {/* Contact Info */}
          <FooterColumn className="w-full md:w-1/2 lg:w-1/4">
            <h3 className="text-lg font-semibold lg:text-xl">Contact Us</h3>

            <FooterContact />
          </FooterColumn>
        </FooterContent>

        <FooterBottom
          className="border-white/20 mt-10 flex w-full max-w-none flex-col items-center justify-center gap-2 border-t pt-6 text-center text-xs text-white sm:text-sm"
          role="note"
          aria-label="Website credits"
        >
          <p>
            © {new Date().getFullYear()} Resalet Farah — site by{" "}
            <DevProfileLink href={developerLinks.catherine}>
              Catherine
            </DevProfileLink>
            (frontend) &amp;
            <DevProfileLink href={developerLinks.taha}>Taha</DevProfileLink>{" "}
            (backend).
          </p>
        </FooterBottom>
      </Footer>
    </footer>
  );
}

"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils/tailwind-merge";
import Image from "next/image";
import { HeartHandshake, HandHeart } from "lucide-react";

/* -------------------- Logo -------------------- */
const Logo = (props: React.SVGAttributes<SVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 324 323"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      x="88.1023"
      y="144.792"
      width="151.802"
      height="36.5788"
      rx="18.2894"
      transform="rotate(-38.5799 88.1023 144.792)"
    />
    <rect
      x="85.3459"
      y="244.537"
      width="151.802"
      height="36.5788"
      rx="18.2894"
      transform="rotate(-38.5799 85.3459 244.537)"
    />
  </svg>
);

/* -------------------- Hamburger Icon -------------------- */
const HamburgerIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn("pointer-events-none", className)}
    width={18}
    height={18}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 12H20" />
    <path d="M4 6H20" />
    <path d="M4 18H20" />
  </svg>
);

/* -------------------- Types -------------------- */
export interface NavbarNavLink {
  href: string;
  label: string;
}

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  navigationLinks?: NavbarNavLink[];
  signInText?: string;
  ctaText?: string;
  onSignInClick?: () => void;
  onCtaClick?: () => void;
}

/* -------------------- Defaults -------------------- */
const defaultNavigationLinks: NavbarNavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About Us" },
  { href: "/directors", label: "Board of Directors" },
  { href: "/stories", label: "Success Stories" },
  { href: "/gallery", label: "Our Gallery" },
  { href: "/contact", label: "Contact Us" },
  { href: "/news", label: "News & Events" },
  { href: "/services", label: "Our Services" },
  { href: "/donate", label: "Donate" },
  { href: "/volunteer", label: "Join Us" },
];

/* -------------------- Component -------------------- */
export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ className, navigationLinks = defaultNavigationLinks, ...props }, ref) => {
    const pathname = usePathname();

    const isActive = (href: string) =>
      href === "/" ? pathname === "/" : pathname.startsWith(href);

    return (
      <header
        ref={ref}
        className={cn("sticky top-0 z-50 w-full bg-primary-500", className)}
        {...props}
      >
        <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-6">
          {/* Left */}

          <Link href={"/"}>          
            <Image
            src="/assets/logo.jpg"
            alt="Logo"
            width={50}
            height={50}
            className="rounded-full"
          />
          </Link>



          {/* Right */}
          <div className="flex items-center gap-2">
            <Button variant="tunneled" size="sm">
              <Link href={"/volunteer"}>Join Us </Link> <HeartHandshake />
            </Button>

            <Button variant="outlined" size="sm">
              <Link href={"/donate"}>Donate Now </Link>
              <HandHeart />
            </Button>

            {/* Mobile Menu */}
            <Popover>
              <PopoverTrigger asChild>
                <Button size="icon" aria-label="Open menu">
                  <HamburgerIcon />
                </Button>
              </PopoverTrigger>

              <PopoverContent
                align="start"
                sideOffset={15}
                className="w-[18rem] rounded-none border-none -translate-y-1 shadow-none bg-gradient-to-b from-[#023064] to-[#034896]"
              >
                <NavigationMenu className="w-full">
                  <NavigationMenuList className="flex items-start flex-col gap-5">
                    {navigationLinks.map((link) => {
                      const active = isActive(link.href);

                      return (
                        <NavigationMenuItem key={link.href}>
                          <Link
                            href={link.href}
                            className={cn(
                              "block w-full transition-all duration-200 text-base-200",
                              "hover:text-secondary-300 hover:translate-x-1",
                              active &&
                                "text-secondary-300 translate-x-1 font-medium"
                            )}
                          >
                            {link.label}
                          </Link>
                        </NavigationMenuItem>
                      );
                    })}
                  </NavigationMenuList>
                </NavigationMenu>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </header>
    );
  }
);

Navbar.displayName = "Navbar";
export { Logo, HamburgerIcon };

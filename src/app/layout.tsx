import type { Metadata, Viewport } from "next";
import { Hind_Siliguri, Manrope } from "next/font/google";
import Link from "next/link";
import { Header, MobileBottomNav } from "@/components/header";
import { Footer } from "@/components/ui";
import { announcement, site } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap" });
const bangla = Hind_Siliguri({
  variable: "--font-bangla",
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Retail Branding — Custom Signboards, 3D Letters & Lightboxes in Bangladesh",
    template: "%s | Retail Branding",
  },
  description:
    "Custom signboards, 3D letters, lightboxes and illuminated signs for businesses in Bangladesh. Customize your sign, upload your logo and get an estimate or a formal quotation.",
  openGraph: { siteName: site.name, type: "website", locale: "en_BD" },
};

export const viewport: Viewport = { themeColor: "#303577" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} ${bangla.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <a
          href="#main"
          className="sr-only z-50 rounded-md bg-yellow px-4 py-2 font-bold text-navy-900 focus:not-sr-only focus:fixed focus:left-3 focus:top-3"
        >
          Skip to content
        </a>
        <div className="bg-navy-900 text-white">
          <p className="container-page py-2 text-center text-[13px] font-semibold sm:text-sm">
            {announcement}{" "}
            <Link href="#" className="ml-1 whitespace-nowrap text-yellow underline underline-offset-4">
              Get a quote
            </Link>
          </p>
        </div>
        <Header />
        <main id="main" className="flex-1 pb-16 md:pb-0">
          {children}
        </main>
        <Footer />
        <MobileBottomNav />
      </body>
    </html>
  );
}

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/home/Navbar";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });


export const metadata = {
  title: "Gadget Cartel",
  description:
    "Welcome to Gadget Cartel, your one stop store for all gadgets",
    generator: "Next.js",
  manifest: "/manifest.json",
  openGraph: {
    title: "Gadget Cartel",
    description:
    "Welcome to Gadget Cartel, your one stop store for all gadgets",
    url: "https://gadgetcartel.com.ng",
    keywords: ["accessories", "mobile", "laptop", "ecommerce"],
    themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  
    siteName: "Gadget Cartel",
    images: [
      {
        url: "https://gadgetcartel.com.ng",
        width: 800,
        height: 600,
        alt: "Gadget Cartel OpenGraph Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/icons/android-launchericon-192-192.png", // Correct the path to start from the root
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        url: "/favicon-32x32.png",
        sizes: "32x32",
      },
      {
        rel: "icon",
        url: "/favicon-16x16.png",
        sizes: "16x16",
      },
      {
        rel: "manifest",
        url: "/site.webmanifest",
      },
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#5bbad5",
      },
    ],
  },
};

export function generateViewport() {
  return {
    themeColor: "#ffffff",
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Toaster
        // position="top-right"
        // reverseOrder={false}
      />
        <Navbar />
        {children}

      </body>
    </html>
  );
}

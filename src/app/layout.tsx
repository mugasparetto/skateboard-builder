import type { Metadata } from "next";
import { Bowlby_One_SC, DM_Mono } from "next/font/google";
import "./globals.css";
import { SVGFilters } from "./components/SVGFilters";
import { createClient } from "@/prismicio";

const bolby = Bowlby_One_SC({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bolby-sc",
  weight: "400",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-mono",
  weight: "500",
});

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const settings = await client.getSingle("settings");
  return {
    title: settings.data.site_title,
    description: settings.data.meta_description,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bolby.variable} ${dmMono.variable} antialiased font-mono font-medium text-zinc-800`}
      >
        {children}
        <SVGFilters />
      </body>
    </html>
  );
}

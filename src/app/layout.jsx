import { M_PLUS_1_Code, M_PLUS_1p, Ubuntu_Sans, Ubuntu_Sans_Mono } from "next/font/google";
import "./globals.css";
import Link from 'next/link'
import Image from "next/image";
import { TooltipProvider } from "@/components/ui/tooltip"

const ubuntuSans = Ubuntu_Sans({
  variable: "--font-ubuntu-sans",
  subsets: ["latin"],
});

const ubuntuSansMono = Ubuntu_Sans_Mono({
  variable: "--font-ubuntu-sans-mono",
  subsets: ["latin"],
});

const MPlus1p = M_PLUS_1p({
  variable: "--font-m-plus-1p",
  weight: [
    '400',
    '500',
    '700',
  ],
});

const MPlus1Code = M_PLUS_1_Code({
  variable: "--font-m-plus-1-code",
  weight: [
    '400',
    '500',
    '700',
  ],
});

export const metadata = {
  title: "ScJPMC Status",
  description: "Status page for ScratchJP Minecraft Server.",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/logo/64x64.ico" />
      </head>
      <body
        className={`${ubuntuSans.variable} ${ubuntuSansMono.variable} ${MPlus1p.variable} ${MPlus1Code.variable} antialiased font-sans`}
      >
        <TooltipProvider>
          
          <div className="hidden select-none pointer-events-none bg-red-500 bg-gray-500 bg-green-500 after:bg-red-500 after:bg-gray-500 after:bg-green-500" aria-label="">pre-renders</div>

          <nav className="flex flex-row justify-between border-b border-b-[#80808080] shadow-[0_0_8px_#808080c0]">
            <div>
              <Link href="/" className="flex flex-row items-center p-2 py-1 m-2 ml-4">
                <Image
                  src="/assets/logo/64x64.png" 
                  width="36" 
                  height="36"
                  alt="ScJPMC"
                  className="mr-2 navbar-logo"
                />
                <div className="text-2xl font-medium">
                  Status
                </div>
              </Link>
            </div>
          </nav>

          <main className="w-full max-w-5xl my-4 mx-auto">
            {children}
          </main>
          
        </TooltipProvider>
      </body>
    </html>
  );
}

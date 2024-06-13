import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { ThemeProvider } from "~/components/theme-provider";
import { Toaster } from "~/components/ui/toaster";
import { TRPCReactProvider } from "~/trpc/react";
import { BreadcrumbNav } from "./_components/breadcrumb-nav";
import { Navbar } from "./_components/navbar";
import { SessionLoader } from "./_components/session-loader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "CompeVision",
  description: "Computer Vision Challenges",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${inter.variable}`} suppressHydrationWarning>
        <TRPCReactProvider cookies={cookies().toString()}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <SessionLoader>
              <div className="flex min-h-screen flex-col">
                <Navbar />
                <div className="container flex flex-auto flex-col">
                  <BreadcrumbNav />
                  {children}
                </div>
              </div>
              <Toaster />
            </SessionLoader>
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}

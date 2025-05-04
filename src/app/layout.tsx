import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/dashboard/theme-provider";


export const metadata: Metadata = {
  title: "AvianMailer",
  description: "A mailer specifically designed for AvianInTek.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
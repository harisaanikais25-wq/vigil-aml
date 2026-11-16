import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ForensicsProvider } from "@/context/ForensicsContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata = {
  title: "VigilAML — No-Code AML & Graph Forensics Engine",
  description:
    "Real-time transaction monitoring, fraud ring detection, and configurable compliance rules.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased bg-slate-50 text-slate-900">
        <ForensicsProvider>{children}</ForensicsProvider>
      </body>
    </html>
  );
}
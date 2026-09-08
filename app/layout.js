import { Source_Serif_4, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-source-serif",
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});

export const metadata = {
  title: "ExamNiti — India's Entrance Exam Compass",
  description:
    "Find every major entrance exam in India — National, University and State level — filtered by category, qualification and stream, with eligibility, dates and official links in one place.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sourceSerif.variable} ${plexSans.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}

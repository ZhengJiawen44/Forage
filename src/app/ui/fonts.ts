import { Montserrat } from "next/font/google";
import { Roboto_Mono } from "next/font/google";
import { Amita } from "next/font/google";
export const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-Montserrat",
});
export const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mono",
});
export const amita = Amita({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-amita",
});

"use client"
import "./globals.css";
import {Poppins} from "next/font/google";
import Navigation from "../components/Navigation";
import Footer from "@/components/Footer";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",

});
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className= { poppins.className } >
        <header><Navigation/></header> 

        <main>{children}</main>
        <Footer/>

      </body>
    </html>
  );
}

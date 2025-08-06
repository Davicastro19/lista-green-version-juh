import Footer from "@/components/footer/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const inter = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300","400", "500", "700","900"],
});
const roboto = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300","400", "500", "700","900"],
});


export const metadata: Metadata = {
  title: "Listagreen",
  description: "Semeando conexões para um mundo mais verde.",
  icons: {
    icon: '/favicon.ico',
    apple:'apple-touch-icon.png',
    shortcut:'apple-touch-icon.png'
  },
  //manifest: '/images/site.webmanifest'
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const classNames = `${inter.className} ${roboto.className}`;
  return (
    <html lang="pt-Br" suppressHydrationWarning={true}>

      <body
        className={`${classNames} antialiased`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
          <Footer/>
      </body>
    </html>
  );
}

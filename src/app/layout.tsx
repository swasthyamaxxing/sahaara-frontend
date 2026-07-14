import type { Metadata } from "next";
import "./globals.css";
import { Playfair_Display } from 'next/font/google';
import { Roboto } from 'next/font/google';
import { Toaster } from "@/components/ui/sonner";

// Instantiate the font configuration
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'], // Specify the weights you need
  style: ['normal', 'italic'],
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'], // Specify the weights you need
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: "Sahaara | Caring for those who once cared for us",
  description: "Sahaara is a platform dedicated to providing care and support for the elderly, ensuring they receive the attention and assistance they deserve. We bring both caretakers and patients together, fostering a community of compassion and understanding.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${roboto.className} h-full antialiased`}
    >
      <body className={`min-h-full scrollbar flex flex-col`}>
        {/* Global font rules: headings use Playfair, rest use Roboto. Fonts are loaded above via next/font. */}
        <style>{`
          h1, h2, h3, h4, h5, h6 { font-family: ${playfair.style.fontFamily}; }
          body, input, button, textarea, select, p, span, a, li { font-family: ${roboto.style.fontFamily}; }
        `}</style>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}

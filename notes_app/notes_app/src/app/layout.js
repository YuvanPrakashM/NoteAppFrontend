import "./globals.css";
import { Providers } from "./provider.js";

export const metadata = {
  title: "Notes App",
  description: "Simple JWT Auth with Django + Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

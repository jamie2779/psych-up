import Provider from "@/components/ui/provider";
import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Psych Up",
  description: "스피어피싱 모의훈련 서비스",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <head>
        {/* Paperlogy 폰트 CSS 로드 */}
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/whitedev7773/Paperlogy/paperlogy.css"
        />
      </head>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}

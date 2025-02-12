import Providers from "@/providers";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

import "@/styles/globals.css";

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
      <body>
        <Providers>
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              style: {
                fontSize: "14px",
              },
            }}
          />
          {children}
        </Providers>
      </body>
    </html>
  );
}

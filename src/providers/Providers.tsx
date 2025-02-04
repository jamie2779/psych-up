"use client";

import { theme } from "@/styles/theme";

import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </SessionProvider>
  );
}

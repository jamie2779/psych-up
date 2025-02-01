"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

// 커스텀 테마 설정이 있다면 이곳에서 가져옵니다.
import customTheme from "@/styles/theme";

interface ProviderProps {
  children: ReactNode;
}

const Provider = ({ children }: ProviderProps) => {
  return <ChakraProvider value={customTheme}>{children}</ChakraProvider>;
};

export default Provider;

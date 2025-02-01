import NextImage from "next/image";

import { Image, Box, Button } from "@chakra-ui/react";

export default function Home() {
  return (
    <div>
      <Box color="psychup.primary" fontFamily="body">
        Hello World
      </Box>
      <Button colorPalette={"success"}>Success 버튼</Button>

      <Image asChild>
        <NextImage
          src="/Logo.svg"
          alt="Psych-up Logo"
          width={689}
          height={270}
        />
      </Image>
    </div>
  );
}

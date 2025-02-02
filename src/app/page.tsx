import Image from "next/image";

import { Box, Button } from "@chakra-ui/react";

export default function Home() {
  return (
    <div>
      <Box color="primary" fontFamily="body">
        Hello World
      </Box>
      <Button>Success 버튼</Button>

      <Image src="/Logo.svg" alt="Psych-up Logo" width={689} height={270} />
    </div>
  );
}

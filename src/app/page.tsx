import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Image src="/Logo.svg" alt="Psych-up Logo" width={689} height={270} />
    </div>
  );
}

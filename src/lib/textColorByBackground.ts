export default function textColorByBackground(hex: string): string {
  // HEX 코드가 유효한지 확인
  const isValidHex = /^#[0-9A-Fa-f]{6}$/.test(hex);
  if (!isValidHex) {
    throw new Error("Invalid HEX code");
  }

  // HEX 코드에서 RGB 값 추출
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);

  // 밝기 계산 (밝을수록 더 높은 값)
  const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  // 밝기가 128보다 크면 밝은 톤, 아니면 어두운 톤
  return brightness > 128 ? "black" : "white";
}

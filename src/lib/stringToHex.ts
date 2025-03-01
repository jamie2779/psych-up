export default function stringToHex(str: string): string {
  // 문자열의 첫 3개의 문자만 사용
  let result = 0;
  for (let i = 0; i < Math.min(3, str.length); i++) {
    result = (result << 8) + str.charCodeAt(i);
  }

  // RGB 값 계산
  const r = (result >> 16) & 0xff;
  const g = (result >> 8) & 0xff;
  const b = result & 0xff;

  // HEX 색상 코드로 변환
  const hexColor = `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;

  return hexColor;
}

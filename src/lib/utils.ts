import Mustache from "mustache";

/**
 * 바이트(byte) 단위를 KB, MB, GB 등의 단위로 변환하는 함수
 *
 * @param bytes 변환할 바이트 크기 (number)
 * @param decimals 소수점 이하 자리수 (기본값: 2)
 * @returns 변환된 문자열 (ex: "1.50 KB", "2.34 MB")
 */
export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

/**
 * Mustache 템플릿 렌더링
 * @param template 템플릿 문자열
 * @param data 치환할 데이터
 * @returns 변환된 문자열
 */
export function renderTemplate(
  template: string,
  data: Record<string, unknown>
): string {
  try {
    return Mustache.render(template, data);
  } catch {
    return template;
  }
}

/**
 * Mustache 템플릿에서 트리 구조를 고려하여 최종 노드(가장 세부적인 플레이스홀더)만 추출
 * @param template 템플릿 문자열 (ex: "안녕하세요, {{name}}님. 오늘의 할 일: {{todo.1}}")
 * @returns 가장 세부적인 플레이스홀더 목록 (ex: ["todo.1"])
 */
export function extractPlaceholders(template: string): string[] {
  try {
    const tokens = Mustache.parse(template); // Mustache 템플릿을 파싱하여 토큰 리스트 추출
    const placeholders = tokens
      .filter((token) => token[0] === "name") // 플레이스홀더(변수)인 항목만 필터링
      .map((token) => token[1]); // 변수명만 추출

    // 플레이스홀더를 길이 기준으로 정렬 (긴 것 → 짧은 것)
    placeholders.sort((a, b) => b.length - a.length);

    // 트리 구조를 고려하여 가장 세부적인 키만 남기기
    const finalPlaceholders = new Set<string>();

    placeholders.forEach((placeholder) => {
      // 현재 키가 이미 저장된 다른 키의 일부라면 추가하지 않음
      const isPartOfOther = [...finalPlaceholders].some((existing) =>
        existing.startsWith(placeholder + ".")
      );

      if (!isPartOfOther) {
        finalPlaceholders.add(placeholder);
      }
    });

    return [...finalPlaceholders];
  } catch {
    return [];
  }
}

/**
 * 주어진 객체의 키에 포함된 점(.)을 기준으로 중첩된 객체 구조로 변환하는 함수
 * @param input 변환할 객체 (예: `{ "test": "sample1", "fishing.2": "sample2" }`)
 * @returns 점(.)이 포함된 키를 중첩 객체로 변환한 새 객체
 */
export function transformObject(
  input: Record<string, unknown>
): Record<string, unknown> {
  const output: Record<string, unknown> = {};

  Object.keys(input).forEach((key) => {
    const value = input[key];

    if (key.includes(".")) {
      const keys = key.split(".");
      let current = output;

      keys.forEach((k, index) => {
        if (index === keys.length - 1) {
          current[k] = value;
        } else {
          if (
            typeof current[k] !== "object" ||
            current[k] === null ||
            Array.isArray(current[k])
          ) {
            current[k] = {} as Record<string, unknown>;
          }
          current = current[k] as Record<string, unknown>;
        }
      });
    } else {
      output[key] = value;
    }
  });

  return output;
}

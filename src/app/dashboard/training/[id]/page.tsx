import TrainingDetail from "./page.client";

export default function TrainingDetailPage() {
  const trainingDetail = {
    title: "급여 명세서 사칭 이메일 훈련",
    detail:
      "직원의 급여 명세서를 사칭한 피싱 이메일을 통해 개인 정보를 유출하려는 공격을 탐지하고 대응하는 훈련입니다.",
    type: "분류 1",
    files: ["phishing_email_example.pdf", "salary_statement_fake.docx"],
    todos: [
      "이메일 제목과 보낸 사람을 확인하세요.",
      "이메일 본문에서 의심스러운 링크를 분석하세요.",
      "첨부파일이 안전한지 확인하고 실행하지 마세요.",
      "이메일 헤더를 분석하여 출처를 확인하세요.",
      "의심스러운 이메일을 보안팀에 신고하세요.",
    ],
  };
  return <TrainingDetail {...trainingDetail} />;
}

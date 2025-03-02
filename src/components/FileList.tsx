"use client";
import { Text } from "@chakra-ui/react";
import { File } from "@prisma/client";
import { formatBytes } from "@/lib/utils";
import ky from "ky";
import toast from "react-hot-toast";

interface FileListProps {
  fileList: File[];
}

export default function FileList({ fileList }: FileListProps) {
  const downloadHandler = async (fileUUID: string, fileName: string) => {
    try {
      const toastId = toast.loading("파일 불러오는 중...");
      // 서명된 URL 받아오기
      const { url } = await ky
        .get(`/api/file/${fileUUID}`)
        .json<{ url: string }>();

      // 파일을 Blob으로 가져오기
      const response = await fetch(url);
      const blob = await response.blob();

      // Blob URL 생성
      const blobUrl = window.URL.createObjectURL(blob);

      // 임시 a 태그 생성
      const a = document.createElement("a");
      a.href = blobUrl;

      // 파일명 변경
      a.download = fileName;
      document.body.appendChild(a);
      a.click();

      // 임시 URL과 a 태그 정리
      a.remove();
      window.URL.revokeObjectURL(blobUrl);

      // 다운로드 성공 메시지
      toast.success("파일 다운로드가 시작되었습니다.", { id: toastId });
    } catch (error) {
      toast.error("파일 다운로드 중 문제가 발생하였습니다.");
    }
  };

  return fileList.map((file, index) => (
    <Text
      key={index}
      fontSize="s"
      fontWeight="regular"
      userSelect="none"
      onClick={() => downloadHandler(file.uuid, file.name)}
      _hover={{ textDecoration: "underline", cursor: "pointer" }}
    >
      {file.name} ({formatBytes(file.size)})
    </Text>
  ));
}

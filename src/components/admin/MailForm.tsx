"use client";
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  VStack,
  Textarea,
  Switch,
} from "@chakra-ui/react";
import FileList from "@/components/admin/FileList";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, ScenarioMail, MailFile, File } from "@prisma/client";
import toast from "react-hot-toast";
import ky from "ky";

interface MailFormProps {
  mail?: Mail & { scenarioMails: ScenarioMail[] } & {
    mailFiles: (MailFile & { file: File })[];
  };
}

export default function MailForm({ mail }: MailFormProps) {
  const router = useRouter();
  const [sender, setSender] = useState(mail?.sender || "");
  const [from, setFrom] = useState(mail?.from || "");
  const [title, setTitle] = useState(mail?.title || "");
  const [article, setArticle] = useState(mail?.article || "");
  const [isFishing, setIsFishing] = useState(mail?.isFishing || false);
  const [fishingDetail, setFishingDetail] = useState(mail?.fishingDetail || "");
  const [fileList, setFileList] = useState<File[]>(
    mail?.mailFiles.map((mailFile) => mailFile.file) || []
  );

  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const putMail = async (
    mail: Mail & { scenarioMails: ScenarioMail[] } & {
      mailFiles: (MailFile & { file: File })[];
    }
  ) => {
    return toast.promise(
      ky.put(`/api/admin/mail/${mail.mailId}`, {
        json: {
          sender: sender,
          from: from,
          title: title,
          article: article,
          fileList: fileList.map((file) => file.fileId),
          isFishing: isFishing,
          ...(isFishing && { fishingDetail }),
        },
      }),
      {
        loading: "메일을 수정 중입니다.",
        success: "메일이 성공적으로 수정되었습니다.",
        error: "메일 수정 중 문제가 발생하였습니다",
      }
    );
  };

  const postMail = async () => {
    return toast.promise(
      ky.post("/api/admin/mail", {
        json: {
          sender: sender,
          from: from,
          title: title,
          article: article,
          fileList: fileList.map((file) => file.fileId),
          isFishing: isFishing,
          ...(isFishing && { fishingDetail }),
        },
      }),
      {
        loading: "메일을 등록 중입니다.",
        success: "메일이 성공적으로 등록되었습니다.",
        error: "메일 등록 중 문제가 발생하였습니다",
      }
    );
  };

  const handleSubmit = async () => {
    if (
      !title.trim() ||
      !sender.trim() ||
      !from.trim() ||
      !article.trim() ||
      (isFishing && !fishingDetail.trim())
    ) {
      setError(true);
      return;
    }

    setError(false);
    setIsLoading(true);

    try {
      if (mail) {
        await putMail(mail);
      } else {
        await postMail();
      }

      await setTimeout(() => {
        router.push("/admin/mail");
      }, 1000);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <VStack spacing={6} align="flex-start">
      <FormControl isInvalid={error && !sender.trim()}>
        <FormLabel px={5} fontSize="m">
          보낸이
        </FormLabel>
        <Input
          h={46}
          borderRadius={14}
          px={20}
          fontSize="m"
          value={sender}
          placeholder="보낸사람 이름 입력"
          onChange={(e) => setSender(e.target.value)}
          isDisabled={isLoading}
        />
        <FormErrorMessage px={5} fontSize="m">
          보낸사람 이름을 입력해주세요
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={error && !from.trim()}>
        <FormLabel px={5} fontSize="m">
          보낸 메일 주소
        </FormLabel>
        <Input
          h={46}
          borderRadius={14}
          px={20}
          fontSize="m"
          value={from}
          placeholder="보낸 메일 주소를 입력해주세요"
          onChange={(e) => setFrom(e.target.value)}
          isDisabled={isLoading}
        />
        <FormErrorMessage px={5} fontSize="m">
          메일 주소를 입력해주세요
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={error && !title.trim()}>
        <FormLabel px={5} fontSize="m">
          메일 제목
        </FormLabel>
        <Input
          h={46}
          borderRadius={14}
          px={20}
          fontSize="m"
          value={title}
          placeholder="메일 제목을 입력해주세요."
          onChange={(e) => setTitle(e.target.value)}
          isDisabled={isLoading}
        />
        <FormErrorMessage px={5} fontSize="m">
          메일 제목을 입력해주세요.
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={error && !article.trim()}>
        <FormLabel px={5} fontSize="m">
          메일 본문
        </FormLabel>
        <Textarea
          minH={100}
          h={200}
          borderRadius={14}
          px={20}
          py={10}
          value={article}
          size="xl"
          fontSize="m"
          placeholder="메일 본문을 입력해주세요."
          onChange={(e) => setArticle(e.target.value)}
          isDisabled={isLoading}
        />
        <FormErrorMessage px={5} fontSize="m">
          메일 본문을 입력해주세요
        </FormErrorMessage>
      </FormControl>

      <FormControl>
        {/*파일 목록 */}
        <FileList fileList={fileList} setFileList={setFileList} />
      </FormControl>
      <FormControl display="flex" alignItems="center">
        <FormLabel px={5} fontSize="m">
          피싱 여부
        </FormLabel>
        <Switch
          isDisabled={isLoading}
          isChecked={isFishing}
          onChange={(e) => setIsFishing(e.target.checked)}
        />
      </FormControl>

      {isFishing && (
        <FormControl isInvalid={error && isFishing && !fishingDetail.trim()}>
          <Textarea
            minH={100}
            h={200}
            borderRadius={14}
            px={20}
            py={10}
            value={fishingDetail}
            size="xl"
            fontSize="m"
            placeholder="피싱 유도 내용을 입력해주세요"
            onChange={(e) => setFishingDetail(e.target.value)}
            isDisabled={isLoading}
          />
          <FormErrorMessage px={5} fontSize="m">
            피싱 유도 내용을 입력해주세요
          </FormErrorMessage>
        </FormControl>
      )}

      <Button
        bg="secondary"
        width="100%"
        mt={4}
        onClick={handleSubmit}
        isLoading={isLoading}
        isDisabled={isLoading}
      >
        저장
      </Button>
    </VStack>
  );
}

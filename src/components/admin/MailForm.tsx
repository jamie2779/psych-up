"use client";
import "react-quill-new/dist/quill.snow.css";
import DOMPurify from "dompurify";
import {
  Box,
  Text,
  Flex,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  VStack,
  Switch,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Textarea,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  IconButton,
} from "@chakra-ui/react";
import ArticleEditor from "@/components/admin/ArticleEditor";
import ArticleViewer from "@/components/ArticleViewer";
import FileTable from "@/components/admin/FileTable";
import DynamicForm from "@/components/admin/DynamicForm";
import { ArrowAltIcon, TextIcon } from "@/assets/IconSet";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@chakra-ui/hooks";
import { Mail, ScenarioMail, MailFile, File } from "@prisma/client";
import { extractPlaceholders, transformObject } from "@/lib/utils";

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
  const [source, setSource] = useState(mail?.article || "");
  const [sampleData, setSampleData] = useState<Record<string, unknown>>({});
  const { isOpen, onToggle } = useDisclosure(); // 아코디언 상태 관리
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
          article: DOMPurify.sanitize(article),
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
          article: DOMPurify.sanitize(article),
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
      article.trim() === "<p><br></p>" ||
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
    } catch (_) {
      setIsLoading(false);
    }
  };

  return (
    <VStack spacing={6} align="flex-start">
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

      <FormControl
        isInvalid={
          error && (!article.trim() || article.trim() === "<p><br></p>")
        }
      >
        <FormLabel px={5} fontSize="m">
          <Flex gap={8} align="center">
            <Text>메일 본문</Text>
            <Popover placement="right">
              <PopoverTrigger>
                <IconButton
                  w={20}
                  h={20}
                  aria-label="popover"
                  variant="goast"
                  icon={
                    <TextIcon
                      boxSize="100%"
                      _hover={{
                        cursor: "pointer",
                        fill: "grey.shade1",
                      }}
                    />
                  }
                />
              </PopoverTrigger>
              <PopoverContent w="fit-content" px={6} py={2} borderRadius={8}>
                <PopoverArrow />
                <PopoverHeader>
                  <Text fontSize="m">
                    데이터 태그 사용법 : {"{{태그이름}}"}
                  </Text>
                </PopoverHeader>
                <PopoverBody fontSize="s" maxW={400}>
                  <Text>name : 사용자 이름 </Text>
                  <Text>
                    todo.[tag] : 특정 태그의 todo 완료 API로 연결되는 url
                  </Text>
                  <Text>fishing : 현재 메일의 피싱 API로 연결되는 url</Text>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Flex>
        </FormLabel>

        <Box
          w="100%"
          bg="white"
          borderRadius={14}
          mt={6}
          p={20}
          borderColor={
            error && (!article.trim() || article.trim() === "<p><br></p>")
              ? "danger"
              : "transparent"
          }
          borderWidth={2}
        >
          <Tabs>
            <TabList>
              <Tab fontSize="l">에디터</Tab>
              <Tab fontSize="l">소스편집</Tab>
              <Tab fontSize="l">미리보기</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <ArticleEditor
                  article={article}
                  setArticle={setArticle}
                  setSource={setSource}
                  isLoading={isLoading}
                />
              </TabPanel>
              <TabPanel>
                <Textarea
                  minH={100}
                  h={200}
                  borderRadius={14}
                  px={20}
                  py={10}
                  value={source}
                  size="xl"
                  fontSize="m"
                  placeholder="소스코드 원문"
                  onChange={(e) => {
                    setSource(e.target.value);
                  }}
                  onBlur={() => {
                    setArticle(source);
                  }}
                  isDisabled={isLoading}
                />
              </TabPanel>
              <TabPanel>
                <Accordion allowMultiple>
                  <AccordionItem>
                    <AccordionButton onClick={onToggle}>
                      <ArrowAltIcon
                        boxSize={20}
                        transform={isOpen ? "rotate(0deg)" : "rotate(-90deg)"}
                        transition="transform 0.2s ease-in-out"
                      />
                      <Text px={5} fontSize="m">
                        샘플 데이터 설정
                      </Text>
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                      <DynamicForm
                        placeholders={extractPlaceholders(article)}
                        onChange={setSampleData}
                      />
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
                <ArticleViewer
                  content={article}
                  data={Object.fromEntries(
                    Object.entries(
                      transformObject(
                        extractPlaceholders(article).reduce(
                          (acc, key) => {
                            if (sampleData.hasOwnProperty(key)) {
                              acc[key] = sampleData[key];
                            }
                            return acc;
                          },
                          {} as Record<string, unknown>
                        )
                      )
                    ).map(([key, value]) => [key, String(value)])
                  )}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
        {error && (!article.trim() || article.trim() === "<p><br></p>") && (
          <FormErrorMessage px={5} fontSize="m">
            메일 본문을 입력해주세요
          </FormErrorMessage>
        )}
      </FormControl>
      <FormControl pt={6}>
        {/*파일 목록 */}
        <FileTable fileList={fileList} setFileList={setFileList} />
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

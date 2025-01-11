import { Tabs } from "blahblah-front-common-ui-kit";
import BaseButton from "../components/Button/BaseButton";
import CakeIcon from "../components/Icons/CakeIcon";
import CrownIcon from "../components/Icons/CrownIcon";
import MenIcon from "../components/Icons/MenIcon";
import Pagination from "../components/Pagination";
import { useEffect, useState } from "react";
import { getBoardAndPostsByUrl } from "../apis/board.api";
import SpeechBubbleIcon from "@components/Icons/SpeechBubbleIcon";
import LoudSpeakerIcon from "@components/Icons/LoudSpeakerIcon";

interface Manager {
  email: string;
  nickname: string;
  _id: string;
}

interface Board {
  category: string;
  createdAt: string;
  deleteAt: string | null;
  description: string;
  image: string;
  manager: Manager;
  memberCount: number;
  name: string;
  postCount: number;
  updatedAt: string;
  url: string;
  _id: string;
  __v: number;
}
interface Creator {
  _id: string;
  email: string;
  nickname: string;
  image: string;
  deleteAt: Date | null;
}

interface Post {
  _id: string;
  board: string;
  content: string;
  createdAt: Date;
  creator: Creator;
  deletedAt: Date | null;
  title: string;
  type: "basic" | "notification";
  updatedAt: Date;
  __v: number;
}
const pageSize = 15;
const blockSize = 15;

const BoardPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentNoticePage, setCurrentNoticePage] = useState(0);
  const [isNotice, setIsNotice] = useState(false);
  const [boardData, setBoardData] = useState<Board>({
    category: "",
    createdAt: "",
    deleteAt: null,
    description: "",
    image: "",
    manager: {
      email: "",
      nickname: "",
      _id: "",
    },
    memberCount: 0,
    name: "",
    postCount: 0,
    updatedAt: "",
    url: "",
    _id: "",
    __v: 0,
  });
  const [postData, setPostData] = useState<Post[]>([]);

  useEffect(() => {
    const pathSegments = window.location.pathname.split("/");
    const boardUrl = pathSegments[pathSegments.length - 1];

    const fetchData = async () => {
      try {
        const data = await getBoardAndPostsByUrl(boardUrl);
        console.log(data);
        setBoardData(() => data.data.board);
        setPostData(() => data.data.posts);
      } catch (error) {
        console.error("게시글을 가져오는 데 실패했습니다.", error);
      }
    };

    fetchData();
  }, []);

  const handlePageChange = (index: number) => {
    setCurrentPage(index);
  };

  const handleNoticePageChange = (index: number) => {
    setCurrentNoticePage(index);
  };

  const startIdx = currentPage * pageSize;
  const endIdx = startIdx + pageSize;

  const startNoticeIdx = currentNoticePage * pageSize;
  const endNoticeIdx = startNoticeIdx + pageSize;

  const pageItems = postData.filter((post) => post.type === "basic");
  const noticePageItems = postData.filter(
    (post) => post.type === "notification"
  );

  const currentPageItems = pageItems.slice(startIdx, endIdx);
  const currentNoticePageItems = noticePageItems.slice(
    startNoticeIdx,
    endNoticeIdx
  );

  return (
    <div className="flex justify-center">
      <main className="w-[1280px] px-8 py-16 flex gap-6 flex-col">
        <div>
          <div className="flex justify-between items-center pb-2">
            <h2 className="text-violet-800 text-3xl font-semibold">
              {boardData.name}
            </h2>
            <BaseButton>가입하기</BaseButton>
          </div>
          <hr className="border-slate-300" />
        </div>
        <section className=" grid grid-cols-[1fr] lg:grid-cols-[1fr_2fr] xl:grid-cols-[1fr_2fr_1fr] xl:grid-rows-1 gap-6">
          <img
            src={boardData.image}
            alt={boardData.name}
            className="h-64 w-full object-cover border rounded-md border-slate-200 bg-slate-200"
          />
          <p className="flex items-center">{boardData.description}</p>
          <div className="h-full flex gap-2 xl:border-l xl:items-center col-span-1 lg:col-span-2 xl:col-span-1">
            <div className="flex flex-col lg:flex-row gap-2 lg:gap-8 xl:gap-2 xl:flex-col">
              <div className="flex items-center xl:px-4">
                <figure className="flex items-center pr-2 gap-2">
                  <CrownIcon height="32px" />
                  <figcaption className="text-lg text-slate-800 truncate">
                    매니저
                  </figcaption>
                </figure>
                <p className="text-slate-600 truncate">
                  {boardData.manager.nickname} {boardData.manager.email}
                </p>
              </div>
              <div className="flex items-center xl:px-4">
                <figure className="flex items-center pr-[1.5rem] lg:pr-2 xl:pr-[1.5rem] gap-2">
                  <MenIcon height="32px" />
                  <figcaption className="text-lg text-slate-800 truncate">
                    멤버
                  </figcaption>
                </figure>
                <p className="text-slate-600">{boardData.memberCount}명</p>
              </div>
              <div className="flex items-center xl:px-4">
                <figure className="flex items-center pr-2 gap-2">
                  <CakeIcon height="32px" />
                  <figcaption className="text-lg text-slate-800 truncate">
                    개설일
                  </figcaption>
                </figure>
                <p className="text-slate-600">
                  {boardData.createdAt.split("T")[0]}
                </p>
              </div>
            </div>
          </div>
        </section>
        <hr className="border-slate-300" />
        <Tabs.Root defaultValue="all">
          <div className="flex justify-between">
            <Tabs.List className="flex gap-2">
              <Tabs.Trigger value="all">
                <button
                  onClick={() => setIsNotice(false)}
                  className="bg-violet-300 text-white font-bold px-10 py-2 rounded-lg disabled:bg-violet-800"
                  disabled={!isNotice}
                >
                  일반
                </button>
              </Tabs.Trigger>
              <Tabs.Trigger value="notice">
                <button
                  onClick={() => setIsNotice(true)}
                  className="bg-violet-300 text-white font-bold px-10 py-2 rounded-lg disabled:bg-violet-800"
                  disabled={isNotice}
                >
                  공지
                </button>
              </Tabs.Trigger>
            </Tabs.List>
            <BaseButton>글쓰기</BaseButton>
          </div>
          <div>
            <div className="grid grid-cols-[1fr_1fr_10fr_2fr_2fr_1fr] border-y-2 py-3 border-violet-800 text-center">
              <p>번호</p>
              <p>말머리</p>
              <p>제목</p>
              <p>글쓴이</p>
              <p>작성일</p>
              <p>조회</p>
            </div>
            <Tabs.Content value="all">
              {currentPageItems.map((post, index) => (
                <div
                  key={post._id}
                  className="grid grid-cols-[1fr_1fr_10fr_2fr_2fr_1fr] border-b py-3 border-slate-300 text-center text-sm text-slate-500"
                >
                  <p>{index + 1}</p>
                  <p className="flex justify-center items-center">
                    {post.type === "notification" ? (
                      <LoudSpeakerIcon height="24px" />
                    ) : (
                      <SpeechBubbleIcon height="24px" />
                    )}
                  </p>
                  <button className="text-start px-8 hover:underline underline-offset-4 text-base text-slate-800">
                    {post.title}
                  </button>
                  <p>{post.creator.nickname}</p>
                  <p>
                    {new Date(post.createdAt)
                      .toLocaleDateString("ko-KR", {
                        year: "2-digit",
                        month: "2-digit",
                        day: "2-digit",
                      })
                      .replace(/\.\s?/g, ".")
                      .replace(/(\d{2})\.(\d{2})\.(\d{2})/, "$1.$2.$3")}{" "}
                  </p>

                  <p>조회수</p>
                </div>
              ))}
              <Pagination
                total={pageItems.length}
                value={currentPage}
                onPageChange={handlePageChange}
                className="flex justify-center pt-8"
                blockSize={blockSize}
                pageSize={pageSize}
              >
                <Pagination.Navigator className="flex gap-4">
                  <Pagination.Buttons className="PaginationButtons flex gap-4 font-bold text-slate-300" />
                </Pagination.Navigator>
              </Pagination>
            </Tabs.Content>
            <Tabs.Content value="notice">
              {currentNoticePageItems.map((post, index) => (
                <div
                  key={post._id}
                  className="grid grid-cols-[1fr_1fr_10fr_2fr_2fr_1fr] border-b py-3 border-slate-300 text-center text-sm text-slate-500"
                >
                  <p>{index + 1}</p>
                  <p className="flex justify-center items-center">
                    {post.type === "notification" ? (
                      <LoudSpeakerIcon height="24px" />
                    ) : (
                      <SpeechBubbleIcon height="24px" />
                    )}
                  </p>
                  <button className="text-start px-8 hover:underline underline-offset-4 text-base text-slate-800">
                    {post.title}
                  </button>
                  <p>{post.creator.nickname}</p>
                  <p>
                    {new Date(post.createdAt)
                      .toLocaleDateString("ko-KR", {
                        year: "2-digit",
                        month: "2-digit",
                        day: "2-digit",
                      })
                      .replace(/\.\s?/g, ".")
                      .replace(/(\d{2})\.(\d{2})\.(\d{2})/, "$1.$2.$3")}{" "}
                  </p>

                  <p>조회수</p>
                </div>
              ))}
              <Pagination
                total={noticePageItems.length}
                value={currentNoticePage}
                onPageChange={handleNoticePageChange}
                className="flex justify-center pt-8"
                blockSize={blockSize}
                pageSize={pageSize}
              >
                <Pagination.Navigator className="flex gap-4">
                  <Pagination.Buttons className="PaginationButtons flex gap-4 font-bold text-slate-300" />
                </Pagination.Navigator>
              </Pagination>
            </Tabs.Content>
          </div>
        </Tabs.Root>
      </main>

      <style>
        {`
          .PaginationButtons button:disabled {
            color: #5B21B6;
          }
        `}
      </style>
    </div>
  );
};

export default BoardPage;

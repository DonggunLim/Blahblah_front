import { getCommentsByUserId } from "@apis/comment.api";
import { useUserContext } from "@context/userContext";
import { AspectRatio, Pagination } from "blahblah-front-common-ui-kit";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ProfileComment } from "~types/comment.type";
import { User } from "~types/user.type";
interface ProfileCommentsProps {
  profileUser?: User;
  selectedTab: string;
}

export type PageInfo = {
  currentPage: number;
  nextPage: number;
  prevPage: number;
  totalPage: number;
  totalCommentsCount: number;
};

const ProfileComments = ({
  profileUser,
  selectedTab,
}: ProfileCommentsProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [comments, setComments] = useState<ProfileComment[]>();
  const [pageInfo, setPageInfo] = useState<PageInfo>();
  const { user: signinedUser } = useUserContext();

  const handleChangePage = (index: number) => {
    setSearchParams({ selectedTab, page: String(index + 1) });
  };

  useEffect(() => {
    if (!profileUser || !signinedUser) return;
    const page = searchParams.get("page") ?? "1";

    getCommentsByUserId(profileUser ? profileUser._id : signinedUser._id, page) //
      .then(({ comments, pageInfo }) => {
        setComments(comments);
        setPageInfo(pageInfo);
      });
  }, [profileUser, searchParams]);

  return (
    <ul className="py-4">
      {comments?.map(({ content, createdAt, post }) => (
        <li className="flex gap-x-2 p-4 border-b">
          <div>
            <AspectRatio className="w-14 self-start">
              <AspectRatio.Image
                src={post.board.image}
                alt="board-image"
                className="w-full h-full object-contain"
              />
            </AspectRatio>
          </div>
          <div className="flex-grow">
            <div>
              <span
                className="text-xl font-bold text-violet-800 cursor-pointer"
                onClick={() => console.log("해당 게실물 이동")}
              >
                {post.title}{" "}
              </span>
              <span className="text-base font-semibold">에 남긴 댓글</span>
            </div>
            <p className="line-clamp-1">{content}</p>
            <span className="text-gray-500 text-sm">
              {createdAt.split("T")[0]}
            </span>
          </div>
        </li>
      ))}
      {pageInfo && (
        <Pagination
          onPageChange={handleChangePage}
          total={pageInfo?.totalCommentsCount ?? 0}
          value={pageInfo?.currentPage - 1}
        >
          <Pagination.Navigator className="flex justify-center items-center gap-x-2">
            <Pagination.Buttons className="px-3 py-1 bg-gray-200 rounded-md hover:bg-violet-300" />
          </Pagination.Navigator>
        </Pagination>
      )}
    </ul>
  );
};

export default ProfileComments;

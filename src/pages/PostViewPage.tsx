import { AspectRatio, Textarea } from 'blahblah-front-common-ui-kit';
import userIcon from '../../public/default-user-icon.svg';
import { ChangeEvent, useEffect, useState } from 'react';
import { deletePost, getPostData } from '../apis/post.api';
import { useNavigate, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import BaseButton from '../components/Button/BaseButton';
import { createComment, getComments } from '../apis/comment.api';
import PostComment from '../components/Comment/PostComment';

type defaultPostType = {
  title: string;
  nickname: string;
  createdAt: string;
  image: string;
  content: string;
};

export type defaultCommentType = {
  _id: string;
  content: string;
  createdAt: string;
  creator: {
    image: string;
    nickname: string;
    _id: string;
  };
};

const PostViewPage = () => {
  const navigator = useNavigate();
  const { postId = '677e9d96f28c4c6603555b14' } = useParams();

  const [postData, setPostData] = useState<defaultPostType>();
  const [commentData, setCommentData] = useState([]);
  const [comment, setComment] = useState<string>('');

  const handleCommentInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handlePostDelete = (postId: string) => {
    if (!postId) {
      alert('존재하지 않는 게시글입니다.');
      return;
    }

    deletePost(postId).then((data) => {
      if (!data.isError) {
        alert(data.message);
      }
    });
  };

  const handleCommentCreate = (postId: string) => {
    if (!postId) {
      alert('존재하지 않는 게시글입니다.');
      return;
    }

    createComment(postId, comment).then((data) => {
      if (!data.isError) {
        alert(data.message);
      }
    });
  };

  useEffect(() => {
    if (postId) {
      getPostData(postId).then((data) => {
        const post = data.post;

        const getdata = {
          title: post.title,
          nickname: post.creator.nickname,
          createdAt: post.createdAt,
          image: post.creator.image,
          content: post.content,
        };

        setPostData(getdata);
      });

      getComments(postId).then((data) => {
        const comments = data.comments;

        const filteredComments = comments.map(
          ({ _id, content, createdAt, creator }: defaultCommentType) => ({
            _id,
            content,
            createdAt,
            creator,
          })
        );

        setCommentData(filteredComments);
      });
    }
  }, []);

  return (
    <div className="min-w-[360px] max-w-[1280px] mx-auto py-20 bg-gray-100">
      <h1 className="text-center text-xl font-bold">게시글 보기</h1>

      <div className="p-5">
        <div className="bg-white px-10 py-5">
          <div className="flex justify-between">
            <p className="max-768:text-lg md:text-xl font-bold ">
              {postData ? postData.title : '제목'}
            </p>

            <div className="flex gap-2 px-2">
              <button
                className="text-sm text-green-500 text-nowrap"
                onClick={() => navigator(`/post/detail/${postId}`)}
              >
                수정
              </button>
              <button
                className="text-sm text-green-500 text-nowrap"
                onClick={() => handlePostDelete(postId)}
              >
                삭제
              </button>
            </div>
          </div>
          <div className="pt-5">
            <div className="w-10 bg-gray-100 p-2 rounded-[15px]">
              <AspectRatio ratio={1 / 1}>
                <AspectRatio.Image
                  className="w-full h-full rounded-md"
                  src={postData ? postData.image : userIcon}
                  alt="프로필 이미지"
                />
              </AspectRatio>
            </div>

            <div className="flex gap-5">
              <p className="">{postData ? postData.nickname : '닉네임'}</p>
              <p className="text-slate-300">
                {postData ? postData.createdAt.split('T')[0] : '2024-12-31'}
              </p>
            </div>
          </div>
          <p className="h-[1px] w-full bg-slate-200 mt-5" />
          <div
            className="p-5"
            style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: postData
                  ? DOMPurify.sanitize(postData.content)
                  : '작성 내용',
              }}
            />
          </div>
        </div>
        <div className="mt-5">
          <p className="text-lg font-semi">
            {commentData ? commentData.length : '0'} 개의 댓글
          </p>

          <div className="mt-2">
            <Textarea
              placeholder="댓글을 작성해주세요"
              className="p-2 resize-y w-full rounded-md border"
              name="comment"
              value={comment}
              onChange={handleCommentInput}
            />
            <div className="flex justify-end">
              <BaseButton
                className="text-sm "
                onClick={() => handleCommentCreate(postId)}
              >
                댓글 등록
              </BaseButton>
            </div>
          </div>
        </div>
        <p className="h-[2px] w-full bg-slate-200 mt-5" />

        {commentData
          ? commentData.map((comment, index) => (
              <PostComment key={index} comment={comment} />
            ))
          : null}
      </div>
    </div>
  );
};

export default PostViewPage;

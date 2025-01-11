import { getBoardBySigninUserId } from "@apis/board.api";
import { useEffect, useState } from "react";
type BoardItem = {
  name: string;
};
const ProfileBoard = () => {
  const [board, setBoard] = useState<BoardItem[]>([]);
  useEffect(() => {
    getBoardBySigninUserId() //
      .then(setBoard);
  }, []);
  return (
    <>
      <ul>
        {board.map((item, index) => (
          <li key={`board-item-${index}`}>{item.name}</li>
        ))}
      </ul>
    </>
  );
};

export default ProfileBoard;

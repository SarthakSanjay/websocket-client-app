import axios from "axios";
import { useEffect, useState } from "react";
import { TOKEN } from "../utils/util";
import { totalFriendReqAtom } from "../atom/atom";
import { useSetRecoilState } from "recoil";
import { User } from "../types/common";

interface request {
  id: number;
  sender: User;
  date: Date;
}
const FriendRequests = () => {
  const [requests, setRequests] = useState([]);
  const setTotalFriendReq = useSetRecoilState(totalFriendReqAtom);
  console.log("req", requests);
  useEffect(() => {
    async function fetchRequests() {
      const res = await axios.get(`/friend/all/request`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      setRequests(res.data.friendReq);
      setTotalFriendReq(res.data.friendReq.length);
    }
    fetchRequests();
  }, []);
  return (
    <div
      className={`h-full w-[65%] flex flex-col gap-2 rounded-3xl bg-gradient-to-r from-blue-600 to-violet-600 dark:bg-purple-950  p-4`}
    >
      {requests.map((req: request) => {
        return <Request req={req} />;
      })}
    </div>
  );
};
interface reqProp {
  req: request;
}
const Request: React.FC<reqProp> = ({ req }) => {
  const [isAccepted, setIsAccepted] = useState(false);
  return (
    <div className="bg-white/35 w-2/3 h-14 rounded-lg text-black px-3 flex items-center justify-between">
      <div className="flex gap-3 items-center">
        <img
          src={req.sender.profileImageUrl}
          className="h-10 w-10 rounded-lg"
        />
        <div className="h-10 flex flex-col ">
          <h1 className="text-lg w-max h-5">{req.sender.username}</h1>
          <span className="text-sm h-5 w-max text-gray-500">
            send you friend request
          </span>
        </div>
      </div>
      <div className="flex gap-3">
        <button
          className={`bg-black/80 ${
            isAccepted ? "text-green-500" : "text-sky-500"
          } h-7 w-max px-2 rounded-lg`}
          onClick={async () => {
            const res = await axios.put(
              `/friend/accept`,
              {
                friendId: req.sender.id,
              },
              {
                headers: {
                  Authorization: `Bearer ${TOKEN}`,
                },
              }
            );
            if (res.data.Accepted) {
              setIsAccepted(true);
            }
          }}
        >
          {isAccepted ? "Accepted" : "Accept"}
        </button>
        <button className="bg-black/80 text-orange-500 h-7 w-max px-2 rounded-lg">
          Reject
        </button>
      </div>
    </div>
  );
};
export default FriendRequests;

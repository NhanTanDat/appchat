import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

const AllUsers = () => {
  const { user } = useContext(AuthContext);
  const { potentialChats, createChat } = useContext(ChatContext);
  const { onlineUsers } = useContext(ChatContext);
  return (
    <>
      <div className="all-users">
        {potentialChats &&
          potentialChats.map((receiver, index) => (
            <div
              className="single-user"
              key={index}
              onClick={() => createChat(user._id, receiver._id)}
            >
              {receiver.name}  
            </div>
          ))}
      </div>
    </>
  );
};

export default AllUsers;

import { useContext ,useState} from "react";
import { Container, Stack } from "react-bootstrap";
import AllUsers from "../components/Chat/AllUsers";
import ChatBox from "../components/Chat/ChatBox";
import UserCard from "../components/Chat/UserCard";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import FriendRequest from '../components/Request/FriendRequest';
const Chat = () => {
  const { user } = useContext(AuthContext);
  const { userChats, isUserChatsLoading, updateCurrentChat} =
    useContext(ChatContext);
    const { suggestRequest, SuggestRequest,getfriendRequests,friendRequests} =
    useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
    suggestRequest();
    getfriendRequests();
    setIsOpen(!isOpen);
  };
  

  return (
    <div className="container-chat">
      <AllUsers />
      <button onClick={togglePopup}>Open Popup</button>
      {isOpen && <> 
      <div className="overlay" ></div>
      {SuggestRequest && ( <FriendRequest onClose={togglePopup} data={SuggestRequest} datafriendRequests={friendRequests}/>)}
     </>}
      {userChats?.length < 1 ? null : (
        <Stack direction="horizontal" gap={4} className="align-items-start">
          <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
            {isUserChatsLoading && <p>Fetching Chats..</p>}
            {(!isUserChatsLoading && !userChats) ||
              (!userChats?.length === 0 && <p>No Chats..</p>)}
            {userChats?.map((chat, index) => {
              return (
                <div key={index} onClick={() => updateCurrentChat(chat)}>
                  <UserCard chat={chat} user={user} />
                </div>
              );
            })}
          </Stack>
          
          <ChatBox />
        </Stack>
      )}
    </div>
  );
};

export default Chat;

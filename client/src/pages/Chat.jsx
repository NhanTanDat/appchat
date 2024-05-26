import { useContext ,useState} from "react";
import { Container, Stack } from "react-bootstrap";
import ChatBox from "../components/Chat/ChatBox";
import UserCard from "../components/Chat/UserCard";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import ChatGroup from '../components/ChatGroup/ChatGroup';
import FriendRequest from '../components/Request/FriendRequest';

const Chat = () => {
  const { user } = useContext(AuthContext);
  const { userChats, isUserChatsLoading, updateCurrentChat,createGroupChat} =
    useContext(ChatContext);
    const { suggestRequest, SuggestRequest,getfriendRequests,friendRequests,getAllFriendsByID,friends} =
    useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
   
    const [isOpenChatGroup, setIsOpenChatGroup] = useState(false);
  const togglePopup = () => {
    suggestRequest();
    getfriendRequests();
    setIsOpen(!isOpen);
  };
  const togglePopupChatGroup = () => {
    getAllFriendsByID(user._id);
    setIsOpenChatGroup(!isOpenChatGroup);
  };
  
  console.log("userChats",userChats)
  return (
   
    <div>
      
     {isOpenChatGroup && <> 
      <div className="overlay" ></div>
      {friends && ( <ChatGroup onClose={togglePopupChatGroup} friends={friends} user={user} createGroupChat={createGroupChat}/>)}
     </>}
       {isOpen && <> 
      <div className="overlay" ></div>
      {SuggestRequest && ( <FriendRequest onClose={togglePopup} data={SuggestRequest} datafriendRequests={friendRequests}/>)}
     </>}
    <div className="container-chat">
       <div className="container-chats">
      <div style={{display:"flex", justifyContent:"space-between"}}>
      <button onClick={togglePopup}>+ Thêm bạn</button>
      <button onClick={togglePopupChatGroup}>+ Nhóm</button>
      </div>
      {userChats?.length < 1 ? null : (
        <Stack direction="horizontal" gap={4} className="align-items-start">
          <Stack className="messages-box flex-grow-0 pe-3 chat-scroll " gap={3}>
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
        </Stack>   
      )}
      </div>
      <ChatBox/>
    </div>
    </div>
  );
};

export default Chat;

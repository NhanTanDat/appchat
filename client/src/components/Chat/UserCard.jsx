import { useContext } from "react";
import { Stack } from "react-bootstrap";
import avarter from "../../assets/avarter.svg";
import { ChatContext } from "../../context/ChatContext";
import { useFecthLatestMessage } from "../../hooks/useFetchLatestMessage";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { unreadNotificationsFunc } from "../../utils/unreadNotifications";
import moment from "moment";

const UserCard = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipientUser(chat, user);
  const { latestMessage } = useFecthLatestMessage(chat);
  const { onlineUsers, notifications, markThisUserNotificationsAsRead } =
    useContext(ChatContext);
    const otherMember = chat.members.find(member => member._id !== user._id);
  const unreadNotifications = unreadNotificationsFunc(notifications);

  const isOnline = onlineUsers?.some(
    (user) => user?.userId === recipientUser?._id
  );

  const thisUserNotifications = unreadNotifications?.filter(
    (n) => n.senderId == recipientUser?._id
  );
  
  const truncateText = (text) => {
    let shortText = text.substring(0, 20);

    if (text.length > 20) {
      shortText = shortText + "...";
    }

    return shortText;
  };


console.log(recipientUser)
  return (
    <div className="oke">
      <Stack
        direction="horizontal"
        className="user-card p-3 justify-content-between"
        role="button"
        onClick={() => {
          if (thisUserNotifications?.length !== 0) {
            markThisUserNotificationsAsRead(
              thisUserNotifications,
              notifications
            );
          }
        }}
      >
        <div className="d-flex ">
          <div className="">
            {recipientUser && ( 
              <div>
                {chat?.members.length > 2 ? (
                 <div class="avatar-group">
                    <div style={{ height: "50px", width: "50px"}}>
                      <div style={{display:"flex"}}>
                      {chat?.members.slice(0, 2).map((member, index) => (
                        <img src={member.avatar} className="avatar" height="24px" key={index} />
                      ))}
                        </div>
                      <div style={{display:"flex"}}>
                        {chat?.members.slice(2, 3).map((member, index) => (
                          <img src={member.avatar} className="avatar" height="24px" key={index} />
                        ))}
                        {chat?.members.length > 3 && (
                          
                          <div style={{backgroundColor:"#E5E8EA", minWidth:"30px",maxHeight:"40px", borderRadius:"20px", display:"flex", justifyContent:"center", alignItems:"center"}}>+{chat.members.length - 3}</div>
                        )}
                      </div>
                    </div>
                </div>
                ) : (<img src={otherMember.avatar}  height="50px" width="50px" style={{borderRadius:"50%"}} />)}
              </div>
            )} 
            <span className={isOnline ? "user-online" : ""}></span>
          </div>
          <div className="text-content">
            <div className={latestMessage?.text ? "name":"name2"} >{chat?.members.length > 2 ? chat?.name : otherMember?.name}</div>
            {latestMessage?.text && (
            <div className="text">
                <span>{truncateText(latestMessage?.text)}</span>
            </div>
             )}
          </div>
        </div>
        <div className="d-flex flex-column align-items-end">
          <div className="date">
            {moment(latestMessage?.createdAt).calendar()}
          </div>
          <div
            className={
              thisUserNotifications?.length > 0 ? "this-user-notifications" : ""
            }
          >
            {thisUserNotifications?.length > 0
              ? thisUserNotifications?.length
              : ""}
          </div>
         
        </div>
      </Stack>
    </div>
  );
};

export default UserCard;

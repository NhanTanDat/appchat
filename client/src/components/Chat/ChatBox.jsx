import { useRef, useState } from "react";
import { useContext } from "react";
import { Stack } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import moment from "moment";
import InputEmoji from "react-input-emoji";
import { useEffect } from "react";
import icon from "../../assets/Dots_Menu_Icon_UIA.png"
import avarter from "../../assets/avarter.svg"
import icon2 from "../../assets/Frame 958477824.png"
const ChatBox = () => {
  const fileInputRef = useRef(null);
  const { user } = useContext(AuthContext);
  const { currentChat, messages, sendTextMessage, isMessagesLoading } =
    useContext(ChatContext);
    
  const { recipientUser } = useFetchRecipientUser(currentChat, user);
  const [textMessage, setTextMessage] = useState("");
  const scroll = useRef();
  const [sendingMessage, setSendingMessage] = useState(false);
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const [img, setImg] = useState([]);
  const [video, setVideo] = useState([]);
  
  if (!recipientUser)
    return (
      <p style={{ textAlign: "center", width: "100%" }}>
        Chưa có cuộc trò chuyện nào được chọn..
      </p>
    );

  if (isMessagesLoading)
    return (
      <p style={{ textAlign: "center", width: "100%" }}>Loading chat...</p>
    );
    const handleSendMessage = () => {
      const combinedFiles = [];
        if (Array.isArray(img)) {
          combinedFiles.push(...img);
        }
        if (Array.isArray(video)) {
          combinedFiles.push(...video);
        }
      if (textMessage.trim() !== '' && !sendingMessage) {
        console.log(combinedFiles)
        setSendingMessage(true); // Set sendingMessage to true to prevent multiple send

        sendTextMessage(textMessage, user,currentChat._id, combinedFiles, () => {
          setTextMessage(''); // Reset text message input after sending
          setSendingMessage(false); // Set sendingMessage back to false after sending
          setImg([]); // Remove all elements from the img array
          setVideo([]); // Remove all elements from the video array
        }); 
      }
    };
  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
    console.log(index)
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };
  
  const toggleMenu = (e) => {
    setMenuPosition({ x: e.clientX, y: e.clientY });
    setMenuOpen(!menuOpen);
  };
  const handleCopyMessage = (index) => {
    const messageToCopy = messages[index]?.text;
    if (messageToCopy) {
      navigator.clipboard.writeText(messageToCopy)
        .then(() => {
          console.log('Message copied to clipboard:', messageToCopy);
          // Optionally, you can show a success message or perform other actions here
        })
        .catch((error) => {
          console.error('Failed to copy message to clipboard:', error);
          // Optionally, you can show an error message or perform other actions here
        });
    }
  };

  const handleDeleteMessage = () => {
    
  };
  const handleRemoveImage = (index) => {
    setImg(img.filter((_, i) => i !== index));
  };
  const handleRemoveVideo = (index) => {
    setVideo(video.filter((_, i) => i !== index));
  };
  const getFileType = (fileName) => {
    const extension = fileName.split(".").pop().toLowerCase();
    if (["jpg", "jpeg", "png", "gif"].includes(extension)) {
      console.log("image")
      return "image";
      
    } else if (["mp4", "avi", "mov", "wmv"].includes(extension)) {
      console.log("video")
      return "video";
      
    } else {
      console.log("unknown")
      return "unknown";
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const fileType = getFileType(file.name);
      if (fileType === "image") {
        setImg([...img, file]);
        console.log(img)
      } else if (fileType === "video") {
        setVideo([...video, file]);
        console.log(video)
      } else {
        // Xử lý khi là tệp không xác định
      }
    }
  };
  const otherMember = currentChat.members.find(member => member._id !== user._id);
  const abc =  (id) =>{
    console.log("currentChatcurrentChatcurrentChatcurrentChat",currentChat)
      return currentChat.members.find(member => member._id == id);
  }




  return (
    <Stack  className="chat-box">
      <div className="chat-header">
      <div style={{display:"flex", alignItems:"center", fontWeight:"700", gap:"16px"}} className="">
            {recipientUser && ( 
              <div>
                {currentChat?.members.length > 2 ? (
                 <div class="avatar-group">
                    <div style={{ height: "50px", width: "50px"}}>
                      <div style={{display:"flex"}}>
                      {currentChat?.members.slice(0, 2).map((member, index) => (
                        <img src={member.avatar} className="avatar" height="24px" key={index} />
                      ))}
                        </div>
                      <div style={{display:"flex"}}>
                        {currentChat?.members.slice(2, 3).map((member, index) => (
                          <img src={member.avatar} className="avatar" height="24px" key={index} />
                        ))}
                        {currentChat?.members.length > 3 && (
                          
                          <div style={{backgroundColor:"#E5E8EA", minWidth:"30px",maxHeight:"40px", borderRadius:"20px", display:"flex", justifyContent:"center", alignItems:"center"}}>+{currentChat.members.length - 3}</div>
                        )}
                      </div>
                    </div>
                </div>
                ) : (<div>
                  {otherMember && (<img src={otherMember.avatar}  height="50px" width="50px" style={{borderRadius:"50%"}} />)}
                  </div>)}
              </div>
            )} 
            {recipientUser &&(<div className="name" >{currentChat?.members.length > 2 ? currentChat?.name : otherMember?.name}</div>)}
          </div>
      </div>
      <Stack gap={3} className="messages">
      {messages &&
  messages?.map((message, index) => (
    <Stack
            className="message-hover-area"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            key={index}
          >
    <Stack
      className={`${
        message?.senderId === user?._id
          ? "message self align-self-end flex-grow-0"
          : "message align-self-start flex-grow-0"
      }`}
      key={index}
      ref={scroll}
      onMouseEnter={() => handleMouseEnter(index)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="message-contai">
        {message?.senderId === user?._id ? (
          <>
           <span className="message-id" onClick={toggleMenu}  style={{ visibility: hoveredIndex === index ? 'visible' : 'hidden' }}>
                      <img src={icon} style={{ marginRight: '20px' }} />
                      {menuOpen && (
                        <div className="menu-okela" style={{ top: menuPosition.y, left: menuPosition.x }}>
                          <div className="menu-item" onClick={() => handleCopyMessage(index)}>Copy</div>
                          <div className="menu-item" onClick={handleDeleteMessage}>Delete</div>
                        </div>
                )}
                    </span>
            <Stack className="message-okela">
              <span>{message.text}</span>
              <div style={{display:"flex" , gap:"10px" , marginTop:"16px"}}> 
              <div className="image-container">
          {message.attachments.map((attachment, index) => (
            attachment.type === 'image' && (
              <div key={index} className="image-wrapper">
                <img src={attachment.url} alt={`Image ${index}`} className="message-image" />
              </div>
            )
          ))}
         
        </div>
       
        <div className="video-container">
          {message.attachments.map((attachment, index) => (
            attachment.type === 'video' && (
              <video key={index} controls className="message-video">
                <source src={attachment.url} type="video/mp4" />
              </video>
            )
          ))}
        </div>
        </div>
              <span className="message-footer">
                {moment(message.createdAt).calendar()}
              </span>
            </Stack>
          </>
        ) : (
          <>
            <Stack>
              <div style={{display:"flex"}}>
                {currentChat.members.length > 2 ? ( <img height="50px" width="50px" style={{borderRadius:"50%", marginRight:"16px"}} src={ abc(message.senderId).avatar}/>):<img height="50px" width="50px" style={{borderRadius:"50%", marginRight:"16px"}} src={otherMember.avatar} />}
               
              <div>
                
              {currentChat.members.length > 2 ? ( <span style={{fontWeight:"700"}}>{abc(message.senderId).name}</span>):(<span style={{fontWeight:"700"}}>{otherMember.name}</span>)}
              <div style={{backgroundColor:"#F0F0F0", padding:"16px", borderRadius:"8px"}}>
               
              <span>{message.text}</span>
              <div style={{display:"flex" , gap:"10px" , marginTop:"16px"}}> 
              <div className="image-container">
          {message.attachments.map((attachment, index) => (
            attachment.type === 'image' && (
              <div key={index} className="image-wrapper">
                <img src={attachment.url} alt={`Image ${index}`} className="message-image" />
              </div>
            )
          ))}
         
        </div>
       
        <div className="video-container">
          {message.attachments.map((attachment, index) => (
            attachment.type === 'video' && (
              <video key={index} controls className="message-video">
                <source src={attachment.url} type="video/mp4" />
              </video>
            )
          ))}
        </div>
        </div>
              <span className="message-footer">
                {moment(message.createdAt).calendar()}
              </span>
              </div>
              </div>
              </div>
            </Stack>
            <span className="message-senderId" onClick={toggleMenu} style={{ visibility: hoveredIndex === index ? 'visible' : 'hidden' } }>
                <img src={icon} style={{ marginLeft: '20px' }} />
                {menuOpen && (
                        <div className="menu-okela" style={{ top: menuPosition.y, left: menuPosition.x }}>
                          <div className="menu-item" onClick={() => handleCopyMessage(index)}>Copy</div>
                          <div className="menu-item" onClick={handleDeleteMessage}>Delete</div>
                        </div>
                )}
            </span>
          </>
        )}
      </div>
    </Stack>
    </Stack>
  ))}
      </Stack>
      <div className="img-video">
      {img.map((file, index) => (
    <li key={index} style={{ position: "relative", display: "inline-block" }}>
      <img src={URL.createObjectURL(file)} alt={`Image ${index}`} style={{ borderRadius: "50%" ,width:"100px", height:"100px"}} />
      <button
        onClick={() => handleRemoveImage(index)}
        style={{
          position: "absolute",
          top: "0",
          right: "0",
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
      >
        X
      </button>
    </li>
  ))}
        </div>
        <div>
        {video.map((file, index) => (
    <li key={index} style={{ position: "relative", display: "inline-block" }}>
        <video controls width="300" height="200" className="video">
        <source src={URL.createObjectURL(file)} type={file.type} />
      </video>
      <button
        onClick={() => handleRemoveVideo(index)}
        style={{
          position: "absolute",
          top: "0",
          right: "0",
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
      >
        X
      </button>
    </li>
  ))}
      </div>
      <Stack direction="horizontal" className="chat-input flex-grow-0" gap={3}>
        <div>
      <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileSelect}
          multiple
        />
        <button className="file-btn" onClick={() => fileInputRef.current && fileInputRef.current.click()}>
          <img src={icon2} alt="file" />
        </button>
        </div>
        <InputEmoji
          value={textMessage}
          onChange={setTextMessage}
          fontFamily="nunito"
          borderColor="rgba(72, 112, 223, 0.2)"
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleSendMessage()
            }
        }}
        />
        <button
          className="send-btn"
          onClick={() => 
            handleSendMessage()
          }
          
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-send-fill"
            viewBox="0 0 16 16"
          >
            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
          </svg>
        </button>
      </Stack>
    </Stack>
  );
};

export default ChatBox;

import { useCallback, useEffect, useState } from "react";
import { createContext } from "react";
import { baseUrl, getRequest, postRequest,postMAMAYRequest } from "../utils/service";
import { io } from "socket.io-client";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [messagesError, setMessagesError] = useState(null);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState(null);
  const [sendTextMessageError, setSendTextMessageError] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
  const [potentialChats, setPotentialChats] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [allUsers, setAllUsers] = useState([]);





  console.log("userChats", userChats);
  console.log("currentChat", currentChat);
  console.log("messages", messages);
  console.log("messagesError", messagesError);
  console.log("onlineUsers", onlineUsers);
  console.log("sendTextMessageError", sendTextMessageError);
  console.log("notifications", notifications);

 
  useEffect(() => {
    const newSocket = io("http://localhost:80");
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    if (socket === null) return;
    socket.emit("addNewUser", user?._id);
    socket.on("getUsers", (res) => {
      setOnlineUsers(res);
    });
    return () => {
      socket.off("getUsers");
    };
  }, [socket]);

  useEffect(() => {
    if (socket === null) return;
    const recipientIds = currentChat.members
      .filter((member) => member._id !== user?._id)
      .map((member) => member._id);
    console.log("currentChatcurrentChatcurrentChatcurrentChat",currentChat)
    console.log("recipientIdrecipientId",recipientIds)
    console.log("useruseruseruseruser",user)
    socket.emit("sendMessage", { ...newMessage, recipientIds });
  }, [newMessage]);


  useEffect(() => {
    if (socket === null) return;
    socket.on("getMessage", (res) => {
      if (currentChat?._id !== res.chatId) return;
      setMessages((prev) => [...prev, res]);
    });
    socket.on("getNotification", (res) => {
      const isChatOpen = currentChat?.members.some((Id) => Id === res.senderId);
      if (isChatOpen) {
        setNotifications((prev) => [{ ...res, isRead: true }, ...prev]);
      } else {
        setNotifications((prev) => [res, ...prev]);
      }
    });

    return () => {
      socket.off("getMessage");
      socket.off("getNotification");
    };
  }, [socket, currentChat]);

  useEffect(() => {
    const getMessages = async () => {
      setIsMessagesLoading(true);

      const response = await getRequest(
        `${baseUrl}/messages/${currentChat?._id}`
      );

      setIsMessagesLoading(false);

      if (response.error) {
        return setMessagesError(error);
      }

      setMessages(response);
    };
    getMessages();
  }, [currentChat]);

  const createGroupChat = async (memberIds,name,file)=> {
    try {
      const formData = new FormData();
      formData.append("memberIds", JSON.stringify(memberIds));
      formData.append("name", name);
      formData.append("image", file);
      const response = await postMAMAYRequest(
        `${baseUrl}/users/creatgroupchat`,
        formData
      );
    
      if (!response.ok) {
        throw new Error(`Failed to create group chat: ${response.statusText}`);
      }
    
      return response;
    } catch (error) {
      
    }
   
  };


  useEffect(() => {
    // const getUsers = async () => {
    //   const response = await getRequest(`${baseUrl}/users`);

    //   if (response.error) {
    //     return console.log("Error fetching users:", response);
    //   }

    //   if (userChats) {
    //     const pChats = response?.filter((u) => {
    //       let isChatCreated = false;

    //       if (user._id === u._id) return false;

    //       isChatCreated = userChats?.some(
    //         (chat) => chat.members[0] === u._id || chat.members[1] === u._id
    //       );

    //       return !isChatCreated;
    //     });

    //     setPotentialChats(pChats);
    //   }

    //   setAllUsers(response);
    // };

    // getUsers();
  }, [userChats]);

  useEffect(() => {
    const getUserChats = async () => {
      setIsUserChatsLoading(true);
      setUserChatsError(null);

      if (user?._id) {
        const userId = user?._id;

        const response = await getRequest(`${baseUrl}/chats/${userId}`);

        if (response.error) {
          return setUserChatsError(response);
        }
        setUserChats(response);
      }

      setIsUserChatsLoading(false);
    };

    getUserChats();
  }, [user, notifications]);

  const updateCurrentChat = useCallback(async (chat) => {
     setCurrentChat(chat);
  }, []);

  const sendTextMessage = useCallback(async (textMessage, sender, currentChatId ,files, setTextMessage) => {
    try {
      const formData = new FormData();
      formData.append("text", textMessage);
      formData.append("senderId", sender?._id);
      formData.append("chatId", currentChatId);
      if (files && Array.isArray(files)) { 
        files.forEach((file, index) => {
              formData.append("attachments", file);
              console.log(file);
          });
        }
        const response = await postMAMAYRequest(`${baseUrl}/messages`, formData);

        if (response.error) {
            throw new Error(response.message);
        }
        setNewMessage(response.data);
  
        setMessages(prev => [...prev, response.data]);
        setTextMessage("");
    } catch (error) {
        setSendTextMessageError({ error: true, message: error.message });
    }
}, []);
  

  const createChat = useCallback(async (senderId, receiverId) => {
    const response = await postRequest(
      `${baseUrl}/chats`,
      JSON.stringify({ senderId, receiverId })
    );
    if (response.error) {
      return console.log("Lỗi khi tạo cuộc trò chuyện:", response);
    }
    setUserChats((prev) => [...prev, response]);
  }, []);

  const markAllNotificationsAsRead = useCallback((notifications) => {
    const modifiedNotifications = notifications.map((n) => {
      return { ...n, isRead: true };
    });
    setNotifications(modifiedNotifications);
  }, []);

  
  const markNotificationAsRead = useCallback(
    (n, userChats, user, notifications) => {
      const readChat = userChats.find((chat) => {
        const chatMembers = [user._id, n.senderId];
        const isDesiredChat = chat?.members.every((member) => {
          return chatMembers.includes(member);
        });
        return isDesiredChat;
      });
      const modifiedNotifications = notifications.map((element) => {
        if (n.senderId === element.senderId) {
          return { ...n, isRead: true };
        } else {
          return element;
        }
      });
     updateCurrentChat(readChat);
      setNotifications(modifiedNotifications);
    },
    []
  );

  const markThisUserNotificationsAsRead = useCallback(
    (thisUserNotifications, notifications) => {

      const modifiedNotifications = notifications.map((element) => {
        let notification;

        thisUserNotifications.forEach((n) => {
          if (n.senderId === element.senderId) {
            notification = { ...n, isRead: true };
          } else {
            notification = element;
          }
        });

        return notification;
      });

      setNotifications(modifiedNotifications);
    },
    []
  );

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        updateCurrentChat,
        currentChat,
        messages,
        messagesError,
        socket,
        sendTextMessage,
        onlineUsers,
        potentialChats,
        createChat,
        notifications,
        allUsers,
        markAllNotificationsAsRead,
        markNotificationAsRead,
        markThisUserNotificationsAsRead,
        newMessage,
        createGroupChat
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

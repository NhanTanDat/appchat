import { useEffect } from "react";
import { createContext, useCallback, useState } from "react";
import { baseUrl, postRequest,getRequest } from "../utils/service";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [SuggestRequest, setsuggestRequest]  = useState(null);
  const [friendRequests, setfriendRequests]  = useState(null);
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    phone:"",
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    emailOrPhone: "",
    password: "",
  });

  console.log("Userr:", user);
  console.log("registerError:", registerError);
  console.log("isRegisterLoading:", isRegisterLoading);
  console.log("loginError:", loginError);
  console.log("isLoginLoading:", isLoginLoading);

  useEffect(() => {
    const user = localStorage.getItem("User");
    setUser(JSON.parse(user));
  }, []);

  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
  }, []);

  const registerUser = useCallback(
    async (e) => {
      e.preventDefault();

      setIsRegisterLoading(true);
      setRegisterError(null);

      const response = await postRequest(
        `${baseUrl}/users/register`,
        JSON.stringify(registerInfo)
      );

      setIsRegisterLoading(false);

      if (response.error) {
        return setRegisterError(response);
      }
      localStorage.setItem("token", JSON.stringify(response.token));

      getUserInfo();
    },
    [registerInfo]
  );
  const acceptFriendRequest = async (senderId) => {

    setIsRegisterLoading(true);
    setRegisterError(null);


    const data = {
      requestId: senderId,
    }
    const response = await postRequest(
      `${baseUrl}/users/acceptfriendrequest`,
      JSON.stringify(data)
    );

    setIsRegisterLoading(false);

};

  const requestFriend = async (receiverId) => {

      setIsRegisterLoading(true);
      setRegisterError(null);


      const userString = localStorage.getItem("User");
      const user = JSON.parse(userString); 
      const senderId = user._id; 
      const data = {
        senderId: senderId,
        receiverId: receiverId,
      }

      const response = await postRequest(
        `${baseUrl}/users/sendfriendrequest`,
        JSON.stringify(data)
      );

      setIsRegisterLoading(false);

  };

  const getfriendRequests = async () => {
    setIsRegisterLoading(true);
    setRegisterError(null);

    try {
      const userString = localStorage.getItem("User");
      const user = JSON.parse(userString); // Chuyển đổi chuỗi JSON thành đối tượng
      const senderId = user._id; 
      const id = senderId.replace(/^"|"$/g, ''); 

        const userId = {
          senderId: id,
        };

        const response = await postRequest(
            `${baseUrl}/users/getsenderinfo`,
            JSON.stringify(userId)
        );

        setIsRegisterLoading(false);

        if (response && !response.error) {
            setfriendRequests(response);
        } else {
            // Xử lý khi có lỗi từ server
            setRegisterError(response);
        }
    } catch (error) {
        console.error(error);
        // Xử lý khi có lỗi từ phía client
        setRegisterError({ error: true, message: "Đã xảy ra lỗi khi lấy danh sách yêu cầu kết bạn" });
        setIsRegisterLoading(false);
    }
};

  const suggestRequest = async () => {

    setIsRegisterLoading(true);
    setRegisterError(null);
    const userString = localStorage.getItem("User");
    const user = JSON.parse(userString); // Chuyển đổi chuỗi JSON thành đối tượng
    const senderId = user._id; 
    const id = senderId.replace(/^"|"$/g, ''); 

      const userId = {
        id: id,
      };
    const response = await postRequest(
      `${baseUrl}/users/`,
      JSON.stringify(userId)
    );

    setIsRegisterLoading(false);

    if (response.error) {
      return setRegisterError(response);
    }

    setsuggestRequest(response)
  };

  const getUserInfo = async () => {

    setIsRegisterLoading(true);
    setRegisterError(null);

    const response = await postRequest(
      `${baseUrl}/users/userInfo`,
    );

    setIsRegisterLoading(false);

    if (response.error) {
      return setRegisterError(response);
    }

    localStorage.setItem("User", JSON.stringify(response));
    setUser(response);
};

  const loginUser = useCallback(
    async (e) => {
      e.preventDefault();

      setIsLoginLoading(true);
      setLoginError(null);

      const response = await postRequest(
        `${baseUrl}/users/login`,
        JSON.stringify(loginInfo)
      );

      setIsLoginLoading(false);

      if (response.error) {
        return setLoginError(response);
      }

      localStorage.setItem("token", JSON.stringify(response.token));
      getUserInfo();
    },
    [loginInfo]
  );

  const logoutUser = useCallback(() => {
    localStorage.removeItem("User");
    localStorage.setItem("token", JSON.stringify(""));
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        registerUser,
        loginUser,
        registerInfo,
        updateRegisterInfo,
        loginInfo,
        updateLoginInfo,
        loginError,
        isLoginLoading,
        registerError,
        isRegisterLoading,
        logoutUser,
        suggestRequest,
        SuggestRequest,
        requestFriend,
        getfriendRequests,
        friendRequests,
        acceptFriendRequest,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

import axios from 'axios';
export const baseUrl = "http://localhost:3000/api";

export const postRequest = async (url, body) => {
  const tokenWithQuotes = localStorage.getItem("token");
  const token = tokenWithQuotes.replace(/^"|"$/g, ''); 

  const logoutUser = () => {
    localStorage.removeItem("User");
    setUser(null);
  };


  const response = await fetch(url, {
    mode: 'cors',
    credentials: 'include',
    method: "POST",
    headers:{
      'Authorization': token,
      'Origin': 'http://localhost:5173',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body,
  });

  const data = await response.json();

  if (!response.ok) {
    let message;

    if (data?.message) {
      message = data.message;
    } else {
      message = data;
    }

    return { error: true, status: response.status, message };
  }

  if (response.status === 401) {
    logoutUser(); 
    return { error: true, status: response.status, message: "Token không hợp lệ" };
  }

  return data;
};

export const postMAMAYRequest = async (url, body) => {
  // const logoutUser = () => {
  //   localStorage.removeItem("User");
  //   setUser(null);
  // };

  try {
    const tokenWithQuotes = localStorage.getItem("token");
    const token = tokenWithQuotes.replace(/^"|"$/g, ''); 

    const response = await axios.post(url, body, {
      headers: {
        'Authorization': token,
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true // ensure cookies are sent with the request
    });

    const data = response.data;

    if (!response.status >= 200 && response.status < 300) {
      let message = data?.message || "An error occurred";
      return { error: true, status: response.status, message };
    }

    if (response.status === 401) {
      logoutUser(); 
      return { error: true, status: response.status, message: "Token không hợp lệ" };
    }

    return data;
  } catch (error) {
    console.error('Error:', error);
    return { error: true, status: 500, message: 'Internal Server Error' };
  }
};


export const getRequest = async (url) => {

  const response = await fetch(url);

  const data = await response.json();

  if (!response.ok) {
    let message = "Đã xảy ra lỗi...";

    if (data?.message) {
      message = data.message;
    }

    return { error: true, status: response.status, message };
  }

  return data;
};

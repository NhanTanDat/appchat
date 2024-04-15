export const baseUrl = "http://localhost:3000/api";

export const postRequest = async (url, body) => {
  const tokenWithQuotes = localStorage.getItem("token");
  const token = tokenWithQuotes.replace(/^"|"$/g, ''); 

  const logoutUser = () => {
    localStorage.removeItem("User");
    setUser(null);
  };


  const response = await fetch(url, {
    method: "POST",
    headers:{
      "Content-Type": "application/json",
      "Authorization": token
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

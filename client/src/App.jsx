import { Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Container from "react-bootstrap/Container";
import NavBar from "./components/NavBar";
import { ChatContextProvider } from "./context/ChatContext";
import { useContext ,useState} from "react";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/Home/Home";
import AccountInformation from "../src/components/Profile/AccountInformation";
function App() {
  const { user,getUserInformation,userInfor } = useContext(AuthContext);
  const [isAccountInformation, setIsAccountInformation] = useState(false);

  const togglePopupAccountInformation = () => {
    setIsAccountInformation(!isAccountInformation);
  };


  



  return (
    <ChatContextProvider user={user}>
    
      <NavBar togglePopupAccountInformation={togglePopupAccountInformation}/>
      {isAccountInformation && (
        <>     <div className="overlay" onClick={togglePopupAccountInformation}>
        </div>
          <AccountInformation onClose={togglePopupAccountInformation} /></>
   
      )}
        <Routes>
          <Route path="/" element={user ? <Chat /> : <Login />} />
          <Route path="/register" element={user ? <Chat /> : <Register />} />
          <Route path="/login" element={user ? <Chat /> : <Login />} />
          <Route path="/home" element={ <Home />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

    </ChatContextProvider>
  );
}

export default App;

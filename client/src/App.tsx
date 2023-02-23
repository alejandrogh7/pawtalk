import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import ChatRooms from "./components/ChatRooms";
import ChatRoomNotFound from "./components/ChatRoomNotFound";
import SignInCont from "./components/SignInCont";
import SignUpCont from "./components/SignUpCont";
import { useEffect } from "react";
import useCookies from "./hooks/useCookies";
import CreateRoomCont from "./components/CreateRoomCont";
import "./styles/App.css";

function App() {
  const aToken = useCookies("access_token", "");
  const rToken = useCookies("refresh_token", "");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!aToken && !rToken) {
      if (location.pathname === "/") {
        return navigate("/signin", { replace: true });
      }
    } else {
      if (location.pathname === "/") {
        return navigate("/chat", { replace: true });
      }
    }
  }, [location.pathname]);

  return (
    <div className="App">
      <Routes>
        <Route path="/room">
          <Route path="/room/create" element={<CreateRoomCont />} />
        </Route>
        <Route path="/chat/">
          <Route path="/chat/" element={<ChatRoomNotFound />} />
          <Route path="/chat/:roomID" element={<ChatRooms />} />
        </Route>
        <Route path="/signin" element={<SignInCont />} />
        <Route path="/signup" element={<SignUpCont />} />
      </Routes>
    </div>
  );
}

export default App;

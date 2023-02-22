import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import ChatRooms from "./components/ChatRooms";
import ChatRoomNotFound from "./components/ChatRoomNotFound";
import "./styles/App.css";
import SignInCont from "./components/SignInCont";
import SignUpCont from "./components/SignUpCont";
import { Fragment, useEffect } from "react";
import useCookies from "./hooks/useCookies";
import CreateRoomCont from "./components/CreateRoomCont";

function App() {
  const { aToken, rToken } = useCookies();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!aToken && !rToken && location.pathname === "/") {
      return navigate("/signin", { replace: true });
    }
  }, []);

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

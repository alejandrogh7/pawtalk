import { Routes, Route } from "react-router-dom";
import ChatRooms from "./components/ChatRooms";
import Home from "./components/Home";
import ChatRoomNotFound from "./components/ChatRoomNotFound";
import "./styles/App.css";
import SignInCont from "./components/SignInCont";
import SignUpCont from "./components/SignUpCont";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
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

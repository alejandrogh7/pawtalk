import { Routes, Route } from "react-router-dom";
import ChatRooms from "./components/ChatRooms";
import Home from "./components/Home";
import ChatRoomNotFound from "./components/ChatRoomNotFound";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat/">
          <Route path="/chat/" element={<ChatRoomNotFound />} />
          <Route path="/chat/:roomID" element={<ChatRooms />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

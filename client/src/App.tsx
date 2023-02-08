import { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";

interface Message {
  room: string;
  message: string;
}

function App() {
  const [socket, setSocket] = useState<any | null>(null);
  const [room, setRoom] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const newSocket = io("http://localhost:81");
    newSocket.on("connect", () => {
      setSocket(newSocket);
    });
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const joinRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("joinRoom", room);
  };

  const leaveRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("leaveRoom", room);
  };

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("messageRoom", { room, message });
    setMessage("");
  };

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on("message", (payload: Message) => {
      setMessages((prev) => [...prev, payload]);
    });
  }, [socket]);

  return (
    <div className="App">
      <div className="card">
        <form onSubmit={joinRoom}>
          <input
            type="text"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <button type="submit">Join Room</button>
        </form>
        <form onSubmit={leaveRoom}>
          <button type="submit">Leave Room</button>
        </form>
        <form onSubmit={sendMessage}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Send Message</button>
        </form>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message.message}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

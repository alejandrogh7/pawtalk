import { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useJwt } from "react-jwt";
import ChatRooms from "./components/ChatRooms";
import ChatRoomNotFound from "./components/ChatRoomNotFound";
import SignInCont from "./components/SignInCont";
import SignUpCont from "./components/SignUpCont";
import useCookies from "./hooks/useCookies";
import CreateRoomCont from "./components/CreateRoomCont";
import UserDetailsCont from "./components/UserDetailsCont";
import "./styles/App.css";
import { useDispatch } from "react-redux";
import { clearSignin } from "./features/users/userSlice";

function App() {
  const dispatch = useDispatch();

  const aToken = useCookies("access_token", "");
  const rToken = useCookies("refresh_token", "");
  const aTokenData = useJwt(aToken);
  const rTokenData = useJwt(rToken);

  console.log([aTokenData, rTokenData]);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!aToken && !rToken) {
      if (location.pathname === "/") {
        return navigate("/signin", { replace: true });
      }
    } else {
      if (rTokenData.isExpired || rTokenData.isExpired) {
        dispatch(clearSignin());
        return navigate("/signin", { replace: true });
      } else {
        if (location.pathname === "/") {
          return navigate("/chat", { replace: true });
        }
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
        <Route path="/user">
          <Route path="/user/:userID/details" element={<UserDetailsCont />} />
          <Route path="/user/:userID/edit" element={<></>} />
        </Route>
        <Route path="/signin" element={<SignInCont />} />
        <Route path="/signup" element={<SignUpCont />} />
      </Routes>
    </div>
  );
}

export default App;

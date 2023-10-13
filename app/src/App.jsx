import { Routes, Route, useNavigate } from "react-router-dom";
import { CookiesProvider, useCookies } from "react-cookie";

import SignIn from "./pages/SignIn";
import Home from "./pages/Home";

export default function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["uid"]);
  const navigate = useNavigate();

  function handleLogin(uid) {
    setCookie("uid", uid, { path: "/" });
    navigate("/home");
  }

  function handleLogout(uid) {
    removeCookie("uid", uid, { path: "/" });
    navigate("/login");
  }

  return (
    <CookiesProvider>
        <Routes>
          <Route path="/" element={cookies.uid? <Home onLogout={handleLogout} user={cookies.uid}  />:<SignIn onSuccessfulAuth={handleLogin}/>} />
          <Route path="/login" element={<SignIn onSuccessfulAuth={handleLogin}/>} />
          <Route path="/home" element={cookies.uid? <Home onLogout={handleLogout} user={cookies.uid}  />:<SignIn onSuccessfulAuth={handleLogin}/>} />
        </Routes>
      </CookiesProvider>
  );
}

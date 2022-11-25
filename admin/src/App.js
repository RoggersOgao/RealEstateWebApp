import { useContext } from "react";
import "./sass/main.scss"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from "./pages/home/Home";
import Login from "./pages/auth/login/Login";
import LoginContext from "./components/context/loginContext/LoginContext";
import Settings from "./pages/settings/Settings";
import MessagePage from "./components/settingspageComp/notification/messagePage/MessagePage";
import Users from "./pages/users/Users";
import Properties from "./pages/properties/Properties";

function App() {
  const {state} = useContext(LoginContext)
  let user = false
if(state.user === null){
    user = (false)
}else{
    user = (true)
}
  return (
    
    <Router>
    <div className="App">
      <Routes>
      <Route path="/" element={ user ? <Home /> : <Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/settings" element={ user ? <Settings /> : <Login />} />
      <Route path="/users" element={ user ? <Users /> : <Login />} />
      <Route path="/properties" element={ user ? <Properties /> : <Login />} />
      <Route path="/messages/vm/:msgId" element={user ? <MessagePage /> : <Login />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;

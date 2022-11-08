import "./sass/main.scss"
import {useContext} from 'react'
import Home from './pages/home/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import AddListing from './pages/addListing/AddListing';
import Contact from './pages/contactUs/Contact';
import About from './pages/about/About';
import Terms from './pages/termsOfService/Terms';
import Privacy from './pages/privacy/Privacy';
import Login from "./pages/Auth/login/Login";
import Register from './pages/Auth/register/Register';
import Settings from "./pages/settings/Settings";
import LoginContext from "./components/context/auth/loginContext/LoginContext";
import SinglePage from "./pages/singleListing/SinglePage";
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
      {/* <Route path="/" element={<Home /> } /> */}
      <Route path="/" element={user ? <Home /> : <Login />} />
      <Route path="/listing" element={user ? <AddListing /> : <Login />} />
      <Route path="/listing/:propertyId" element={user ? <SinglePage /> : <Login />} />
      <Route path="/about" element={user ? <About /> : <Login />} />
      <Route path="/contact" element={user ? <Contact /> : <Login />} />
      <Route path="/terms" element={user ?<Terms /> : <Login />} />
      <Route path="/privacy" element={user ? <Privacy /> : <Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/settings" element={ user ? <Settings /> : <Login />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;

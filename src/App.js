
import Navbar from "./Components/Navbar/Navbar";
import HomeScreen from "./Screens/HomeScreen/HomeScreen";
import Login from "./Screens/Login/Login";
import Register from "./Screens/Register/Register";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { useContext, useState } from "react";
import { Context } from "./Components/Context/Context";
import SideMenu from "./Components/Menu/SideMenu";
import CreateIncident from "./Components/CreateIncident/CreateIncident";
import AssignUser from "./Components/AssignUser/AssignUser";
import UserHomeScreen from "./Screens/UserHomeScreen/UserHomeScreen";
import LandingPage from "./Components/LandingPage/LandingPage";
import Users from "./Components/Users/Users";


function App() {
 
 const {user , userType} = useContext(Context);
  const showRegister = () => {
    if (user) {
      return <HomeScreen/>;
    } else {
      return <Register/>;
    }
  }
  const showLogin = () => {
    if (user) {
      return <LandingPage/>;
    } else {
      return <Login/>;
    }
  }
const showHomeScreen = () => {
  if(userType){
    return <HomeScreen menuOpen={menuOpen}/>
  } else {
    return <UserHomeScreen menuOpen={menuOpen}/>
  }
}

const showUserDetails = () => {
  if (user ) {
return <Users/>
  } else {
    return <LandingPage/>
  }
}

  const [menuOpen,setMenuOpen] = useState(false)
  return ( <>
    <BrowserRouter>
    <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
    <SideMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
    <Routes>
    {/* <Route path="/" element={<UserHomeScreen  menuOpen={menuOpen}/>}/> */}
    <Route path="/" element={<LandingPage  menuOpen={menuOpen}/>}/>
    {/* <Route path="/" element={showHomeScreen()}/> */}
    <Route path="/admin" element={showHomeScreen()}/>
    <Route path="/register" element={showRegister()}/>
    <Route path="/login" element={showLogin()}/>
    <Route path="/userdetails" element={showUserDetails()}/>
    {/* <Route path="/userdetails" element={<Users/>}/> */}
    <Route path="/create" element={<CreateIncident/>}/>
    <Route path="/assign/:id" element={<AssignUser/>}/>
    </Routes>
    </BrowserRouter>
    
    </>
  );
}

export default App;

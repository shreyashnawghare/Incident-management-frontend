import {useContext, useEffect,useState} from 'react';
import axios from 'axios'
import { useLocation } from 'react-router-dom';
import { Context } from '../../Components/Context/Context';
import Users from "../../Components/Users/Users"



function UserHomeScreen({ menuOpen, setMenuOpen }) {
//     const { UserId } =  useContext(Context);
//     const [userDetails,setUserDetails] = useState("");

//     const fetchUser = async () => {
//         const res = await axios.get(`${env.api}/users/${UserId}`)
//         setUserDetails(res.data)
//     }

//     useEffect(()=>{
//         fetchUser();
// alert(userDetails);
//     },[])
  return (
  <>
   <div  className={'container-fluid homeScreen '+(menuOpen && "active")} >
   <div className='post_side'>
       <Users/>
   </div>
   </div>
  </>
  )
}

export default UserHomeScreen
import {useContext, useEffect,useState} from 'react';
import Header from '../../Components/Header/Header'
import './HomeScreen.scss';
import '../../Components/Menu/SideMenu.scss';
import axios from 'axios'
import { useLocation } from 'react-router-dom';
import env from '../../Settings'
import RightSide from '../../Components/RightSide/RightSide';
import Incidents from '../../Components/Incidents/Incidents';
import { Context } from '../../Components/Context/Context';

export default function HomeScreen({ menuOpen, setMenuOpen }) {
    const {user,dispatch} = useContext(Context);
    const [posts,setPosts] = useState([]);
    const {search} = useLocation();
console.log(search)
    
    useEffect(() => {
        
       
        // let token = JSON.parse(window.localStorage.getItem("details"))
        // alert(token.token)
    }, [search])
    return (
        <>
        {/* <Header/> */}
        <div  className={'container-fluid homeScreen '+(menuOpen && "active")} >
            <div className='post_side'>
        {/* <Sidebar/>
            <Posts posts={posts}/> */}
            <Incidents/>
            </div>
            {/* <RightSide/> */}
        </div>
        </>
    )
}

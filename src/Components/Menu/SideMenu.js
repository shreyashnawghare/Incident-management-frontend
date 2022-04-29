import './SideMenu.scss';
import { Link } from 'react-router-dom'; 

export default function SideMenu ({ menuOpen, setMenuOpen }) {
    return (
        <div className={'menu '+(menuOpen && "active")}>
            <ul>
                <li onClick={()=>setMenuOpen(false)}>
                <Link className='link' to="/login">Login</Link>
                </li>
                <li onClick={()=>setMenuOpen(false)}>
                <Link className='link' to="/register">Register</Link>
                </li>
            </ul>
        </div>
    )
}
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../Context/Context';
import './Navbar.scss'

export default function Navbar({ menuOpen, setMenuOpen }) {
    const {user,dispatch, userType} = useContext(Context);
    const PF ="https://mern-blog-app-jay.herokuapp.com/images/"
    const handleLogout = () => {
        dispatch({ type:"LOGOUT" })
    }

    return (
        <div className={'navbar ' + (menuOpen && "active")}>
            <div className='wrapper'>
            <div className="nav__left">
            {user ? (<Link to="/edit" className='link'><img className="nav__avatar" src={PF + user.displayPicture} alt=""/></Link>) : (
                <div className='hamburger' onClick={()=>setMenuOpen(!menuOpen)}>
                    <span className='line1'></span>
                    <span className='line2'></span>
                    <span className='line3'></span>
                </div>
                )}
            <h3 className='logo'>IMS</h3>
            </div>
            <div className="nav__center">
                <ul className="nav__list">
                    <li className="nav__list__item">
                        {userType ? <Link className='link' to="/admin">Incidents</Link> : <Link className='link' to="/">Home</Link>}
                        
                    </li>
                    <li className="nav__list__item">
                        {userType ? "" :<Link className='link' to="/userdetails">Details</Link>}
                    
                    </li>
                    <li className="nav__list__item" onClick={handleLogout}>
                        { user && "LOGOUT"}
                    </li>
                </ul>
            </div>
            <div className="nav__right">
            <i className=" nav__search__icon fas fa-search"></i>

            
            </div>
            
            </div>
        </div>
    )
}

import {useState,useEffect} from 'react';
import axios from 'axios'
import './RightSide.css'
import { Link } from 'react-router-dom';
import env from '../../Settings'

export default function RightSide() {
    const [cats,setCats] = useState([]);

    useEffect(() => {
        const getCats = async () => {
            const res = await axios.get(`${env.api}/categories`);
            setCats(res.data)
        }
        getCats()
    },[] )
    return (
        <div className="Right_sidebar">
            <div  className="Right_sidebar__item">
                <span className="Right_sidebar__title">Categories</span>
                <ul className="Right_sidebar__list">
                    {cats.map((c)=> (
                        <Link className='link' to={`/?cat=${c.name}`}>
                        <li className="Right_sidebar__listItem">{c.name}</li>
                        </Link>
                    ))}
                    
                </ul>
            </div>
            <div className="Right_sidebar__item">
                <span className="Right_sidebar__title">Follow</span>
                <div className="sidbebar__social">
                <i className=" sidebar__icon fab fa-facebook-square"></i>
            <i className=" sidebar__icon fab fa-twitter-square"></i>
            <i className=" sidebar__icon fab fa-pinterest-square"></i>
            <i className=" sidebar__icon fab fa-instagram-square"></i>
                </div>
            </div>

        </div>
    )
}

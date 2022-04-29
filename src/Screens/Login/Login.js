import { useContext, useRef } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { Context } from '../../Components/Context/Context';
import './Login.css'
import env from '../../Settings'

export default function Login() {

    const userRef = useRef();
    const passwordRef = useRef();
    const {  dispatch, isFetching} = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({type:"LOGIN_START"});

        try {
            const res = await axios.post(`${env.api}/login`, {
                email:userRef.current.value,
                password:passwordRef.current.value,
            })
            
            dispatch({type:"LOGIN_SUCCESS",payload:res.data});
            
        } catch (error) {
            dispatch({type:"LOGIN_FAILURE"});
        }
    }
    return (
        <div className="login" >
            <span className="login__title">Login</span>
            <form className="login__form" onSubmit={handleSubmit}>
                <label>Email</label>
                <input type="text" placeholder=" Enter your email" ref={userRef} />
                <label>Password</label>
                <input type="password" placeholder=" Enter your Password" ref={passwordRef} />
               <button className="loginButton" type='submit' disabled={isFetching}>Login</button>
            </form>
            <button className="loginRegisterButton">
                <Link to="/register" className='link'>Register</Link>
            </button>
        </div>
    )
}
 
import { useState } from 'react';
import axios from 'axios'
import { Link,useNavigate  } from 'react-router-dom'
import './Register.css'
import env from '../../Settings'

export default function Register() {
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const[error,setError] = useState(false);
    const navigate = useNavigate();
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);
        try {
            const res = await axios.post(`${env.api}/register`, {
                username,
                email,
                password,
            });
            
            res.data && navigate("/login") 
        } catch (error) {
            setError(true)
        }
        
    }
    return (
        <div className="register" >
            <span className="register__title">Register</span>
            <form className="register__form" onSubmit={handleSubmit}>
                <label>Username</label>
                <input type="text" placeholder=" Enter your Username" onChange={e=>setUsername(e.target.value)} />
                <label>Email</label>
                <input type="text" placeholder=" Enter your email" onChange={e=>setEmail(e.target.value)} />
                <label>Password</label>
                <input type="password" placeholder=" Enter your Password" onChange={e=>setPassword(e.target.value)} />
               <button className="registerButton" type='submit'>Register</button>
            </form>
            <button className="registerLoginButton">
            <Link to="/login" className='link'>Login</Link>
            </button>
            {error && <span style={{color:"red"}}>Something went wrong!</span>}
        </div>
    )
}

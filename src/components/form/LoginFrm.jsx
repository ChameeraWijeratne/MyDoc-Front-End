import React from 'react';
import './loginFrm.css'
import { FaLock } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import Logo1 from '../../assest/data/images/Logo1.png';


export const LoginFrm = () => {
  return (
    <div className='wrapper'>
        <form action=''>
            <img src={Logo1} alt=""/>
            <h2>Login</h2>

            <div className='input-box'>
            <IoIosMail  className='icon' />
                <input type='text' placeholder='Email' required id='input-box'/>
                
            </div>
            <div className='input-box'>
                <input type='text' placeholder='Password' required />
                <FaLock className='icon' />
            </div>

            <div className='remember-forgot'>
                <label><input type='checkbox' />Remember me</label>
                <a href='#'>Forgot Password?</a>
            </div>

            <button type='submit'>Login</button>

            <div className='register-link'>
                <p>Don't have an account? <a href='#'>Register</a></p>
            </div>
        </form>
    </div>
  );
}

export default LoginFrm




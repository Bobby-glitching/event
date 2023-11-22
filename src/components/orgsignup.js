import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"


function Login() {
    const history=useNavigate();

    const [username,setUsername]=useState('')
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [passwordError, setPasswordError] = useState('');


    const validatePassword = (pass) => {
        // Define your password conditions
        setPassword(pass);
        const minLength = 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasDigit = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
        // Check if the password meets the conditions
        if (password.length < minLength) {
          setPasswordError(`Password must be at least ${minLength} characters long`);
        } else if (!hasUppercase) {
          setPasswordError('Password must contain at least one uppercase letter');
        } else if (!hasLowercase) {
          setPasswordError('Password must contain at least one lowercase letter');
        } else if (!hasDigit) {
          setPasswordError('Password must contain at least one digit');
        } else if (!hasSpecialChar) {
          setPasswordError('Password must contain at least one special character');
        } else {
          setPasswordError(''); // Clear the error message if all conditions are met
        }
      };


    async function submit(e){
        e.preventDefault();

        try{

            await axios.post("https://violetapi.onrender.com/orgsignup",{
                username,name,email,password
            })
            .then(res=>{
                if(res.data=="exist"){
                    alert("Organizer already exists")
                }
                else if(res.data=="notexist"){
                    history("/orghome",{state:{id:username}})
                }
            })
            .catch(e=>{
                alert("wrong details")
                console.log(e);
            })

        }
        catch(e){
            console.log(e);

        }

    }


    return (
        <div className="cont">
        <div className="signcontainer">

            <h1>Signup</h1>

            <form action="POST" className="register-form">
            <input type="text" onChange={(e) => { setName(e.target.value) }} placeholder="Name"  />
            <input type="text" onChange={(e) => { setUsername(e.target.value) }} placeholder="Username"  />
                <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email"  />
                <input type="password" onChange={(e) => { validatePassword(e.target.value) }} placeholder="Password" />
                    {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}                
                    <input type="submit" onClick={submit} />
                </form>
            <br />
            <p>OR</p>
            <br />

            <Link to="/orglogin">Login Page</Link>

        </div></div>
    )
}

export default Login
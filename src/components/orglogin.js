import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"


function Login() {

    const history=useNavigate();

    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const [user, setUser] = useState(null)

    async function submit(e){
        e.preventDefault();

        try{

            await axios.post("https://violetapi.onrender.com/orglogin",{
                username,password
            })
            .then(res=>{
                if(res.data.success){
                    console.log("Login successful")
                    console.log(user)
                    setUser(res.data.check)
                    console.log(user)
                    history("/orghome",{state:{id:username}})
                }
                else if(res.data=="notexist"){
                    alert("Invalid Username/Password")
                }
                else {
                    console.log("Login failed")
                    setUser(null)
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
        <div className="signcontainer" >
            <h2>Login</h2>
            <form action="POST" className="login-form">
                <input type="text" onChange={(e) => { setUsername(e.target.value) }} placeholder="Username"  />
                <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password"  />
                <input type="submit" onClick={submit} />

            </form>
            <br />
            <p>OR</p>
            <br />

            <Link to="/orgsignup">Signup Page</Link>

        </div></div>
    )
}

export default Login
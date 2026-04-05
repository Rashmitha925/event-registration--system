import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login(){

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const nav = useNavigate();

const login = async ()=>{
try{

const res = await axios.post(
"https://event-registration-system-2-8mkg.onrender.com/api/auth/login",
{ email, password }
);

console.log(res.data); // check response

// store token
localStorage.setItem("token", res.data.token);

// store user with role
localStorage.setItem(
"user",
JSON.stringify({
name: res.data.user.name,
email: res.data.user.email,
role: res.data.user.role
})
);

nav("/dashboard");

}catch(err){
alert("Invalid login");
}

}

return(
<div className="container mt-5">
<div className="card p-4 shadow col-md-4 mx-auto">
<h3 className="text-center">Login</h3>

<input
className="form-control my-2"
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
className="form-control my-2"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<button
className="btn btn-primary w-100"
onClick={login}
>
Login
</button>

<Link to="/register" className="text-center mt-2">
Create Account
</Link>

</div>
</div>
)
}

export default Login;
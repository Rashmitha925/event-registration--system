import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register(){

const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [role,setRole] = useState("user");
const [adminCode,setAdminCode] = useState("");

const nav = useNavigate();

const register = async ()=>{
try{
await axios.post(
"https://event-registration-system-lsbf.onrender.com/api/auth/register",
{
name,
email,
password,
role,
adminCode
}
);

alert("Registered Successfully");
nav("/");

}catch(err){
alert("Registration Failed");
}
}

return(
<div className="container mt-5">
<div className="card p-4 shadow col-md-4 mx-auto">

<h3 className="text-center">Register</h3>

<input
className="form-control my-2"
placeholder="Name"
onChange={(e)=>setName(e.target.value)}
/>

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

<select
className="form-control my-2"
onChange={(e)=>setRole(e.target.value)}
>
<option value="user">User</option>
<option value="admin">Admin</option>
</select>

{role === "admin" && (
<input
className="form-control my-2"
placeholder="Enter Admin Code"
onChange={(e)=>setAdminCode(e.target.value)}
/>
)}

<button
className="btn btn-success w-100"
onClick={register}
>
Register
</button>

<p className="mt-3 text-center">
Already have account? <Link to="/">Login</Link>
</p>

</div>
</div>
)
}

export default Register;
import { useState, useEffect } from "react";
import axios from "axios";

function Dashboard(){

const [events,setEvents]=useState([]);
const [title,setTitle]=useState("");
const [description,setDescription]=useState("");
const [date,setDate]=useState("");
const [search,setSearch]=useState("");
const [editId,setEditId]=useState(null);

let user = {};
try {
  user = JSON.parse(localStorage.getItem("user")) || {};
} catch {
  user = {};
}
if(!user.name){
return <h3 className="text-center mt-5">Please login...</h3>;
}

// FETCH EVENTS
const fetchEvents = async ()=>{
const res = await axios.get("https://event-registration-system-lsbf.onrender.com/api/events");
setEvents(res.data);
}

useEffect(()=>{
fetchEvents();
},[]);


// ADD / UPDATE EVENT
const addEvent = async ()=>{

if(user.role !== "admin") return alert("Admin only");

if(editId){
await axios.put(`https://event-registration-system-lsbf.onrender.com/api/events/${editId}`,{
title,description,date
});
setEditId(null);
}else{
await axios.post("https://event-registration-system-lsbf.onrender.com/api/events",
{title,description,date,createdBy:user.name}
);
}

setTitle("");
setDescription("");
setDate("");

fetchEvents();
}


// DELETE EVENT
const deleteEvent = async(id)=>{
await axios.delete(`https://event-registration-system-lsbf.onrender.com/api/events/${id}`);
fetchEvents();
}


// EDIT EVENT
const editEvent = (e)=>{
setTitle(e.title);
setDescription(e.description);
setDate(e.date);
setEditId(e._id);
}


// REGISTER EVENT
const registerEvent = async(id)=>{
await axios.post(
`https://event-registration-system-lsbf.onrender.com/api/events/register/${id}`,
{user:user.name}
);
fetchEvents();
}


// LOGOUT
const logout = ()=>{
localStorage.clear();
window.location="/";
}


return(
<div className="container mt-4">

<div className="d-flex justify-content-between">
<h2>Event System</h2>
<button className="btn btn-danger" onClick={logout}>
Logout
</button>
</div>


{/* ADMIN PANEL */}
{user.role === "admin" && (
<div className="card p-3 mt-3 shadow">
<h5>{editId ? "Edit Event" : "Create Event"}</h5>

<input
className="form-control my-1"
placeholder="Title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
/>

<input
className="form-control my-1"
placeholder="Description"
value={description}
onChange={(e)=>setDescription(e.target.value)}
/>

<input
type="date"
className="form-control my-1"
value={date}
onChange={(e)=>setDate(e.target.value)}
/>

<button
className="btn btn-primary mt-2"
onClick={addEvent}
>
{editId ? "Update Event" : "Add Event"}
</button>

</div>
)}


{/* SEARCH */}
<input
className="form-control mt-3"
placeholder="Search events..."
onChange={(e)=>setSearch(e.target.value)}
/>


{/* EVENTS */}
<div className="row mt-3">

{events
.filter(e=>e.title.toLowerCase().includes(search.toLowerCase()))
.map(e=>(

<div className="col-md-4" key={e._id}>
<div className="card p-3 mb-3 shadow">

<h5>{e.title}</h5>
<p>{e.description}</p>
<p>Date: {e.date}</p>
<p>Participants: {e.participants.length}</p>

<button
className="btn btn-success me-2"
onClick={()=>registerEvent(e._id)}
>
Register
</button>

{user.role === "admin" && (
<>
<button
className="btn btn-warning me-2"
onClick={()=>editEvent(e)}
>
Edit
</button>

<button
className="btn btn-danger"
onClick={()=>deleteEvent(e._id)}
>
Delete
</button>
</>
)}

</div>
</div>

))}

</div>

</div>
)
}

export default Dashboard;
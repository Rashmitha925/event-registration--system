import { useEffect, useState } from "react";
import axios from "axios";

function EventList({isAdmin,search}){

const [events,setEvents]=useState([]);
const [editId,setEditId]=useState(null);
const [title,setTitle]=useState("");
const [description,setDescription]=useState("");
const [date,setDate]=useState("");

const user = JSON.parse(localStorage.getItem("user"));

useEffect(()=>{
fetchEvents();
},[]);

const fetchEvents = async ()=>{
const res = await axios.get(
"https://event-registration-system-2-8mkg.onrender.com/api/events"
);
setEvents(res.data);
};

const deleteEvent = async(id)=>{
await axios.delete(
`https://event-registration-system-2-8mkg.onrender.com/api/events/${id}`
);
fetchEvents();
};

const startEdit = (e)=>{
setEditId(e._id);
setTitle(e.title);
setDescription(e.description);
setDate(e.date);
};

const updateEvent = async ()=>{
await axios.put(
`https://event-registration-system-2-8mkg.onrender.com/api/events/${editId}`,
{title,description,date}
);

setEditId(null);
fetchEvents();
};

const register = async(id)=>{
await axios.post(
`https://event-registration-system-2-8mkg.onrender.com/api/events/register/${id}`,
{
name:user.name,
email:user.email
}
);
fetchEvents();
};

const filtered = events.filter(e =>
e.title.toLowerCase().includes(search.toLowerCase())
);

return(
<div>

{filtered.map(e=>(
<div key={e._id} className="card p-3 mb-2">

{editId === e._id ? (
<>
<input value={title} onChange={(e)=>setTitle(e.target.value)} />
<input value={description} onChange={(e)=>setDescription(e.target.value)} />
<input type="date" value={date} onChange={(e)=>setDate(e.target.value)} />

<button onClick={updateEvent}>Save</button>
</>
):(
<>
<h5>{e.title}</h5>
<p>{e.description}</p>
<p>{e.date}</p>
</>
)}

{!isAdmin && (
<button onClick={()=>register(e._id)}>
Register
</button>
)}

{isAdmin && (
<>
<button onClick={()=>startEdit(e)}>Update</button>
<button onClick={()=>deleteEvent(e._id)}>Delete</button>

<h6>Participants</h6>
{e.participants?.map((p,i)=>(
<div key={i}>{p.email}</div>
))}
</>
)}

</div>
))}

</div>
)
}

export default EventList;
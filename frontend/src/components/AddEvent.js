import { useState } from "react";
import axios from "axios";

function AddEvent(){

const [title,setTitle]=useState("");
const [description,setDescription]=useState("");
const [date,setDate]=useState("");

const addEvent = async ()=>{

await axios.post(
"https://event-registration-system-2-8mkg.onrender.com/api/events",
{title,description,date}
);

window.location.reload();
}

return(
<div className="card p-3 mt-3">
<h4>Add Event</h4>

<input
className="form-control my-2"
placeholder="Title"
onChange={(e)=>setTitle(e.target.value)}
/>

<input
className="form-control my-2"
placeholder="Description"
onChange={(e)=>setDescription(e.target.value)}
/>

<input
type="date"
className="form-control my-2"
onChange={(e)=>setDate(e.target.value)}
/>

<button onClick={addEvent}>Add Event</button>

</div>
)
}

export default AddEvent;
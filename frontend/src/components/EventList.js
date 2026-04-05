import React, { useState, useEffect } from "react";

function EventList({ isAdmin, search }) {

  const [events,setEvents] = useState([]);
  const [editIndex,setEditIndex] = useState(null);
  const [title,setTitle] = useState("");
  const [date,setDate] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(()=>{
    const stored = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(stored);
  },[]);

  const deleteEvent = (index)=>{
    const updated = [...events];
    updated.splice(index,1);
    localStorage.setItem("events",JSON.stringify(updated));
    setEvents(updated);
  };

  const startEdit = (i)=>{
    setEditIndex(i);
    setTitle(events[i].title);
    setDate(events[i].date);
  };

  const updateEvent = (i)=>{
    const updated = [...events];
    updated[i].title = title;
    updated[i].date = date;

    localStorage.setItem("events",JSON.stringify(updated));
    setEvents(updated);
    setEditIndex(null);
  };

  const registerEvent = (i)=>{
    const updated = [...events];

    if(!updated[i].participants.includes(user.name)){
      updated[i].participants.push(user.name);
    }

    localStorage.setItem("events",JSON.stringify(updated));
    setEvents(updated);
  };

  const filtered = events.filter(e =>
    e.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>

      {filtered.map((event,i)=>(
        <div key={i} className="card p-3 my-2">

          {editIndex === i ? (
            <>
              <input
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
              />

              <input
                type="date"
                value={date}
                onChange={(e)=>setDate(e.target.value)}
              />

              <button onClick={()=>updateEvent(i)}>
                Save
              </button>
            </>
          ):(
            <>
              <h4>{event.title}</h4>
              <p>{event.date}</p>
            </>
          )}

          {!isAdmin && (
            <button onClick={()=>registerEvent(i)}>
              Register
            </button>
          )}

          {isAdmin && (
            <>
              <button onClick={()=>startEdit(i)}>
                Update
              </button>

              <button onClick={()=>deleteEvent(i)}>
                Delete
              </button>

              <h5>Participants:</h5>
              {event.participants.map((p,index)=>(
                <p key={index}>{p}</p>
              ))}
            </>
          )}

        </div>
      ))}

    </div>
  );
}

export default EventList;
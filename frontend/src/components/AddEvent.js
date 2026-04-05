import React, { useState } from "react";

function AddEvent() {

  const [title,setTitle] = useState("");
  const [date,setDate] = useState("");

  const addEvent = () => {

    const events = JSON.parse(localStorage.getItem("events")) || [];

    events.push({
      title,
      date,
      participants:[]
    });

    localStorage.setItem("events", JSON.stringify(events));

    setTitle("");
    setDate("");
    window.location.reload();
  };

  return (
    <div className="card p-3 mt-3">
      <h4>Add Event</h4>

      <input
        placeholder="Event title"
        className="form-control my-2"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
      />

      <input
        type="date"
        className="form-control my-2"
        value={date}
        onChange={(e)=>setDate(e.target.value)}
      />

      <button onClick={addEvent}>
        Add Event
      </button>
    </div>
  );
}

export default AddEvent;
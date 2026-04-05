import React, { useEffect, useState } from "react";

function EventList() {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    const res = await fetch("http://localhost:5000/api/events");
    const data = await res.json();
    setEvents(data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const registerEvent = async (id) => {
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");

    await fetch(`http://localhost:5000/api/events/register/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email })
    });

    fetchEvents();
  };

  return (
    <div>
      {events.map((e) => (
        <div key={e._id} className="card">
          <h3>{e.title}</h3>
          <p>{e.description}</p>
          <p>{e.date}</p>
          <p>{e.location}</p>

          <button onClick={() => registerEvent(e._id)}>
            Register
          </button>

          <h4>Registered Users:</h4>
          {e.registrations?.map((r, index) => (
            <p key={index}>{r.username}</p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default EventList;
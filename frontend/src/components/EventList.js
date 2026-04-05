import React, { useEffect, useState } from "react";

function EventList({ isAdmin }) {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDate, setEditDate] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(storedEvents);
  }, []);

  // REGISTER EVENT (USER)
  const registerEvent = (index) => {
    let updated = [...events];

    if (!updated[index].participants) {
      updated[index].participants = [];
    }

    // avoid duplicate registration
    if (!updated[index].participants.includes(user.name)) {
      updated[index].participants.push(user.name);
    }

    localStorage.setItem("events", JSON.stringify(updated));
    setEvents(updated);
  };

  // DELETE EVENT (ADMIN)
  const deleteEvent = (index) => {
    let updated = [...events];
    updated.splice(index, 1);
    localStorage.setItem("events", JSON.stringify(updated));
    setEvents(updated);
  };

  // START EDIT (ADMIN)
  const startEdit = (index) => {
    setEditIndex(index);
    setEditTitle(events[index].title);
    setEditDate(events[index].date);
  };

  // SAVE UPDATE (ADMIN)
  const saveEdit = (index) => {
    let updated = [...events];
    updated[index].title = editTitle;
    updated[index].date = editDate;

    localStorage.setItem("events", JSON.stringify(updated));
    setEvents(updated);
    setEditIndex(null);
  };

  // SEARCH
  const filteredEvents = events.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mt-3">

      {/* SEARCH BAR */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search events..."
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredEvents.map((event, index) => (
        <div key={index} className="card p-3 mt-2">

          {/* EDIT MODE */}
          {editIndex === index ? (
            <>
              <input
                className="form-control"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />

              <input
                type="date"
                className="form-control mt-2"
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
              />

              <button
                className="btn btn-success mt-2"
                onClick={() => saveEdit(index)}
              >
                Save
              </button>
            </>
          ) : (
            <>
              <h5>{event.title}</h5>
              <p>{event.date}</p>
            </>
          )}

          {/* USER REGISTER */}
          {!isAdmin && (
            <button
              className="btn btn-primary mt-2"
              onClick={() => registerEvent(index)}
            >
              Register
            </button>
          )}

          {/* ADMIN CONTROLS */}
          {isAdmin && (
            <>
              <button
                className="btn btn-warning mt-2"
                onClick={() => startEdit(index)}
              >
                Update
              </button>

              <button
                className="btn btn-danger mt-2"
                onClick={() => deleteEvent(index)}
              >
                Delete
              </button>

              <h6 className="mt-2">Participants:</h6>
              {event.participants?.length > 0 ? (
                <ul>
                  {event.participants.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              ) : (
                <p>No registrations</p>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default EventList;
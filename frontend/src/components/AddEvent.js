import { useState } from "react";
import axios from "axios";

function AddEvent() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const addEvent = async () => {
    try {
      await axios.post(
        "https://event-registration-system-2-8mkg.onrender.com/api/events",
        {
          title,
          description,
          date
        }
      );

      alert("Event Added");
      window.location.reload();

    } catch (error) {
      console.log(error);
      alert("Error adding event");
    }
  };

  return (
    <div className="card p-3 mt-3">
      <h4>Add Event</h4>

      <input
        className="form-control my-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="form-control my-2"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="date"
        className="form-control my-2"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <button className="btn btn-primary" onClick={addEvent}>
        Add Event
      </button>
    </div>
  );
}

export default AddEvent;
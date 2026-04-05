import React, { useState } from "react";
import AddEvent from "./components/AddEvent";
import EventList from "./components/EventList";

function Dashboard() {

  const user = JSON.parse(localStorage.getItem("user"));
  const [search,setSearch] = useState("");

  const logout = () => {
    localStorage.clear();
    window.location="/";
  };

  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between">
        <h2>Event Dashboard</h2>
        <button onClick={logout}>Logout</button>
      </div>

      <input
        className="form-control my-3"
        placeholder="Search events..."
        onChange={(e)=>setSearch(e.target.value)}
      />

      {user?.role === "admin" && (
        <>
          <AddEvent />
          <EventList isAdmin={true} search={search}/>
        </>
      )}

      {user?.role === "user" && (
        <EventList isAdmin={false} search={search}/>
      )}

    </div>
  );
}

export default Dashboard;
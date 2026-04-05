import { useState, useEffect } from "react";
import axios from "axios";

import AddEvent from "./components/AddEvent";
import EventList from "./components/EventList";

function Dashboard(){

let user = {};
try {
  user = JSON.parse(localStorage.getItem("user")) || {};
} catch {
  user = {};
}

const logout = ()=>{
localStorage.clear();
window.location="/";
}

return (
  <div className="container mt-4">

    <div className="d-flex justify-content-between">
      <h2>Event System</h2>
      <button className="btn btn-danger" onClick={logout}>
        Logout
      </button>
    </div>

    {/* Admin Add Event */}
    {user.role === "admin" && <AddEvent />}

    {/* All users see events */}
    <EventList />

  </div>
);
}

export default Dashboard;
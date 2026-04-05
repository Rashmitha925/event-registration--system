import React from "react";
import AddEvent from "./components/AddEvent";
import EventList from "./components/EventList";

function Dashboard() {

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    window.location = "/";
  };

  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between">
        <h2>Event Dashboard</h2>
        <button onClick={logout}>Logout</button>
      </div>

      {/* ADMIN PANEL */}
      {user?.role === "admin" && (
        <>
          <h3>Admin Panel</h3>
          <AddEvent />
          <EventList isAdmin={true} />
        </>
      )}

      {/* USER PANEL */}
      {user?.role === "user" && (
        <>
          <h3>User Panel</h3>
          <EventList isAdmin={false} />
        </>
      )}

    </div>
  );
}

export default Dashboard;
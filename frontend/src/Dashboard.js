import React from "react";
import AddEvent from "./components/AddEvent";
import EventList from "./components/EventList";

function Dashboard() {
  let user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    window.location = "/";
  };

  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between">
        <h2>Event Dashboard</h2>
        <button className="btn btn-danger" onClick={logout}>
          Logout
        </button>
      </div>

      {user?.role === "admin" && (
        <>
          <AddEvent />
          <EventList isAdmin={true} />
        </>
      )}

      {user?.role === "user" && (
        <>
          <EventList isAdmin={false} />
        </>
      )}

    </div>
  );
}

export default Dashboard;
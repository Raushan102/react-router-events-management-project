import React from "react";
import EventsNavigation from "../components/EventsNavigation";
import { Outlet } from "react-router-dom";

function NavRoot() {
  return (
    <>
      <EventsNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default NavRoot;

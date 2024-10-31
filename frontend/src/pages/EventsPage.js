import React, { Suspense } from "react";
import { defer, json, useLoaderData, Await } from "react-router-dom";
import EventsList from "../components/EventsList";

function EventsPage() {
  const { events } = useLoaderData();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Await resolve={events}>
        {(loaderEvents) => <EventsList events={loaderEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

async function laderAction() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    throw json({ message: "unable to fetch data" }, { status: 500 });
  } else {
    const EventData = await response.json();
    return EventData.events;
  }
}

export  function loader() {
  return defer({
    events: laderAction(),
  });
}

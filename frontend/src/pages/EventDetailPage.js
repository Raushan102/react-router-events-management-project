import React from "react";
import EventItem from "../components/EventItem";
import { json, redirect, useLoaderData, Await ,defer} from "react-router-dom";
import { Suspense } from "react";
import EventsList from "../components/EventsList";

function EventDetailPage() {
  const {event,events} = useLoaderData();

  console.log('raushanb',events);

  return (
    <>
      <Suspense fallback={<p>loading...</p>}>
        <Await resolve={event}>
          {(eventData) => <EventItem event={eventData} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p>loading...</p>}>
        <Await resolve={events}>
          {(eventsData) => <EventsList events={eventsData} />}
        </Await>
      </Suspense>
    </>
  );
}

export default EventDetailPage;

export async function action({ request, params }) {
  const id = params.eventId;

  const response = await fetch("http://localhost:8080/events/" + id, {
    method: request.method,
  });

  if (!response.ok) {
    throw json({ message: "unable to delete the data" }, { status: 500 });
  }

  return redirect("/events");
}

async function EventDetailFun(id) {
  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    throw json({ message: "unable of fetch event" }, { status: 500 });
  }
 const EventData = await response.json();
 return EventData.event;
}


async function laderAction() {


  const response = await fetch("http://localhost:8080/events");
  

  if (!response.ok) {
    throw json({ message: "unable to fetch data" }, { status: 500 });
  } 
    
    const EventData = await response.json();
    console.log("eventDEtail", EventData.events);
    return EventData.events;
  
}

export async function loader({params}) {
  const id = params.eventId;
  console.log(id);
  return defer({
    events: laderAction(),
    event: await EventDetailFun(id),
  });
}
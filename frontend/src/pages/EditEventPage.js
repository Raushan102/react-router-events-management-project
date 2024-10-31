import React from "react";
import EventForm from "../components/EventForm";
import {json,redirect,useLoaderData} from 'react-router-dom'

function EditEventPage() {

  let data=useLoaderData();
  return (
    <>
      <EventForm method={"patch"} event={data.event} />
    </>
  );
}

export default EditEventPage;


export async function action({ params, request }) {
 
  let id=params.eventId;

  
  let FormData = await request.formData();

  const EventData = {
    title: FormData.get("title"),
    date: FormData.get("date"),
    description: FormData.get("description"),
    image: FormData.get("image"),
  };

  


  const response = await fetch("http://localhost:8080/events/" + id, {
    method: request.method,
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(EventData),
  });

  if (!response.ok) {
    throw json({ message: "unable to add event" }, { status: 500 });
  } else {
    return redirect("/events");
  }
}

export async function loader({ request, params }) {
  const id = params.eventId;

  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    throw json({ message: "unable of fetch event" }, { status: 500 });
  }
  return response;
}

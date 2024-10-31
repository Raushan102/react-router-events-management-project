import React from "react";
import EventForm from "../components/EventForm";
import {json, redirect} from 'react-router-dom'

function NewEventPage() {
  return (
    <>
      <EventForm  method={'post'}/>
    </>
  );
}

export default NewEventPage;


export async function action({params,request}){

  

   let FormData=await request.formData()

   const EventData = {
     title: FormData.get("title"),
     date: FormData.get("date"),
     description: FormData.get("description"),
     image: FormData.get("image"),
   };

   
   

  const response = await fetch("http://localhost:8080/events", {
    method: request.method,
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(EventData),
  });


  if(!response.ok){
    throw  json({message:'unable to add event'},{status:500})

  }
  else{
     return redirect('/events')
  }
}

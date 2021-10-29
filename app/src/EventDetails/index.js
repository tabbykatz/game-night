import * as React from "react";

import { useParams } from "react-router-dom";

import { useMyEvents } from "../mySchedule";

const EventDetails = () => {
  const { id } = useParams();
  const { eventById } = useMyEvents();
  const event = { ...eventById(id)[0] };
  // TODO: add 404
  return (
    <>
      <h1>{event.name}</h1>
      <p>{event.description}</p>
      <address>{event.address}</address>
    </>
  );
};

export default EventDetails;

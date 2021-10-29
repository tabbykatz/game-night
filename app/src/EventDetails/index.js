import * as React from "react";

import { useParams } from "react-router-dom";

import NotFound from "../components/NotFound";
import { useMyEvents } from "../mySchedule";

const EventDetails = () => {
  const { id } = useParams();
  const { eventById } = useMyEvents();
  const event = { ...eventById(id)[0] };

  return event.id ? (
    <>
      <h1>{event.name}</h1>
      <p>{event.description}</p>
      <address>{event.address}</address>
    </>
  ) : (
    <NotFound />
  );
};

export default EventDetails;

import * as React from "react";

import { Link } from "react-router-dom";

import EventList from "../components/EventList";
import { useMyEvents } from "../mySchedule";
const MyEvents = () => {
  const { myEvents } = useMyEvents();
  return (
    <>
      <h1>
        All your upcoming events are listed here. Don't see any?{" "}
        <Link to={"/events/create"}>Create one!</Link>
      </h1>
      <EventList events={myEvents} />
    </>
  );
};

export default MyEvents;

import * as React from "react";

import { Link } from "react-router-dom";

import EventList from "../components/EventList";
import { useMyEvents } from "../mySchedule";
const MyEvents = () => {
  const { myEvents } = useMyEvents();
  return (
    <>
      <p>
        All your upcoming events are listed here. Don't see any?{" "}
        <Link to={"/events/create"}>Create one!</Link>
      </p>
      <EventList events={myEvents} />
    </>
  );
};

export default MyEvents;

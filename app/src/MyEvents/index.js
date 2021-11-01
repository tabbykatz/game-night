import * as React from "react";

import EventList from "../components/EventList";
import { useMyEvents } from "../mySchedule";
const MyEvents = () => {
  const { myEvents } = useMyEvents();

  return <EventList events={myEvents} />;
};

export default MyEvents;

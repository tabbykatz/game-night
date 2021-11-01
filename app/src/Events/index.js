import * as React from "react";

import EventList from "../components/EventList";
import { useMyEvents } from "../mySchedule";

const Events = () => {
  const { myEvents } = useMyEvents();

  return <EventList events={myEvents} />;
};

export default Events;

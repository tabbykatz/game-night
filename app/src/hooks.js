import * as React from "react";

import useApi from "./auth/useApi";

export const useMyEvents = () => {
  const [myEvents, setMyEvents] = React.useState([]);
  const { loading, apiClient } = useApi();

  const loadEvents = React.useCallback(async () => {
    setMyEvents(await apiClient.getEvents());
  }, [apiClient]);

  React.useEffect(() => {
    !loading && loadEvents();
  }, [loading, loadEvents]);
  return { myEvents, loadEvents };
};

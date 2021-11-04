import * as React from "react";

import useAuth0 from "./useAuth0";

const makeApi = (accessToken) => {
  const actions = {
    getUser: () => _get("/api/users"),
    getEvents: () => _get("/api/users/events"),
    getEventById: (eventId) => _get(`/api/users/events/${eventId}`),
    addEvent: (event) => _post("/api/users/events", { event }),
    editEvent: (event, eventId) =>
      _put(`/api/users/events/${eventId}`, { event }),
    addUserToEvent: (userEmail, eventId) =>
      _post(`/api/users/events/${eventId}`, { userEmail }),
    addGameToEvent: (gameId, eventId) =>
      _post(`/api/users/events/${eventId}/games`, { gameId }),
    removeGameFromEvent: (gameId, eventId) =>
      _delete(`/api/users/events/${eventId}/${gameId}`),
    deleteEvent: (eventId) => _delete(`/api/users/events/${eventId}`),
    getGames: () => _get("/api/users/games"),
    findGames: (name) => _get("/api/games", { name }),
    getGame: (id) => _get(`/api/games/${id}`),
    addGame: (game) => _post("/api/users/games", { game }),
    deleteGame: (id) => _delete(`/api/users/games/${id}`),
    addOrUpdateUser: (user) => _post("/api/users", { user }),
    getUsers: () => _get("/api/users/all"),
  };

  const _delete = (url) => _fetch(url, { method: "DELETE" });

  const _get = async (_url, params) => {
    const url = new URL(_url, window.location.origin);
    if (params !== undefined) {
      url.search = new URLSearchParams(params).toString();
    }
    return (await _fetch(url)).json();
  };

  const _post = async (url, body) => {
    const response = await _fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    let result;
    try {
      result = await response.json();
    } catch {}
    return result;
  };

  const _put = async (url, body) => {
    const response = await _fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    let result;
    try {
      result = await response.json();
    } catch {}
    return result;
  };

  const _fetch = (url, options) =>
    fetch(url, {
      ...options,
      headers: {
        ...(options?.headers ?? {}),
        Authorization: `Bearer ${accessToken}`,
      },
    });

  return actions;
};

const useApi = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [state, setState] = React.useState({
    loading: true,
    error: null,
    apiClient: undefined,
  });

  React.useEffect(() => {
    if (isAuthenticated) {
      (async () => {
        try {
          const accessToken = await getAccessTokenSilently();
          setState({
            loading: false,
            error: null,
            apiClient: makeApi(accessToken),
          });
        } catch (error) {
          setState({ loading: false, error, apiClient: undefined });
        }
      })();
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  return state;
};

export default useApi;

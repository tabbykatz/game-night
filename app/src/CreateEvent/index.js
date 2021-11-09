import * as React from "react";

import { useNavigate } from "react-router-dom";

import { useMyEvents } from "../mySchedule";

import styles from "./styles.module.scss";
import "react-nice-dates/build/style.css";

const CreateEvent = () => {
  const navigate = useNavigate();
  const { addEvent } = useMyEvents();

  const onSubmit = (event) => {
    const objectFromFormData = (form) =>
      Object.fromEntries(new FormData(form).entries());

    const form = event.currentTarget;
    const newEvent = {
      ...objectFromFormData(form),
    };
    event.preventDefault();
    addEvent(newEvent);

    navigate("/events");
  };

  return (
    <>
      <h1>Create an event.</h1>
      <form {...{ onSubmit }} className={styles.form}>
        <label>
          Event Name
          <input type="text" name="name" required />
        </label>
        <label>
          Description
          <textarea name="description" required />
        </label>
        <fieldset>
          <label>
            Street Address
            <input
              name="address"
              required
              placeholder="123 Any Street"
              autoComplete="street-address"
            />
          </label>
          <label>
            City
            <input
              name="city"
              required
              placeholder="New York"
              autoComplete="address-level2"
            />
          </label>
          <label>
            State
            <input
              name="state"
              required
              placeholder="NY"
              autoComplete="address-level1"
            />
          </label>
          <label>
            Zip Code
            <input
              name="zip"
              required
              placeholder="10011"
              autoComplete="postal-code"
            />
          </label>
          <label>
            Country
            <input
              name="country"
              required
              placeholder="USA"
              autoComplete="country"
            />
          </label>
        </fieldset>
        <label>
          Start Time
          <input name="startDate" required type="datetime-local" />
        </label>
        <label>
          End Time
          <input name="endDate" required type="datetime-local" />
        </label>

        <button>Add event</button>
      </form>
    </>
  );
};

export default CreateEvent;

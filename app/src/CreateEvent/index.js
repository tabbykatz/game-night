import * as React from "react";

import { enGB } from "date-fns/locale";
import { DatePicker } from "react-nice-dates";
import { useNavigate } from "react-router-dom";

import { useMyEvents } from "../mySchedule";

import styles from "./styles.module.scss";
import "react-nice-dates/build/style.css";

const CreateEvent = () => {
  const navigate = useNavigate();
  const { addEvent } = useMyEvents();
  const [startTime, setStartTime] = React.useState(new Date());
  const [endTime, setEndTime] = React.useState(new Date());

  const onSubmit = (event) => {
    const objectFromFormData = (form) =>
      Object.fromEntries(new FormData(form).entries());

    const form = event.currentTarget;
    const newEvent = {
      ...objectFromFormData(form),
      start_time: startTime.toUTCString(),
      end_time: endTime.toUTCString(),
    };
    event.preventDefault();
    addEvent(newEvent);

    navigate("/events");
  };

  return (
    <>
      <h1>Create an event</h1>
      <form {...{ onSubmit }} className={styles.form}>
        <label>
          Event Name
          <textarea name="name" required />
        </label>
        <label>
          Description
          <textarea name="description" required />
        </label>
        <label>
          Address
          <input
            name="address"
            required
            placeholder="123 Any Street"
            autoComplete="street-address"
          />
          <input
            name="city"
            required
            placeholder="New York"
            autoComplete="address-level2"
          />
          <input
            name="state"
            required
            placeholder="NY"
            autoComplete="address-level1"
          />
          <input
            name="zip"
            required
            placeholder="10011"
            autoComplete="postal-code"
          />
          <input
            name="country"
            required
            placeholder="USA"
            autoComplete="country"
          />
        </label>

        {/* I dont know how to include a label or similar for the date picker */}
        <DatePicker
          date={startTime}
          onDateChange={setStartTime}
          locale={enGB}
          format="dd/MM/yyyy HH:mm"
        >
          {({ inputProps, focused }) => (
            <input
              className={"input" + (focused ? " -focused" : "")}
              {...inputProps}
            />
          )}
        </DatePicker>
        <DatePicker
          date={endTime}
          onDateChange={setEndTime}
          locale={enGB}
          format="dd/MM/yyyy HH:mm"
        >
          {({ inputProps, focused }) => (
            <input
              className={"input" + (focused ? " -focused" : "")}
              {...inputProps}
            />
          )}
        </DatePicker>
        <button>Add event</button>
      </form>
    </>
  );
};

export default CreateEvent;

import * as React from "react";

import { enGB } from "date-fns/locale";
import { DatePicker } from "react-nice-dates";

import useApi from "../auth/useApi";

import styles from "./styles.module.scss";
import "react-nice-dates/build/style.css";

const CreateEvent = () => {
  const { apiClient } = useApi();
  const [startTime, setStartTime] = React.useState(new Date());
  const [endTime, setEndTime] = React.useState(new Date());

  const onSubmit = (event) => {
    const objectFromFormData = (form) =>
      Object.fromEntries(new FormData(form).entries());

    const form = event.currentTarget;
    const newEvent = {
      ...objectFromFormData(form),
      start_time: startTime.toISOString(),
      end_time: endTime.toISOString(),
    };

    console.log(newEvent);
    event.preventDefault();
    apiClient.addEvent(newEvent);
    // navigate to events
  };

  return (
    <form {...{ onSubmit }} className={styles.form}>
      <label>
        Name Your Event
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
  );
};

export default CreateEvent;

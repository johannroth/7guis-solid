import { Component } from "solid-js";
import { render } from "solid-js/web";
import { Counter } from "./Counter";
import { FlightBooker } from "./FlightBooker";
import { TemperatureConverter } from "./TemperatureConverter";

const App: Component = () => {
  return (
    <>
      <h1>7GUIS in solid-js</h1>
      <h2>Counter</h2>
      <Counter />
      <h2>Temperature Converter</h2>
      <TemperatureConverter />
      <h2>Flight Booker</h2>
      <FlightBooker />
    </>
  );
};

render(() => <App />, document.getElementById("app"));

import { createSignal } from "solid-js";

function cToF(c: number) {
  return c * (9 / 5) + 32;
}
function fToC(f: number) {
  return (f - 32) * (5 / 9);
}

export function TemperatureConverter(props: {}) {
  const [celsius, setCelsius] = createSignal("");
  const [fahrenheit, setFahrenheit] = createSignal("");

  function onChange(newValue: string, type: "c" | "f") {
    const { setValue, setOther, convertToOther } =
      type === "c"
        ? {
            setValue: setCelsius,
            setOther: setFahrenheit,
            convertToOther: cToF,
          }
        : {
            setValue: setFahrenheit,
            setOther: setCelsius,
            convertToOther: fToC,
          };

    setValue(newValue);
    const parsed = Number(newValue);
    if (newValue === "") {
      setOther("");
      return;
    }
    if (!isNaN(parsed)) {
      setOther(convertToOther(parsed).toFixed(2));
    }
  }

  return (
    <div>
      <input
        value={celsius()}
        onChange={(e) => onChange((e.target as HTMLInputElement).value, "c")}
      />{" "}
      Celsius ={" "}
      <input
        value={fahrenheit()}
        onChange={(e) => onChange((e.target as HTMLInputElement).value, "f")}
      />{" "}
      Fahrenheit
    </div>
  );
}

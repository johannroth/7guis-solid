import { format, isBefore, isValid, parse, parseISO } from "date-fns";
import { isExists } from "date-fns/esm";
import { createMemo, createSignal } from "solid-js";

const RETURN_FLIGHT = "return flight";
const ONE_WAY_FLIGHT = "one-way flight";

function parseDate(dateString: string) {
  return parse(dateString, "dd.MM.yyyy", new Date());
}
function isDateStringValid(dateString: string) {
  return isValid(parseDate(dateString));
}

export function FlightBooker(props: {}) {
  const [hasReturn, setHasReturn] = createSignal(false);
  const [oneWayDate, setOneWayDate] = createSignal(
    format(new Date(), "dd.MM.yyyy")
  );
  const [returnDate, setReturnDate] = createSignal(
    format(new Date(), "dd.MM.yyyy")
  );

  const parsedOneWayDate = createMemo(() => parseDate(oneWayDate()));
  const parsedReturnDate = createMemo(() => parseDate(returnDate()));

  function isBookPossible() {
    if (!hasReturn) {
      return isDateStringValid(oneWayDate());
    }
    return (
      isDateStringValid(oneWayDate()) &&
      isDateStringValid(returnDate()) &&
      !isBefore(parsedReturnDate(), parsedOneWayDate())
    );
  }

  return (
    <div>
      <select
        value={hasReturn() ? RETURN_FLIGHT : ONE_WAY_FLIGHT}
        onChange={(e) =>
          setHasReturn((e.target as HTMLSelectElement).value === RETURN_FLIGHT)
        }
      >
        <option value={ONE_WAY_FLIGHT}>{ONE_WAY_FLIGHT}</option>
        <option value={RETURN_FLIGHT}>{RETURN_FLIGHT}</option>
      </select>
      <input
        style={{
          display: "block",
          color: isDateStringValid(oneWayDate()) ? undefined : "red",
        }}
        value={oneWayDate()}
        onChange={(e) => setOneWayDate((e.target as HTMLInputElement).value)}
      />
      <input
        style={{
          display: "block",
          color: isDateStringValid(returnDate()) ? undefined : "red",
        }}
        value={returnDate()}
        onChange={(e) => setReturnDate((e.target as HTMLInputElement).value)}
        disabled={!hasReturn()}
      />
      <button
        disabled={!isBookPossible()}
        onClick={() =>
          window.alert(
            `Booked a flight for the ${oneWayDate()}` +
              (hasReturn()
                ? ` with a return flight for the ${returnDate()}.`
                : ".")
          )
        }
      >
        Book
      </button>
    </div>
  );
}

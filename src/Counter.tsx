import { createSignal } from "solid-js";

export function Counter(props: {}) {
  const [count, setCount] = createSignal(0);
  const increaseCount = () => setCount(count() + 1);
  return (
    <div>
      {count()}{" "}
      <button type="button" onClick={increaseCount}>
        Count
      </button>
    </div>
  );
}

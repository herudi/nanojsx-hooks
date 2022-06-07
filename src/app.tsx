/* @jsx h */
import { h, render } from "https://deno.land/x/nano_jsx@v0.0.32/mod.ts";
import { Hooked, useEffect, useState } from "./lib/hook.ts";

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // log
    console.log(count);
  }, [count]);
  return (
    <div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Increment
      </button>
      <h1>Counter: {count}</h1>
    </div>
  );
}

Hooked.bind(render)(<Counter />, document.getElementById("app"));

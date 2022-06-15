## Nanojsx Hooks

Experimental hooks with [nanojsx](https://nanojsx.io).

## Hooks

- useState
- useEffect
- useReducer
- useMemo
- useCallback
- useRef
- useContext

## Install
```bash
npm i nanojsx-hooks
```
## Usage
```jsx
/** @jsx h */
import { h, render } from "nano-jsx";
import { Hooked, useEffect, useState } from "nanojsx-hooks";

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

```

## Example Usage

```bash
git clone https://github.com/herudi/nanojsx-hooks.git

cd nanojsx-hooks

deno task dev
```

> Hot-reloading support. just edit file in src folders.

## Build (Node.js)

```bash
git clone https://github.com/herudi/nanojsx-hooks.git

cd nanojsx-hooks

npm i

npm run build
```

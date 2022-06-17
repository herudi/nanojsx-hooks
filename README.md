## Nanojsx Hooks

Experimental hooks with [nanojsx](https://nanojsx.io).

[![codecov](https://codecov.io/gh/herudi/nanojsx-hooks/branch/master/graph/badge.svg)](https://codecov.io/gh/herudi/nanojsx-hooks)

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

// deno
// import { Hooked, useEffect, useState } from "https://deno.land/x/nanojsx_hooks/mod.ts";

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

Hooked.bind(render)(Counter, document.getElementById("app"));

// ssr
// const str = Hooked.bind(renderSSR)(Counter);
// console.log(str)

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

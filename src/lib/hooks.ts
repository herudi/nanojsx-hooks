type State<T> = (val: T | ((prev: T) => T)) => void;
type Reducer<S, A> = (state: S, action: A) => S;

const hook: Record<string, any> = {};

function _render(component: any) {
  hook._comp = component;
  hook.id = 0;
  hook._render(component, hook._elem);
}

export function Hooked(comp: any, target?: any) {
  // @ts-ignore
  // render aka this is required.
  hook._render = this;
  hook.id = 0;
  hook.states = [];
  hook.ctx = [];
  hook.cleans = [];
  hook.mems = [];
  hook._elem = target;
  hook._comp = comp;
  hook._render(comp, target);
}

function hasChange(id: number, deps?: any[]) {
  const cur = hook.states[id];
  const cc = cur && deps
    ? deps.some((dep, x) => !Object.is(dep, cur[x]))
    : true;
  hook.states[id] = deps;
  return cc;
}

// useState
export function useState<T>(val: T): [T, State<T>] {
  const id = hook.id;
  const def = hook.states[id] !== undefined ? hook.states[id] : val;
  hook.id++;
  return [
    def,
    (newVal) => {
      hook.states[id] = typeof newVal === "function"
        ? (newVal as Function)(def)
        : newVal;
      _render(hook._comp);
    },
  ];
}

// useEffect
export function useEffect(cb: CallableFunction, deps?: any[]) {
  if (!hook._elem) return;
  const id = hook.id;
  const cc = hasChange(id, deps);
  if (hook.cleans[id]) {
    hook.cleans[id]();
    hook.cleans.splice(id, 1);
  }
  hook.id++;
  if (cc) {
    setTimeout(() => {
      const fn = cb();
      if (fn) hook.cleans[id] = fn;
    });
  }
}

// useReducer
export function useReducer<S, A>(
  reducer: Reducer<S, A>,
  initState: S,
  initLazy?: (initState: S) => any,
): [S, (action: A) => void] {
  const arr = useState(
    initLazy !== undefined ? initLazy(initState) : initState,
  );
  return [
    arr[0],
    (action) => {
      arr[1](reducer(arr[0], action));
    },
  ];
}

// useMemo
export function useMemo<T>(fn: () => T, deps?: any[]): T {
  if (!hook._elem) return fn();
  const id = hook.id;
  const cc = hasChange(id, deps);
  if (cc) hook.mems[id] = fn();
  hook.id++;
  return hook.mems[id] || fn();
}

// useCallback
export const useCallback: Function = (cb: CallableFunction, deps: any[]) =>
  useMemo(() => (p: any) => cb(p), deps);

// useRef
export const useRef = (val?: any) => useMemo(() => ({ current: val }), []);

// createContext
export const createContext = (init?: any) => {
  const id = hook.id;
  hook.id++;
  return {
    Provider({ value, children }: any) {
      hook.ctx[id] = value || init;
      return children;
    },
    v: () => hook.ctx[id],
  };
};

// useContext
export const useContext = (ctx: any) => {
  return ctx.v();
};

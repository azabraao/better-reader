import { useEffect, useRef } from 'react';

function useInterval(callback: VoidFunction, delay: number | null) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    if (callback) {
      savedCallback.current = callback;
    }
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    let id: NodeJS.Timer;
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }
    if (delay !== null) {
      id = setInterval(tick, delay);
    }
    return () => {
      clearInterval(id);
    };
  }, [delay]);
}

export default useInterval;

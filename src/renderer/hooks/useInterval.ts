// import { useEffect, useRef } from 'react';

import { useEffect, useRef } from 'react';

// const useInterval = (callback: () => void, delay: number) => {
//   const savedCallback = useRef<() => void>();

//   // Remember the latest callback.
//   useEffect(() => {
//     savedCallback.current = callback;
//   }, [callback]);

//   const startInterval = () => {
//     const interval = setInterval(() => {
//       savedCallback.current();
//     }, delay);

//     return interval;
//   }

//   // Set up the interval.
//   useEffect(() => {

//     return () => clearInterval(id);
//   }, [delay]);

//   return savedCallback.current;
// };

// export default useInterval;

// import { useEffect } from 'react';

// const useInterval = (callback: () => void, delay: number) => {
//   useEffect(() => {
//     const id = setInterval(() => {
//       callback();
//     }, delay);

//     return () => clearInterval(id);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);
// };

// export default useInterval;

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default useInterval;

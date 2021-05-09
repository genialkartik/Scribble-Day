import { useEffect, useState } from 'react';

export default function useOutsideAlerter(ref) {
  const [isIn, setIn] = useState(null);
  useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
              setIn(false);
          }else{
          setIn(true);
          }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClickOutside);
      };
  }, [ref]);
  return isIn;
}
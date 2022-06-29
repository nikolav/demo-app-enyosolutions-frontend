import { useEffect } from "react";
import useStateSwitch from "./use-state-switch";
//
export default function useIsMounted() {
  const isWindow = "undefined" !== typeof window;
  const { isOn: isMounted, toggle: toggleMounted } = useStateSwitch();
  useEffect(() => {
    toggleMounted.on();
    return toggleMounted.off;
  }, []);
  //
  return isWindow && isMounted;
}

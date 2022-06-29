import React, { useEffect } from "react";
import Modal from "../Modal/Modal";
import useIsMounted from "../../src/hooks/use-is-monted";
import { useAppData, APP_NOTIFICATION } from "../../app/store";
import useStateSwitch from "../../src/hooks/use-state-switch";
//
const AppNotification = () => {
  const isMounted = useIsMounted();
  const appdata = useAppData();
  const notification = appdata(APP_NOTIFICATION);
  const { isOn, toggle } = useStateSwitch();
  //
  useEffect(() => {
    if (isMounted && notification?.key) {
      toggle.on();
    }
    return toggle.off;
  }, [notification?.key]);
  //
  return (
    <Modal isOpen={isOn} onClose={toggle.off}>
      <pre className="h-full flex items-center justify-center">
        {notification?.notification}
      </pre>
    </Modal>
  );
};

export default AppNotification;

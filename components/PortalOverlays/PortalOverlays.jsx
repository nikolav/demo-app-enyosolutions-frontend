import { createPortal } from "react-dom";
import useIsMounted from "../../src/hooks/use-is-monted";
//
export default function PortalOverlays({ end = false, children }) {
  const isMounted = useIsMounted();
  const portal_ = () =>
    document.getElementById(
      true === end ? "overlays-end--mdozwrwqvef" : "overlays--mdozwrwqvef"
    );
  //
  return isMounted ? createPortal(children, portal_()) : null;
}

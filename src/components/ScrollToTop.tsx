import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop(props: { children: any }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <>{props.children}</>;
}

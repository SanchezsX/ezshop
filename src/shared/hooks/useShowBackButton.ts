import { useLocation, useNavigate } from "react-router";
import { backButton } from "@telegram-apps/sdk-react";
import { useEffect, useRef, useCallback } from "react";

export function useShowBackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  const locationRef = useRef(location);
  useEffect(() => {
    locationRef.current = location;
  }, [location]);

  const handleBack = useCallback(() => {
    const segments = locationRef.current.pathname.split("/").filter(Boolean);

    let newPath = "/shop";

    if (segments.length > 1) {
      newPath = "/" + segments.slice(0, -1).join("/");
    }

    navigate(newPath);
  }, [navigate]);

  useEffect(() => {
    backButton.mount();
    backButton.show();
    backButton.onClick(handleBack);

    return () => {
      backButton.hide();
      backButton.unmount();
    };
  }, [handleBack]);
}

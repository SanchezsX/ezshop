import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

export function RPP() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const segments = location.pathname.split("/").filter(Boolean);
    const newPath = segments.length > 0 ? `/${segments.join("/")}` : "/";
    navigate(newPath);
  }, []);

  return <></>;
}

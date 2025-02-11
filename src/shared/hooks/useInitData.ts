import { initData } from "@telegram-apps/sdk-react";
import { useNavigate } from "react-router";

export function useInitData() {
  const navigate = useNavigate();

  initData.restore();
  const user = initData.user();

  if (!user) navigate("auth-error");

  return user;
}

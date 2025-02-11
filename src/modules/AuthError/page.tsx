import stl from "./style.module.scss";
import { ActionArea } from "@/shared/components/features";
import { Button } from "@/shared/components/ui";
import { useNavigate } from "react-router";
import { useShowBackButton } from "@/shared/hooks";

export function AuthError() {
  const navigate = useNavigate();

  useShowBackButton();

  return (
    <>
      <div className={stl.wrapper}>
        <img src="/images/auth.png" />
        <h1>Ошибка авторизации!</h1>
      </div>
      <ActionArea>
        <Button onClick={() => navigate("/")}>Закрыть</Button>
      </ActionArea>
    </>
  );
}

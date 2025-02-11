import stl from "./style.module.scss";
import { ActionArea } from "@/shared/components/features";
import { Button } from "@/shared/components/ui";
import { useNavigate } from "react-router";
import { useShowBackButton } from "@/shared/hooks";

export function NotFound() {
  const navigate = useNavigate();

  useShowBackButton();

  return (
    <>
      <div className={stl.wrapper}>
        <img src="/images/404.png" />
        <h1>Страница не существует!</h1>
      </div>
      <ActionArea>
        <Button onClick={() => navigate("/")}>Закрыть</Button>
      </ActionArea>
    </>
  );
}

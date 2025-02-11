import ShopService from "@/shared/api/ShopService";
import {
  ActionArea,
  Container,
  InfoBlock,
  Story,
} from "@/shared/components/features";
import { Button, Skeleton, Title } from "@/shared/components/ui";
import { STORIES } from "@/shared/constants/stories";
import { useInitData } from "@/shared/hooks";
import { Shop } from "@/shared/models/shop";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { MainHeader, MainList } from "./components";
import stl from "./style.module.scss";

export function Main() {
  const initData = useInitData();
  const { data, isLoading } = useQuery<Shop[]>({
    queryKey: ["main/shops"],
    queryFn: async () => {
      const res = await ShopService.getAll(Number(initData?.id));
      return res.data;
    },
  });

  const navigate = useNavigate();

  return (
    <>
      <Container>
        <MainHeader />
      </Container>
      <Story data={STORIES} />
      <Container>
        <section className={stl.section}>
          <Title>
            <Title.Text>Ваши магазины</Title.Text>
          </Title>

          {isLoading ? (
            <div className={stl.skeletons}>
              {Array(4)
                .fill("")
                .map((_, i) => (
                  <Skeleton key={i} width="100%" height="50px" />
                ))}
            </div>
          ) : data?.length ? (
            <MainList data={data} />
          ) : (
            <InfoBlock
              src="/icons/welcome.svg"
              title="Добро пожаловать!"
              subtitle="Здесь будут ваши магазины"
              mt="90px"
            />
          )}
        </section>
      </Container>
      <ActionArea>
        <Button onClick={() => navigate("/create-shop")}>
          Добавить магазин
        </Button>
      </ActionArea>
    </>
  );
}

import { ActionArea, Container, InfoBlock } from "@/shared/components/features";
import { Button, Search, Skeleton, Title } from "@/shared/components/ui";
import { useShowBackButton } from "@/shared/hooks/useShowBackButton";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import stl from "./style.module.scss";
import { GoodsDeleteModal } from "@/modules/Goods/components/GoodsDeleteModal/page.tsx";
import { AnimatePresence } from "motion/react";
import { useGetGoodsWithFilter } from "@/modules/Goods/hooks/useGetGoodsWithFilter.tsx";
import { GoodsItem } from "@/modules/Goods/components/GoodsItem/page.tsx";

export type SelectedItem = { id: number; name: string };

export function Goods() {
  const navigate = useNavigate();

  const queryState = useState("");
  const selectedState = useState<SelectedItem[]>([]);
  const withImageState = useState(false);

  const [withImage] = withImageState;
  const [query] = queryState;
  const [selected] = selectedState;

  const { goodsData, goodsIsLoading } = useGetGoodsWithFilter({
    debounceQuery: query,
  });

  useShowBackButton();

  return (
    <>
      <Container>
        <Title>
          <Title.Text>Управление товарами</Title.Text>
          <Title.Items>
            <Title.Button src="/icons/bar/image.svg" state={withImageState} />
            <Title.Filter />
            <Link to="add">
              <img src="/icons/bar/add.svg" alt="" />
            </Link>
          </Title.Items>
        </Title>

        <Search queryState={queryState} />
        <div className={stl.goods}>
          {goodsIsLoading ? (
            new Array(8)
              .fill("")
              .map((_, i) => <Skeleton key={i} width="100%" height="52px" />)
          ) : Array.isArray(goodsData) && goodsData.length ? (
            goodsData.map((item) => (
              <GoodsItem
                key={item.id}
                item={item}
                selectedState={selectedState}
                withImage={withImage}
              />
            ))
          ) : (
            <InfoBlock
              src="/images/robot.png"
              title="Товары отсутствуют"
              subtitle={
                query
                  ? "К сожалению, таких товаров нет. Пожалуйста, введите другое название или ID"
                  : "К сожалению, у вас пока нет добавленных товаров.\nПожалуйста, нажмите “+” в правом верхнем углу, чтобы добавить товар"
              }
              ownImage
              mt="90px"
            />
          )}
        </div>
      </Container>

      <AnimatePresence>
        {selected.length > 0 && (
          <ActionArea>
            <div className={stl.area}>
              <GoodsDeleteModal selectedState={selectedState}>
                <Button variant="danger">Удалить</Button>
              </GoodsDeleteModal>

              {selected.length === 1 && (
                <Button onClick={() => navigate(`edit/${selected[0].id}`)}>
                  Изменить
                </Button>
              )}
            </div>
          </ActionArea>
        )}
      </AnimatePresence>
    </>
  );
}

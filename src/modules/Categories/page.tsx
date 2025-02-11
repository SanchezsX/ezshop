import { useShowBackButton } from "@/shared/hooks/useShowBackButton";
import { Button, Search, Skeleton, Title } from "@/shared/components/ui";
import { ActionArea, Container, InfoBlock } from "@/shared/components/features";
import { Link, useNavigate, useParams } from "react-router";
import stl from "./style.module.scss";
import { Card } from "@/shared/components/ui/Card/page.tsx";
import { AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CategoryService from "@/shared/api/CategoryService.ts";
import { SelectedItem } from "@/modules/Goods/page.tsx";
import { useDebounce } from "@/shared/hooks";
import { Category } from "@/shared/models/category.ts";
import { CategoriesDeleteModal } from "@/modules/Categories/components/CategoriesDeleteModal/page.tsx";

export function Categories() {
  const params = useParams();
  const navigate = useNavigate();

  const queryState = useState("");
  const [query] = queryState;
  const debounceValue = useDebounce(query);

  const selectedState = useState<SelectedItem[]>([]);

  const [data, setData] = useState<Category[]>([]);

  const [selected] = selectedState;

  const { data: categoriesData, isLoading: categoriesIsLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await CategoryService.getAll(Number(params.id));
      return res.data;
    },
  });

  useEffect(() => {
    if (categoriesData) setData(categoriesData);
  }, [categoriesData]);

  useEffect(() => {
    if (!categoriesData) return;

    if (debounceValue === "") {
      setData(categoriesData);
      return;
    }

    const filteredData = categoriesData.filter((d) =>
      d.name.toLowerCase().includes(debounceValue.toLowerCase()),
    );
    setData(filteredData);
  }, [debounceValue, categoriesData]);

  useShowBackButton();

  return (
    <>
      <Container>
        <Title>
          <Title.Text>Управление категориями</Title.Text>
          <Title.Items>
            <Link to="add">
              <img src="/icons/bar/add.svg" alt="" />
            </Link>
          </Title.Items>
        </Title>

        <Search queryState={queryState} />

        <div className={stl.categories}>
          {categoriesIsLoading ? (
            new Array(8)
              .fill("")
              .map((_, i) => <Skeleton key={i} width="100%" height="52px" />)
          ) : Array.isArray(data) && data.length ? (
            data.map((item) => (
              <Card
                key={item.id}
                id={Number(item.id)}
                name={item.name}
                selectedState={selectedState}
              >
                <Card.Info>
                  <Card.Item>{item.name}</Card.Item>
                  <Card.Item>
                    <span className={stl.gray}>{item.id}</span>
                  </Card.Item>
                </Card.Info>
                <Card.Hidden>
                  <Card.Feature
                    name="Категория родитель"
                    value={
                      categoriesData?.filter(
                        (c) => c.id === item.child_cat_ids[0],
                      )[0]?.name || "-"
                    }
                  />
                </Card.Hidden>
              </Card>
            ))
          ) : (
            <InfoBlock
              src="/images/robot.png"
              title="Категории отсутствуют"
              subtitle={
                query
                  ? "По данным параметрам поиска ничего не найдено"
                  : "К сожалению, у вас пока нет добавленных категорий. Пожалуйста, нажмите “+” в правом верхем углу, чтобы добавить категорию"
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
              <CategoriesDeleteModal selectedState={selectedState}>
                <Button variant="danger">Удалить</Button>
              </CategoriesDeleteModal>

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

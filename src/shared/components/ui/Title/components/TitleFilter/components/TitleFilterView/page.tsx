import { ActionArea, Container, Section } from "@/shared/components/features";
import { Button } from "@/shared/components/ui/Button/page";
import { Input } from "@/shared/components/ui/Input/page";
import { Tab } from "@/shared/components/ui/Tab/page";
import { motion } from "motion/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Title } from "../../../../page";
import stl from "./style.module.scss";
import { useQuery } from "@tanstack/react-query";
import ProductService from "@/shared/api/ProductService.ts";
import CategoryService from "@/shared/api/CategoryService.ts";
import { MultiTab } from "@/shared/components/ui";
import { useParams, useSearchParams } from "react-router";

interface TitleFilterViewProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function TitleFilterView({ setIsOpen }: TitleFilterViewProps) {
  const params = useParams();
  const selectState = useState("");

  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [selectedSubcategoryIds, setSelectedSubcategoryIds] = useState<
    string[]
  >([]);

  const [priceFrom, setPriceFrom] = useState<string>("");
  const [priceTo, setPriceTo] = useState<string>("");

  const [searchParams, setSearchParams] = useSearchParams();

  const { data: filtersData } = useQuery({
    queryKey: ["filters"],
    queryFn: async () => {
      const res = await ProductService.getFilters();

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { search, ...newObj } = res.data;

      return newObj;
    },
  });

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await CategoryService.getAll(Number(params.id));
      return res.data;
    },
  });

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  const handleApply = () => {
    const paramsObj: { [key: string]: string } = {};

    if (priceFrom) paramsObj.priceFrom = priceFrom;
    if (selectState[0]) paramsObj.sort = selectState[0];
    if (priceTo) paramsObj.priceTo = priceTo;
    if (selectedCategoryIds.length > 0)
      paramsObj.categories = selectedCategoryIds.join(",");
    if (selectedSubcategoryIds.length > 0)
      paramsObj.subcategories = selectedSubcategoryIds.join(",");

    setSearchParams(paramsObj);

    setIsOpen(false);

    setPriceTo("");
    setPriceFrom("");
    setSelectedCategoryIds([]);
    setSelectedSubcategoryIds([]);
    selectState[1]("");
  };

  const clearCond =
    (searchParams.has("priceFrom") ||
      searchParams.has("sort") ||
      searchParams.has("priceTo") ||
      searchParams.has("categories") ||
      searchParams.has("subcategories")) &&
    !priceFrom &&
    !priceTo &&
    !selectedCategoryIds.length &&
    !selectedSubcategoryIds.length &&
    !selectState[0];

  return createPortal(
    <motion.section
      className={stl.section}
      initial={{ transform: "translateY(-10px)", opacity: 0 }}
      animate={{ transform: "translateY(0)", opacity: 1 }}
      exit={{ transform: "translateY(-10px)", opacity: 0 }}
    >
      <Container>
        <Title>
          <Title.Text>Фильтры</Title.Text>
          <Title.Items>
            <button
              className={stl.section_button}
              onClick={() => setIsOpen(false)}
            >
              <svg
                className={}
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_1_1346)">
                  <path
                    d="M7.6493 6.50023L12.7624 1.38765C13.0798 1.07026 13.0798 0.55566 12.7624 0.238291C12.445 -0.0791046 11.9304 -0.0791046 11.6131 0.238291L6.50047 5.3514L1.3879 0.238291C1.0705 -0.0791046 0.555904 -0.0791046 0.238535 0.238291C-0.0788351 0.555686 -0.0788605 1.07028 0.238535 1.38765L5.35164 6.50023L0.238535 11.6128C-0.0788605 11.9302 -0.0788605 12.4448 0.238535 12.7622C0.55593 13.0796 1.07053 13.0796 1.3879 12.7622L6.50047 7.64905L11.613 12.7622C11.9304 13.0796 12.445 13.0796 12.7624 12.7622C13.0798 12.4448 13.0798 11.9302 12.7624 11.6128L7.6493 6.50023Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1_1346">
                    <rect width="13" height="13" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </Title.Items>
        </Title>

        <Section title="Цена, ₽">
          <div className={stl.section_price}>
            <Input
              placeholder="От"
              id="ot-price"
              type="number"
              value={priceFrom}
              onChange={(e) => setPriceFrom(e.target.value)}
            />
            <Input
              placeholder="До"
              id="do-price"
              type="number"
              value={priceTo}
              onChange={(e) => setPriceTo(e.target.value)}
            />
          </div>
        </Section>

        <Section title="Сортировать">
          <Tab selectState={selectState}>
            {filtersData &&
              Object.entries(filtersData).map(([key, value]) => (
                <Tab.Item key={key} name={key}>
                  {value}
                </Tab.Item>
              ))}
          </Tab>
        </Section>

        <Section title="Категория">
          <div className={stl.categories}>
            {categoriesData && categoriesData.length ? (
              categoriesData.map((c) => (
                <MultiTab
                  key={`cat-${c.id}`}
                  data={c}
                  selectedIds={selectedCategoryIds}
                  setSelectedIds={setSelectedCategoryIds}
                  removeIdFromOpposite={(id: string) =>
                    setSelectedSubcategoryIds((prev) =>
                      prev.filter((item) => item !== id),
                    )
                  }
                />
              ))
            ) : (
              <p className={stl.none}>У вас нет существующих категорий</p>
            )}
          </div>
        </Section>

        <Section title="Подкатегория">
          <div className={stl.categories}>
            {categoriesData && categoriesData.length ? (
              categoriesData.map((c) => (
                <MultiTab
                  key={`subcat-${c.id}`}
                  data={c}
                  selectedIds={selectedSubcategoryIds}
                  setSelectedIds={setSelectedSubcategoryIds}
                  removeIdFromOpposite={(id: string) =>
                    setSelectedCategoryIds((prev) =>
                      prev.filter((item) => item !== id),
                    )
                  }
                />
              ))
            ) : (
              <p className={stl.none}>У вас нет существующих категорий</p>
            )}
          </div>
        </Section>

        <ActionArea>
          <Button
            variant={clearCond ? "danger" : "primary"}
            onClick={handleApply}
          >
            {clearCond ? "Очистить фильтр" : "Применить"}
          </Button>
        </ActionArea>
      </Container>
    </motion.section>,
    document.body,
  );
}

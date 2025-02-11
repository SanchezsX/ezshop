import { ActionArea, Container, Section } from "@/shared/components/features";
import { Button, Input, Select, Title } from "@/shared/components/ui";
import {
  useGetCategories,
  useGetCategory,
  useShowBackButton,
} from "@/shared/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router";
import { Category, CategoryCreate } from "@/shared/models/category.ts";
import { AnimatePresence } from "motion/react";
import { useEditCategory } from "./hooks/useEditCategory.ts";

export type ImageUploaded = {
  file: File;
  order: number;
  image: string;
};

export function EditCategory() {
  const params = useParams();

  const {
    control,
    formState: { errors },
    register,
    setValue,
    handleSubmit,
  } = useForm<Category>({
    resolver: zodResolver(CategoryCreate),
    defaultValues: {
      child_cat_ids: [],
    },
    mode: "onChange",
  });

  const { categoriesData } = useGetCategories({ botId: Number(params.id) });
  const { categoryData, categoryIsLoading } = useGetCategory({
    botId: Number(params.id),
    categoryId: Number(params.categoryId),
  });
  const { categoryMutate, categoryIsPending } = useEditCategory();

  useEffect(() => {
    if (categoryData) {
      setValue("child_cat_ids", categoryData.child_cat_ids);
      setValue("name", categoryData.name);
    }
  }, [categoryData]);

  function onSubmit(data: Category) {
    categoryMutate(data);
  }

  useShowBackButton();

  return (
    <>
      <Container>
        <Title>
          <Title.Text>Редактирование категории</Title.Text>
        </Title>
      </Container>

      <Section title="Заполните поля" loading={categoryIsLoading}>
        <Controller
          control={control}
          name="child_cat_ids"
          render={({ field }) => (
            <Select
              placeholder="Категория родитель"
              value={field.value![0]?.toString()}
              onChange={(data) => {
                const newValues = [...field.value!];

                if (!data) {
                  const newArr = newValues.filter((v) => v === 0);
                  field.onChange(newArr);
                } else {
                  newValues[0] = Number(data);
                  field.onChange(newValues);
                }
              }}
            >
              {categoriesData?.map((c) => (
                <Select.Option key={c.id} name={c.id?.toString()}>
                  {c.name}
                </Select.Option>
              ))}
            </Select>
          )}
        />

        <Input
          id="name"
          placeholder="Название категории"
          error={errors.name?.message}
          required
          {...register("name")}
        />
      </Section>

      <AnimatePresence>
        {Object.keys(errors).length === 0 && (
          <ActionArea>
            <Button
              onClick={handleSubmit(onSubmit)}
              disabled={categoryIsPending}
            >
              Изменить категорию
            </Button>
          </ActionArea>
        )}
      </AnimatePresence>
    </>
  );
}

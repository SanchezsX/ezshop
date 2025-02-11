import { ActionArea, Container, Section } from "@/shared/components/features";
import { Button, Input, Select, Title } from "@/shared/components/ui";
import { Controller, useForm } from "react-hook-form";
import { CategoryCreate } from "@/shared/models/category.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence } from "motion/react";
import { useParams } from "react-router";
import { useCreateCategory } from "@/modules/CreateCategory/hooks/useCreateCategory.ts";
import { useGetCategories, useShowBackButton } from "@/shared/hooks";

export function CreateCategory() {
  const params = useParams();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryCreate>({
    mode: "onChange",
    defaultValues: {
      child_cat_ids: [],
    },
    resolver: zodResolver(CategoryCreate),
  });

  const { categoriesData } = useGetCategories({ botId: Number(params.id) });

  const { categoryMutate, categoryIsPending } = useCreateCategory();

  function onSubmit(data: CategoryCreate) {
    categoryMutate(data);
  }

  useShowBackButton();

  return (
    <>
      <Container>
        <Title>
          <Title.Text>Добавление категории</Title.Text>
        </Title>
      </Container>

      <Section title="Заполните поля">
        <Controller
          control={control}
          name="child_cat_ids"
          render={({ field }) => (
            <Select
              placeholder="Категория родитель"
              value={Array.isArray(field.value) ? String(field.value[0]) : ""}
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
              Добавить категорию
            </Button>
          </ActionArea>
        )}
      </AnimatePresence>
    </>
  );
}

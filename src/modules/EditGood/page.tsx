import { Option } from "@/modules/CreateGood/components/Option/page.tsx";
import { ActionArea, Container, Section } from "@/shared/components/features";
import { Button, Hint, Input, Select, Title } from "@/shared/components/ui";
import { InputSlot } from "@/shared/components/ui/Input/components/InputSlot/page.tsx";
import { useShowBackButton } from "@/shared/hooks";
import { ImageUpload, Product, ProductSchema } from "@/shared/models/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useParams } from "react-router";
import stl from "./style.module.scss";
import { CreateGoodOptionModal } from "./components/CreateGoodOptionModal/page.tsx";
import { useEditGood } from "@/modules/EditGood/hooks/useEditGood.ts";
import { useGetGood } from "@/shared/hooks/useGetGood.ts";
import { useGetCategories } from "@/shared/hooks/useGetCategories.ts";
import { CreateGoodImage } from "./components/CreateGoodImage/page.tsx";
import FileService from "@/shared/api/FileService.ts";
import { urlToFile } from "@/shared/helpers";

export function EditGood() {
  const params = useParams();
  const [images, setImages] = useState<ImageUpload[]>([]);

  const {
    control,
    formState: { errors },
    register,
    setValue,
    watch,
    handleSubmit,
  } = useForm<Product>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      category: [-1, -1],
      marketplace_data: {
        marketplace_type: "-1",
      },
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "extra_options",
  });

  const { categoriesData } = useGetCategories({ botId: Number(params.id) });
  const { goodData, goodIsLoading } = useGetGood({
    botId: Number(params.id),
    goodId: Number(params.goodId),
  });
  const { goodMutate, goodIsPending } = useEditGood({ images });

  useEffect(() => {
    if (goodData) {
      setValue("id", goodData.id);
      setValue("category", goodData.category);
      setValue("name", goodData.name);
      setValue("description", goodData.description);
      setValue("article", goodData.article);
      setValue("product_badge", goodData.product_badge);
      setValue(
        "marketplace_data.marketplace_type",
        goodData.marketplace_data.marketplace_type,
      );
      setValue(
        "marketplace_data.marketplace_url",
        goodData.marketplace_data.marketplace_url,
      );
      setValue("price", goodData.price);
      setValue("count", goodData.count);
      setValue("name", goodData.name);
      setValue("extra_options", goodData.extra_options);

      setImages(
        goodData.picture!.map((p) => ({
          file: null,
          order: Number(p[0]),
          image: p[1],
        })),
      );
    }
  }, [goodData]);

  function onSubmit(data: Product) {
    goodMutate(data);
  }

  async function uploadFile(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    const file = e.target.files[0];

    const updatedImages = await Promise.all(
      images.map(async (img) => {
        if (img.file === null) {
          try {
            const imageLink = await FileService.getFile(img.image);
            const fetchedFile = await urlToFile(imageLink, img.image);
            return {
              ...img,
              file: fetchedFile,
              image: URL.createObjectURL(fetchedFile),
            };
          } catch (error) {
            console.error("Ошибка при преобразовании ссылки в файл:", error);
            return img;
          }
        }
        return img;
      }),
    );

    const newImage = {
      image: URL.createObjectURL(file),
      order: updatedImages.length,
      file: file,
    };

    setImages([...updatedImages, newImage]);
  }

  useShowBackButton();

  return (
    <>
      <Container>
        <Title>
          <Title.Text>Редактирование товара</Title.Text>
        </Title>
      </Container>
      <Section title="Заполните поля" loading={goodIsLoading}>
        <Controller
          control={control}
          name="category"
          render={({ field }) => (
            <Select
              placeholder="Категория"
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

        {watch("category")?.[0] && (
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <Select
                placeholder="Подкатегория"
                value={field.value![1]?.toString()}
                onChange={(data) => {
                  const newValues = [...field.value!];

                  if (!data) {
                    const newArr = newValues.filter((v) => v === newValues[0]);
                    field.onChange(newArr);
                  } else {
                    newValues[1] = Number(data);
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
        )}

        <Input
          id="name"
          placeholder="Название товара"
          {...register("name")}
          error={errors.name?.message}
          required
        />

        <Input
          id="desc"
          placeholder="Описание"
          {...register("description")}
          error={errors.description?.message}
        />

        <Input
          id="article"
          placeholder="Артикул"
          {...register("article")}
          error={errors.article?.message}
          required
        />

        <Input
          id="badge"
          placeholder="Плашка товара"
          {...register("product_badge")}
          error={errors.product_badge?.message}
        >
          <Input.Slot>
            <Hint>
              Плашка товара - отдельная пометка отображаемая поверх карточки в
              каталоге. Можно использовать для обозначения акций или, например,
              БЗМЖ продуктов.
            </Hint>
          </Input.Slot>
        </Input>

        <Controller
          name="marketplace_data.marketplace_type"
          control={control}
          render={({ field }) => (
            <Select
              required
              placeholder="Маркетплейс"
              value={field.value}
              error={errors.marketplace_data?.marketplace_type?.message}
              onChange={field.onChange}
            >
              <Select.Option name="wb">Wildberries</Select.Option>
              <Select.Option name="ozon">Ozon</Select.Option>
            </Select>
          )}
        />

        <Input
          id="marketplace-link"
          required
          placeholder="Ссылка на маркетплейс"
          {...register("marketplace_data.marketplace_url")}
          error={errors.marketplace_data?.marketplace_url?.message}
        />
        <div className={stl.inputs}>
          <Input
            id="price"
            placeholder="Цена"
            {...register("price", { valueAsNumber: true })}
            type="number"
            error={errors.price?.message}
            required
          >
            <InputSlot>₽</InputSlot>
          </Input>
          <Input
            id="count"
            placeholder="Количество"
            required
            {...register("count", { valueAsNumber: true })}
            error={errors.count?.message}
            type="number"
          >
            <InputSlot>шт.</InputSlot>
          </Input>
        </div>
      </Section>

      <Section title="Фото товара">
        {images.length > 0 && (
          <CreateGoodImage images={images} setImages={setImages} />
        )}
        <input
          id="foto-file"
          accept="image/*"
          type="file"
          onChange={uploadFile}
          hidden
        />
        <label className={stl.file} htmlFor="foto-file">
          <img src="/icons/file.svg" alt="" />
          <p>Добавить файл</p>
        </label>
      </Section>

      {fields.map((field, i) => (
        <Option
          key={field.id}
          index={i}
          variant={field.type}
          register={register}
          control={control}
          remove={remove}
        />
      ))}

      <CreateGoodOptionModal
        onChoose={(type) => append({ type, name: "", variants: [] })}
      >
        <button className={stl.options}>
          <img alt="" src="/icons/circle-plus.svg" />
          <p className={stl.options_label}>Добавить опцию</p>
        </button>
      </CreateGoodOptionModal>

      {Object.keys(errors).length === 0 && (
        <ActionArea>
          <Button disabled={goodIsPending} onClick={handleSubmit(onSubmit)}>
            Готово
          </Button>
        </ActionArea>
      )}
    </>
  );
}

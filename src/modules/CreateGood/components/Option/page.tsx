import { Section } from "@/shared/components/features";
import { Input } from "@/shared/components/ui";
import stl from "./style.module.scss";
import {
  Control,
  useFieldArray,
  UseFieldArrayRemove,
  UseFormRegister,
} from "react-hook-form";
import { Product } from "@/shared/models/product.ts";
import { useEffect } from "react";

interface OptionProps {
  variant: "text" | "block" | "priced_block";
  index: number;
  register: UseFormRegister<Product>;
  control: Control<Product>;
  remove: UseFieldArrayRemove;
}

export function Option({
  variant,
  index,
  register,
  control,
  remove,
}: OptionProps) {
  const variantFieldName = `extra_options[${index}].variants`;
  const priceFieldName = `extra_options[${index}].variants_prices`;

  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray({
    control,
    name: variantFieldName as never,
  });

  const {
    fields: priceFields,
    append: appendPrice,
    remove: removePrice,
  } = useFieldArray({
    control,
    name: priceFieldName as never,
  });

  useEffect(() => {
    if (!variantFields.length) {
      appendVariant("");

      if (variant === "priced_block") {
        appendPrice("");
      }
    }
  }, []);

  const handleAdd = () => {
    appendVariant("");

    if (variant === "priced_block") {
      appendPrice("");
    }
  };

  const handleRemove = () => {
    if (variantFields.length > 0) {
      removeVariant(variantFields.length - 1);
    }

    if (variant === "priced_block" && priceFields.length > 0) {
      removePrice(priceFields.length - 1);
    }
  };

  function handleDeleteOption() {
    remove(index);
  }

  const renderVariantContent = () => {
    switch (variant) {
      case "text":
        return (
          <Input
            id={`text-${index}`}
            placeholder="Опция"
            {...register(`${variantFieldName}[0]` as never)}
          />
        );

      case "block":
        return (
          <>
            <div className={stl.price}>
              {variantFields.map((field, i) => (
                <Input
                  key={field.id}
                  id={`text-${field.id}`}
                  placeholder="Опция"
                  {...register(`${variantFieldName}[${i}]` as never)}
                />
              ))}
            </div>
            <div className={stl.icon}>
              <button type="button" onClick={handleAdd}>
                <img alt="Добавить" src="/icons/modal/add.svg" />
              </button>
              <button type="button" onClick={handleRemove}>
                <img alt="Удалить" src="/icons/modal/delete.svg" />
              </button>
            </div>
          </>
        );

      case "priced_block":
        return (
          <>
            <div className={stl.price}>
              {variantFields.map((field, i) => (
                <div key={field.id} className={stl.priced_block}>
                  <Input
                    id={`size-${field.id}`}
                    placeholder="Размер"
                    {...register(`${variantFieldName}[${i}]` as never)}
                  />
                  <Input
                    id={`price-${priceFields[i]?.id}`}
                    placeholder="Цена"
                    type="number"
                    {...register(`${priceFieldName}[${i}]` as never, {
                      valueAsNumber: true,
                    })}
                  />
                </div>
              ))}
            </div>
            <div className={stl.icon}>
              <button type="button" onClick={handleAdd}>
                <img alt="Добавить" src="/icons/modal/add.svg" />
              </button>
              <button type="button" onClick={handleRemove}>
                <img alt="Удалить" src="/icons/modal/delete.svg" />
              </button>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className={stl.wrap}>
      <Section title={`Дополнительная опция ${index + 1}`}>
        <button
          type="button"
          className={stl.delete}
          onClick={handleDeleteOption}
        >
          <img alt="Удалить опцию" src="/icons/bar/cross.svg" />
        </button>
        <Input
          id={`name-${index}`}
          placeholder="Название опции"
          {...register(`extra_options[${index}].name` as never)}
        />
        <div className={stl.block}>{renderVariantContent()}</div>
      </Section>
    </div>
  );
}

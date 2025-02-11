import ShopService from "@/shared/api/ShopService";
import {
  ActionArea,
  Container,
  InfoBlock,
  Section,
} from "@/shared/components/features";
import { SectionAction } from "@/shared/components/features/Section/components/SectionAction/page";
import { Button, Input, Title, Toggle } from "@/shared/components/ui";
import { useDebounce, useInitData, useShowBackButton } from "@/shared/hooks";
import { ShopCreate, shopCreateSchema } from "@/shared/models/shop";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AnimatePresence } from "motion/react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useCreateShop } from "@/modules/CreateShop/hooks/useCreateShop.ts";

export function CreateShop() {
  const initData = useInitData();

  const {
    register,
    control,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<ShopCreate>({
    resolver: zodResolver(shopCreateSchema),
    mode: "onChange",
  });

  const debouncedValue = useDebounce(watch("token"));
  const navigate = useNavigate();

  const checkToken = useMutation({
    mutationKey: ["create/check"],
    mutationFn: async (token: string) => {
      const res = await ShopService.checkTokenExistence(token);
      return res.data;
    },
  });

  const { createMutate, createIsPending } = useCreateShop();

  function onSubmit() {
    if (Object.keys(errors).length === 0) {
      createMutate({
        lang: "ru",
        shop_name: watch().shop_name,
        user_id: initData?.id!,
        with_token: watch().with_token,
        token: watch().token,
      });
    }
  }

  useShowBackButton();

  useEffect(() => {
    checkToken.mutate(debouncedValue!);
  }, [debouncedValue]);

  return (
    <>
      <Container>
        <Title>
          <Title.Text>Создание магазина</Title.Text>
        </Title>
      </Container>

      <Section title="Название магазина">
        <Input
          id="create"
          placeholder="Название"
          error={errors.shop_name?.message}
          required
          {...register("shop_name")}
        />
      </Section>

      <Section title="Конфигурация" gap={false}>
        <Section.Item>
          <Section.Text>
            <h4>Подключить персонального бота</h4>
            <p>Нужно получить токен бота</p>
          </Section.Text>
          <SectionAction>
            <Controller
              name="with_token"
              control={control}
              render={({ field }) => (
                <Toggle value={field.value} onChange={field.onChange} />
              )}
            />
          </SectionAction>
        </Section.Item>
      </Section>

      <AnimatePresence>
        {watch().with_token && (
          <Section key="bot_token" title="Токен бота">
            <Input
              id="token2"
              placeholder="Токен"
              required
              {...register("token")}
              error={errors.token?.message}
            >
              <Input.Slot>
                <button onClick={() => navigate("hint")}>
                  <img src="/icons/hint.svg" alt="" />
                </button>
              </Input.Slot>
            </Input>
          </Section>
        )}

        {!checkToken.data?.is_valid && debouncedValue && (
          <InfoBlock
            key="info-block"
            src="/icons/search.svg"
            title="Нет результатов"
            subtitle="Не нашли бота с данным токеном. Попробуйте снова!"
          />
        )}

        {checkToken.data?.bot_exists && (
          <>
            <Section key="choose-bot" title="Выбранный бот">
              <Section.Item>
                <Section.Icon src="/icons/sections/bot.svg" />
                <Section.Text>
                  <h4>{checkToken.data.bot_name}</h4>
                  <p>{checkToken.data.bot_username}</p>
                </Section.Text>
              </Section.Item>
            </Section>

            <InfoBlock
              key="info-block-found"
              src="/icons/success.svg"
              title="Бот найден"
              subtitle="Бот с данным токеном успешно найден!"
            />

            <ActionArea>
              <Button
                onClick={handleSubmit(onSubmit)}
                disabled={createIsPending}
              >
                Готово
              </Button>
            </ActionArea>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

import { Container, Section } from "@/shared/components/features";
import { Skeleton, Title, Toggle } from "@/shared/components/ui";
import { useShowBackButton } from "@/shared/hooks/useShowBackButton";
import { useEffect, useState } from "react";
import stl from "./style.module.scss";
import { useGetShop } from "@/modules/Settings/hooks/useGetShop";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ShopStatus } from "@/shared/models/shop";
import ShopService from "@/shared/api/ShopService";
import { useParams } from "react-router";
import { queryClient } from "@/app/Provider";
import { toast } from "sonner";
import { errorCatcher } from "@/shared/helpers";

export function Settings() {
  const params = useParams();
  const [isTurn, setIsTurn] = useState<boolean>(false);

  const { shopData, shopIsLoading } = useGetShop();

  const { data } = useQuery({
    queryKey: ["shop/count"],
    queryFn: async () => {
      const res = await ShopService.getCountUsers(Number(params.id));
      return res.data;
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: [`shop/${params.id}`],
    mutationFn: async (status: ShopStatus) => {
      toast.loading("Изменяется статус магазина...", {
        id: "shop-status-loading",
      });
      const res = await ShopService.changeStatus({
        botId: Number(params.id),
        status: status,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Статус успешно изменён!", {
        id: "shop-status-loading",
      });
      queryClient.invalidateQueries({ queryKey: [`shop/${params.id}`] });
    },
    onError: (error) => {
      toast.error(errorCatcher(error), { id: "shop-status-loading" });
    },
  });

  useEffect(() => {
    if (shopData) {
      setIsTurn(shopData.shop_status === "online");
    }
  }, [shopData]);

  const handleToggleChange = (value: boolean) => {
    setIsTurn(value);
    mutate(value ? "online" : "offline");
  };

  useShowBackButton();

  return (
    <div className={stl.settings}>
      {shopIsLoading ? (
        <div className={stl.skts}>
          <Skeleton width="160px" height="30px" />
          <Skeleton width="100%" height="216px" />
          <Skeleton width="100%" height="373px" />
        </div>
      ) : (
        shopData && (
          <>
            <Container>
              <Title>
                <Title.Text>{shopData.shop_name}</Title.Text>
              </Title>
            </Container>
            <Section title="Ссылки" gap={false}>
              <Section.Link href={shopData.shop_url}>
                <Section.Icon src="/icons/sections/cart.svg" />
                <Section.Text>
                  <h4>Мой магазин</h4>
                </Section.Text>
              </Section.Link>
              <Section.Link href={shopData.bot_url}>
                <Section.Icon src="/icons/sections/bot.svg" />
                <Section.Text>
                  <h4>Мой Телеграм бот</h4>
                </Section.Text>
              </Section.Link>
              <Section.Link href="https://t.me/EzShop_manager">
                <Section.Icon src="/icons/sections/info.svg" />
                <Section.Text>
                  <h4>
                    Поддержка <span>@EzShop_manager</span>
                  </h4>
                </Section.Text>
              </Section.Link>
            </Section>
            <Section title="Управление" gap={false}>
              <Section.Link href="goods">
                <Section.Icon src="/icons/sections/goods.svg" />
                <Section.Text>
                  <h4>Товары</h4>
                </Section.Text>
              </Section.Link>

              <Section.Link href="categories">
                <Section.Icon src="/icons/sections/categories.svg" />
                <Section.Text>
                  <h4>Категории</h4>
                </Section.Text>
              </Section.Link>

              <Section.Link href="orders">
                <Section.Icon src="/icons/sections/orders.svg" />
                <Section.Text>
                  <h4>Заказы</h4>
                </Section.Text>
              </Section.Link>

              <Section.Item>
                <Section.Icon src="/icons/sections/users.svg" />
                <Section.Text>
                  <h4>Пользователи</h4>
                </Section.Text>
                <Section.Action>
                  {data === undefined ? (
                    <Skeleton width="100px" height="20px" />
                  ) : (
                    data
                  )}
                </Section.Action>
              </Section.Item>

              <Section.Link href="bot" soon>
                <Section.Icon src="/icons/sections/bot.svg" />
                <Section.Text>
                  <h4>Управление ботом</h4>
                </Section.Text>
              </Section.Link>

              <Section.Item>
                <Section.Icon src="/icons/sections/status.svg" />
                <Section.Text>
                  <h4>Статус магазина</h4>
                  <p>{isTurn ? "работает" : "отключен"}</p>
                </Section.Text>
                <Section.Action>
                  <Toggle
                    onChange={handleToggleChange}
                    value={isTurn}
                    disabled={isPending}
                  />
                </Section.Action>
              </Section.Item>
            </Section>
          </>
        )
      )}
    </div>
  );
}

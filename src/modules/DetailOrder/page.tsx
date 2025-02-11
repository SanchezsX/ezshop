import { useParams } from "react-router";
import { ActionArea, Container, Section } from "@/shared/components/features";
import { Button, Skeleton, Title } from "@/shared/components/ui";
import { Tab } from "@/shared/components/ui/Tab/page.tsx";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import OrderService from "@/shared/api/OrderService.ts";
import { OrderStatus, Status } from "@/shared/models/order.ts";
import {
  useDebounce,
  useGetGoods,
  useGetUser,
  useShowBackButton,
} from "@/shared/hooks";
import stl from "./style.module.scss";
import FileService from "@/shared/api/FileService.ts";
import { queryClient } from "@/app/Provider.tsx";

export function DetailOrder() {
  const params = useParams();

  const selectState = useState<Status | string>("");
  const [select, setSelect] = selectState;
  const debouncedValue = useDebounce(select);

  const { mutate: statusMutate, isPending: statusIsPending } = useMutation({
    mutationKey: ["order/status"],
    mutationFn: async (data: OrderStatus) => {
      const res = await OrderService.editStatus(data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order"] });
    },
  });

  const { data: orderData, isLoading: orderIsLoading } = useQuery({
    queryKey: ["order"],
    queryFn: async () => {
      const res = await OrderService.getAll(Number(params.id));
      return res.data.filter((o) => o.order_id === params.orderId!)[0];
    },
  });

  const { userData, userIsLoading } = useGetUser({
    botId: Number(params.id),
    userId: Number(orderData?.from_user),
  });

  const { goodsData, goodsIsLoading } = useGetGoods({
    botId: Number(params.id),
  });

  function getGood(goodsId: number) {
    if (goodsData) {
      const filteredGood = goodsData.filter((o) => o.id === goodsId);
      return filteredGood[0];
    }
  }

  useEffect(() => {
    if (debouncedValue) {
      statusMutate({
        bot_id: Number(params.id),
        order_id: params.orderId!,
        new_status: select as Status,
      });
    }
  }, [debouncedValue]);

  useEffect(() => {
    if (orderData) {
      setSelect(orderData.status);
    }
  }, [orderData]);

  useShowBackButton();

  return (
    <>
      <Container>
        <Title>
          <Title.Text>Заказ №{params.orderId}</Title.Text>
        </Title>
      </Container>

      <Section title="Статус" loading={orderIsLoading || statusIsPending}>
        <Tab selectState={selectState}>
          <Tab.Item name="backlog">Ожидание</Tab.Item>
          <Tab.Item name="waiting payment">Ожидает оплаты</Tab.Item>
          <Tab.Item name="cancelled">Отменён</Tab.Item>
          <Tab.Item name="processing">В процессе</Tab.Item>
          <Tab.Item name="finished">Завершён</Tab.Item>
        </Tab>
      </Section>

      <Section title="Данные клиента" loading={userIsLoading || orderIsLoading}>
        <ul className={stl.info_wrapper}>
          <li className={stl.info}>
            <h4>{orderData?.from_user}</h4>
            <p>ID пользователя</p>
          </li>
          <li className={stl.info}>
            {userIsLoading ? (
              <Skeleton width="80px" height="18px" />
            ) : (
              <h4>
                <a href={`https://t.me/${userData?.username}`}>
                  @{userData?.username}
                </a>
              </h4>
            )}

            <p>Username</p>
          </li>
          <li className={stl.info}>
            {userIsLoading ? (
              <Skeleton width="80px" height="18px" />
            ) : (
              <h4>{userData?.full_name}</h4>
            )}
            <p>Полное имя</p>
          </li>
        </ul>
      </Section>

      <Section
        title="Список товаров"
        loading={orderIsLoading || goodsIsLoading}
      >
        <ul className={stl.good_wrapper}>
          {goodsIsLoading ? (
            <>
              <Skeleton width="378px" height="60px" />
              <Skeleton width="378px" height="60px" />
              <Skeleton width="378px" height="60px" />
            </>
          ) : (
            orderData &&
            Object.entries(orderData?.items).map(([key, value]) => (
              <li key={key} className={stl.good}>
                <div className={stl.good_img}>
                  <img
                    src={FileService.getProductThumbnail(Number(key))}
                    alt=""
                  />
                </div>
                <div className={stl.good_info}>
                  <div className={stl.good_left}>
                    <h4>
                      {getGood(Number(key))?.name}
                      {value.amount > 1 ? `x ${value.amount}шт.` : ""}
                    </h4>
                    {!!value.used_extra_options.length && (
                      <p>
                        {value.used_extra_options?.[0]?.name} -{" "}
                        {value.used_extra_options?.[0]?.selected_variant}
                      </p>
                    )}
                    <p>
                      {(value.used_extra_options &&
                        value.used_extra_options?.[0]?.price) ||
                        getGood(Number(key))?.price}{" "}
                      ₽
                    </p>
                  </div>
                  <p>{key}</p>
                </div>
              </li>
            ))
          )}
        </ul>
      </Section>

      <Section title="Итоговая стоимость">
        {orderIsLoading ? (
          <Skeleton width="100px" height="20px" />
        ) : (
          <h4> ₽</h4>
        )}
      </Section>

      <Section title="Параметры заказа" loading={orderIsLoading}>
        <ul className={stl.info_wrapper}>
          {orderIsLoading ? (
            <>
              <Skeleton width="100px" height="20px" />
              <Skeleton width="100px" height="20px" />
              <Skeleton width="100px" height="20px" />
              <Skeleton width="100px" height="20px" />
            </>
          ) : (
            orderData &&
            Object.entries(orderData.order_options).map(([key, value]) => (
              <li className={stl.info}>
                <h4>{key}</h4>
                <p>{value}</p>
              </li>
            ))
          )}
        </ul>
      </Section>

      <ActionArea>
        <Button>Связаться с клиентом</Button>
      </ActionArea>
    </>
  );
}

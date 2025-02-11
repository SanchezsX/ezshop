import { useShowBackButton } from "@/shared/hooks/useShowBackButton";
import { Container, InfoBlock } from "@/shared/components/features";
import { Search, Skeleton, Title } from "@/shared/components/ui";
import { useEffect, useState } from "react";
import stl from "./style.module.scss";
import { OrdersItem } from "@/modules/Orders/components/OrdersItem/page.tsx";
import { useDebounce } from "@/shared/hooks";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import OrderService from "@/shared/api/OrderService.ts";
import { Order } from "@/shared/models/order.ts";
import { Tab } from "@/shared/components/ui/Tab/page.tsx";

export function Orders() {
  const params = useParams();
  const queryState = useState("");
  const [query] = queryState;
  const debounceValue = useDebounce(query);
  const selectState = useState("active");
  const [select] = selectState;

  const [data, setData] = useState<Order[]>([]);

  const { data: ordersData, isLoading: ordersIsLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await OrderService.getAll(Number(params.id));
      return res.data;
    },
  });

  useEffect(() => {
    if (!ordersData) return;

    if (debounceValue === "") {
      let data: Order[] | null = null;

      if (select === "active") {
        data = ordersData.filter((o) =>
          ["waiting payment", "processing", "backlog"].includes(o.status),
        );
      }

      if (select === "archive") {
        data = ordersData.filter((o) =>
          ["cancelled", "finished"].includes(o.status),
        );
      }

      setData(data!);
      return;
    }

    let data: Order[] | null = null;

    const statusFilter =
      select === "active"
        ? ["waiting payment", "processing", "backlog"]
        : select === "archive"
          ? ["cancelled", "finished"]
          : null;

    if (statusFilter) {
      data = ordersData.filter(
        (o) =>
          statusFilter.includes(o.status) &&
          (o.order_id.toLowerCase().includes(debounceValue.toLowerCase()) ||
            o.from_user.toString().includes(debounceValue)),
      );
    } else {
      data = ordersData.filter(
        (d) =>
          d.order_id.toLowerCase().includes(debounceValue.toLowerCase()) ||
          d.from_user.toString().includes(debounceValue),
      );
    }

    setData(data);
  }, [debounceValue, ordersData, select]);

  useShowBackButton();

  return (
    <>
      <Container>
        <Title>
          <Title.Text>Управление заказами</Title.Text>
        </Title>

        <Search
          queryState={queryState}
          placeholder="Введите номер заказа или ID пользователя"
        />

        <div className={stl.tabs}>
          <Tab selectState={selectState}>
            <Tab.Item name="active">Активные</Tab.Item>
            <Tab.Item name="archive">Архив</Tab.Item>
          </Tab>
        </div>

        <div className={stl.orders}>
          {ordersIsLoading ? (
            new Array(8)
              .fill("")
              .map((_, i) => <Skeleton key={i} width="100%" height="52px" />)
          ) : data.length ? (
            data.map((d) => <OrdersItem key={d.order_id} data={d} />)
          ) : (
            <InfoBlock
              src="/images/robot.png"
              title="Заказы отсутствуют"
              subtitle={
                query
                  ? "По указаным параметрам заказов не найдено"
                  : "К сожалению никто еще не сделал заказ"
              }
              ownImage
              mt="90px"
            />
          )}
        </div>
      </Container>
    </>
  );
}

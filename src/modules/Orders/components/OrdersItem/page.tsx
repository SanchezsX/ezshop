import stl from "./style.module.scss";
import { cn } from "@/shared/helpers";
import { Link } from "react-router";
import { motion } from "motion/react";
import { Order } from "@/shared/models/order.ts";

export function OrdersItem({ data }: { data: Order }) {
  const date = new Date(data.ordered_at);

  return (
    <motion.div
      initial={{ opacity: 0, translateY: -10 }}
      animate={{
        opacity: 1,
        translateY: 0,
      }}
      exit={{ opacity: 0, translateY: -10 }}
      transition={{ damping: 0 }}
    >
      <Link className={stl.order} to={data.order_id}>
        <h4>{data.order_id}</h4>
        <p
          className={cn(
            data.status === "backlog" ? stl.orange : "",
            data.status === "waiting payment" ? stl.orange : "",
            data.status === "cancelled" ? stl.red : "",
            data.status === "processing" ? stl.green : "",
            data.status === "finished" ? stl.green : "",
          )}
        >
          {data.status === "backlog" && "Ожидание"}
          {data.status === "finished" && "Завершён"}
          {data.status === "cancelled" && "Отменён"}
          {data.status === "processing" && "В процессе"}
          {data.status === "waiting payment" && "Ожидает оплаты"}
        </p>
        <p>
          {date.getDate().toString().length > 1
            ? date.getDate()
            : `0${date.getDate()}`}
          .{date.getMonth()}.{date.getFullYear()}
        </p>
        <div className={stl.order_icon}>
          <img src="/icons/arrow-right.svg" alt="" />
        </div>
      </Link>
    </motion.div>
  );
}

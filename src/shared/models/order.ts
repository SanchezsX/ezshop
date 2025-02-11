import { z } from "zod";

export type Status =
  | "backlog"
  | "waiting payment"
  | "cancelled"
  | "processing"
  | "finished";

type CurrencyCode = "RUB" | "USD" | "EUR" | "ILS" | "XTR" | "UNIT";

type OrderItem = {
  amount: number;
  used_extra_options: OrderItemUsedExtraOptions[];
};

type OrderItemUsedExtraOptions = {
  name: string;
  price: number;
  selected_variant: string;
};

export interface Order {
  order_id: string;
  bot_id: number;
  items: Record<string, OrderItem>;
  from_user: number;
  payment_method: string;
  status: Status;
  ordered_at: string;
  order_options: object;
  time: string;
  currency_code: CurrencyCode;
}

export interface OrderCreate {
  id: number;
  amount: number;
  used_extra_options: OrderItemUsedExtraOptions[];
}

export interface OrderCreateParams {
  order_id: string;
  bot_id: number;
  from_user: number;
  payment_method?: string;
  status: Status;
  ordered_at: string;
  time?: string;
  currency_code?: CurrencyCode;
}

export const OrderStatusSchema = z.object({
  order_id: z.string(),
  bot_id: z.number(),
  new_status: z.enum([
    "backlog",
    "waiting payment",
    "cancelled",
    "processing",
    "finished",
  ]),
});

export type OrderStatus = z.infer<typeof OrderStatusSchema>;

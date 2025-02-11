import { Order, OrderStatus } from "../models/order";
import { instance } from "./instance";

class OrderService {
  rootRoute = (...inline: string[]) => `/orders${inline.join("")}`;

  async getAll(botId: number) {
    return await instance.get<Order[]>(
      this.rootRoute("/get_all_orders/", botId.toString()),
    );
  }

  async editStatus(data: OrderStatus) {
    return await instance.post<OrderStatus>(
      this.rootRoute("/edit_order_status"),
      data,
    );
  }
}

export default new OrderService();

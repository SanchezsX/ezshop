import { Shop, ShopCreate } from "../models/shop";
import { instance } from "./instance";

export interface CheckTokenExistenceResponse {
  is_valid: boolean;
  bot_exists: boolean;
  bot_username: string;
  bot_name: string;
}

type Status = "online" | "offline" | "not_created";

class ShopService {
  rootRoute = (...inline: string[]) => `/manage${inline.join("")}`;

  async getAll(userId: number) {
    return await instance.get<Shop[]>(
      this.rootRoute("/get_all_user_shops/", userId.toString()),
    );
  }

  async get(data: { botId: number; userId: number }) {
    return await instance.get<Shop>(
      this.rootRoute(
        "/get_user_shop/",
        data.botId.toString(),
        "/",
        data.userId.toString(),
      ),
    );
  }

  async create(data: ShopCreate) {
    return await instance.post(this.rootRoute("/create_shop"), data);
  }

  async checkTokenExistence(token: string) {
    return await instance.post<CheckTokenExistenceResponse>(
      this.rootRoute("/check_bot_token_existence"),
      {
        token,
      },
    );
  }

  async changeStatus(data: { botId: number; status: Status }) {
    return await instance.post<CheckTokenExistenceResponse>(
      this.rootRoute("/change_bot_status"),
      { bot_id: data.botId, new_status: data.status },
    );
  }

  async getCountUsers(botId: number) {
    return await instance.get(
      this.rootRoute("/get_shop_users_count/", String(botId)),
    );
  }
}

export default new ShopService();

import { User, UserTelegram } from "../models/user";
import { instance } from "./instance";

class UserService {
  rootRoute = (...inline: string[]) => `/manage${inline.join("")}`;

  async get(userId: number) {
    return await instance.get<User>(
      this.rootRoute("/get_user_info/", userId.toString()),
    );
  }

  async getTgInfo(data: { botId: number; userId: number }) {
    return await instance.get<UserTelegram>(
      this.rootRoute(
        "/get_tg_user_data/",
        data.botId.toString(),
        "/",
        data.userId.toString(),
      ),
    );
  }
}

export default new UserService();

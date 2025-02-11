import { Category, CategoryCreate } from "../models/category";
import { instance } from "./instance";

type Delete = { bot_id: number; category_id: number };

class CategoryService {
  rootRoute = (...inline: string[]) => `/categories${inline.join("")}`;

  async getAll(botId: number) {
    return await instance.get<Category[]>(
      this.rootRoute("/get_all_categories/", botId.toString()),
    );
  }

  async create(body: CategoryCreate) {
    return await instance.post(this.rootRoute("/add_category"), body);
  }

  async edit(body: Category) {
    return await instance.post(this.rootRoute("/edit_category"), body);
  }

  async delete(params: Delete) {
    return await instance.delete(
      this.rootRoute(
        "/del_category/",
        params.bot_id.toString(),
        "/",
        params.category_id.toString(),
      ),
    );
  }
}

export default new CategoryService();

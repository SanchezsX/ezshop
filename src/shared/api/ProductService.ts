import {
  Filters,
  Product,
  ProductCreate,
  ProductCreatePhotoParams,
  ProductEdit,
  ProductGetAllBody,
  ProductGetAllParams,
} from "../models/product";
import { instance } from "./instance";

class ProductService {
  rootRoute = (...inline: string[]) => `/products${inline.join("")}`;

  async getAll(params: ProductGetAllParams, body?: ProductGetAllBody[]) {
    return await instance.post<Product[]>(
      this.rootRoute("/get_all_products"),
      body || [],
      { params },
    );
  }

  async get(path: { bot_id: number; product_id: number }) {
    return await instance.get<Product>(
      this.rootRoute("/get_product", `/${path.bot_id}`, `/${path.product_id}`),
    );
  }

  async getFilters() {
    return await instance.get<Filters>(this.rootRoute("/get_filters"));
  }

  async create(body: ProductCreate) {
    return await instance.post(this.rootRoute("/add_product"), body);
  }

  async createPhoto(files: FormData, params: ProductCreatePhotoParams) {
    return await instance.post<string>(
      this.rootRoute("/add_product_photo"),
      files,
      {
        params: {
          ...params,
          primary_picture_index: 0,
        },
      },
    );
  }

  async edit(body: ProductEdit) {
    return await instance.post(this.rootRoute("/edit_product"), body);
  }

  async editPhoto(data: {
    body: string[][];
    botId: number;
    productId: number;
  }) {
    return await instance.post(
      this.rootRoute("/edit_product_photos"),
      data.body,
      {
        params: {
          bot_id: data.botId,
          product_id: data.productId,
          primary_picture_index: 0,
        },
      },
    );
  }

  async delete(path: { bot_id: number; product_id: number }) {
    return await instance.delete<Product>(
      this.rootRoute("/del_product", `/${path.bot_id}`, `/${path.product_id}`),
    );
  }
}

export default new ProductService();

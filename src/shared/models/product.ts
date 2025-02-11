import { z } from "zod";

export type ProductCreate = Product;
export type ProductEdit = Partial<Product>;

export interface ProductGetAllBody {
  filter_name: string;
  is_category_filter: boolean;
  reverse_order: boolean;
}

export type ImageUpload = {
  file: File | null;
  order: number;
  image: string;
};

export interface ProductGetAllParams {
  bot_id: number;
  price_min?: number;
  price_max?: number;
  search_word?: string;
  is_admin_request?: boolean;
}

export interface ProductCreatePhotoParams {
  bot_id: number;
  product_id: number;
}

export const MarketplaceSchema = z.object({
  marketplace_type: z
    .string({ message: "Поле обязательное для заполнения" })
    .min(1, "Поле обязательное для заполнения"),
  marketplace_url: z
    .string()
    .min(1, "Поле обязательное для заполнения")
    .url("Некорректная ссылка"),
  marketplace_id: z.string().optional(),
  marketplace_article: z.string().optional(),
  auto_parsing: z.boolean().optional(),
});

export const ExtraOptionsSchema = z.object({
  name: z.string(),
  type: z.enum(["text", "block", "priced_block"]),
  variants: z.array(z.string()),
  variants_prices: z.array(z.number()).optional(),
  variants_discounts: z.array(z.number()).nullable().optional(),
});

export const ProductSchema = z.object({
  id: z.number().optional(),
  bot_id: z.number().optional(),
  name: z.string().min(1, "Поле обязательное для заполнения"),
  category: z.array(z.number()).optional(),
  description: z.string().optional(),
  article: z.string().min(1, "Поле обязательное для заполнения"),
  price: z
    .number({ message: "Поле обязательное для заполнения" })
    .min(1, "Поле обязательное для заполнения"),
  count: z
    .number({ message: "Поле обязательное для заполнения" })
    .min(1, "Поле обязательное для заполнения"),
  picture: z.array(z.array(z.string())).optional(),
  primary_picture_index: z.number().optional(),
  product_badge: z.string().optional(),
  extra_options: z.array(ExtraOptionsSchema).optional(),
  discount: z.number().optional(),
  marketplace_connected: z.boolean().optional(),
  marketplace_data: MarketplaceSchema,
});

export type Filters = {
  rating: "По рейтингу";
  popular: "По популярности";
  price: "По цене";
  search: "По поиску";
};

export type Product = z.infer<typeof ProductSchema>;

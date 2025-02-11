import { z } from "zod";

export const langSchema = z.enum(["ru", "eng", "heb"]);
export type ShopStatus = "online" | "offline" | "not_created";

export const shopSchema = z.object({
  bot_id: z.number(),
  shop_status: z.enum(["online", "offline", "not_created"]),
  shop_name: z.string(),
  user_role: z.enum(["owner", "admin"]),
  bot_url: z.string().url(),
  shop_url: z.string().url(),
});

export const shopCreateSchema = z
  .object({
    shop_name: z.string().min(6, "Поле является обязательным к заполнению!"),
    token: z.string().min(46, "Некорректный токен!").optional(),
    with_token: z.boolean(),
    user_id: z.number().optional(),
    lang: langSchema.optional(),
  })
  .refine((data) => !data.with_token || !!data.token, {
    message: "Токен обязателен к заполнению!",
    path: ["token"],
  });

export type Shop = z.infer<typeof shopSchema>;
export type ShopCreate = z.infer<typeof shopCreateSchema>;

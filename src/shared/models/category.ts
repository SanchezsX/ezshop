import { z } from "zod";

export interface Category {
  bot_id: number;
  name: string;
  child_cat_ids: number[];
  id: number;
}

export const CategoryCreate = z.object({
  bot_id: z.number().optional(),
  name: z.string().min(1, "Поле обязательное для заполнения"),
  child_cat_ids: z.array(z.number().optional()).optional(),
});

export type CategoryCreate = z.infer<typeof CategoryCreate>;

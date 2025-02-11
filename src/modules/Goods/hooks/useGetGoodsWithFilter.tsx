import { useQuery } from "@tanstack/react-query";
import { ProductGetAllBody } from "@/shared/models/product.ts";
import ProductService from "@/shared/api/ProductService.ts";
import { useParams, useSearchParams } from "react-router";
import { useEffect } from "react";
import { useDebounce } from "@/shared/hooks";

export const useGetGoodsWithFilter = (data: { debounceQuery: string }) => {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const debounceValue = useDebounce(data.debounceQuery);

  const {
    data: goodsData,
    isLoading: goodsIsLoading,
    refetch: goodsRefetch,
  } = useQuery({
    queryKey: ["goods/filter"],
    queryFn: async () => {
      const priceFromParam = searchParams.get("priceFrom");
      const priceToParam = searchParams.get("priceTo");
      const categoriesParam = searchParams.get("categories");
      const subcategoriesParam = searchParams.get("subcategories");
      const sortParam = searchParams.get("sort");

      const queryParams: {
        bot_id: number;
        price_min?: number;
        price_max?: number;
        search_word?: string;
      } = {
        bot_id: Number(params.id),
      };

      if (priceFromParam && priceFromParam.trim() !== "") {
        queryParams.price_min = Number(priceFromParam);
      }
      if (priceToParam && priceToParam.trim() !== "") {
        queryParams.price_max = Number(priceToParam);
      }
      if (debounceValue && debounceValue.trim() !== "") {
        queryParams.search_word = debounceValue;
      }

      const filters: ProductGetAllBody[] = [];

      if (categoriesParam && categoriesParam.trim() !== "") {
        filters.push({
          filter_name: categoriesParam,
          is_category_filter: true,
          reverse_order: false,
        });
      }
      if (subcategoriesParam && subcategoriesParam.trim() !== "") {
        filters.push({
          filter_name: subcategoriesParam,
          is_category_filter: true,
          reverse_order: false,
        });
      }
      if (sortParam && sortParam.trim() !== "") {
        filters.push({
          filter_name: sortParam,
          is_category_filter: false,
          reverse_order: false,
        });
      }
      if (debounceValue && debounceValue.trim() !== "") {
        filters.push({
          filter_name: "search",
          is_category_filter: false,
          reverse_order: false,
        });
      }

      const response = await ProductService.getAll(queryParams, filters);
      return response.data;
    },
    enabled: false,
  });

  useEffect(() => {
    goodsRefetch();
  }, [debounceValue, searchParams]);

  return { goodsData, goodsIsLoading };
};

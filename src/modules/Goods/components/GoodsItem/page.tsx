import { Card } from "@/shared/components/ui/Card/page.tsx";
import stl from "@/modules/Goods/style.module.scss";
import FileService from "@/shared/api/FileService.ts";
import { cn } from "@/shared/helpers";
import { GoodsCounter } from "@/modules/Goods/components/GoodsCounter/page.tsx";
import { Product } from "@/shared/models/product.ts";
import { Dispatch, SetStateAction } from "react";
import { SelectedItem } from "@/modules/Goods/page.tsx";
import { useParams } from "react-router";
import { useGetCategories } from "@/shared/hooks";
import { abbreviateNumber } from "@/shared/helpers/abbreviateNumber.ts";

interface GoodsItemProps {
  item: Product;
  selectedState: [SelectedItem[], Dispatch<SetStateAction<SelectedItem[]>>];
  withImage: boolean;
}

export function GoodsItem({ item, selectedState, withImage }: GoodsItemProps) {
  const params = useParams();

  const { categoriesData } = useGetCategories({
    botId: Number(params.id),
  });

  return (
    <Card
      key={item.id}
      id={Number(item.id)}
      name={item.name}
      selectedState={selectedState}
    >
      <Card.Info>
        <Card.Item>
          <div className={stl.img_block}>
            {withImage && (
              <div className={stl.img}>
                <img
                  src={FileService.getProductThumbnail(Number(item.id))}
                  alt=""
                />
              </div>
            )}
            <span className={stl.name}>{item.name}</span>
          </div>
        </Card.Item>
        <Card.Item>
          <span className={stl.gray}>{item.id}</span>
        </Card.Item>
        <Card.Item>
          <span
            className={cn(
              item.count <= 10 ? stl.orange : "",
              item.count <= 5 ? stl.red : "",
              item.count > 10 ? stl.green : "",
            )}
          >
            {abbreviateNumber(item.count)}
          </span>
        </Card.Item>
      </Card.Info>
      <Card.Hidden>
        <Card.Feature
          name="Категория товара"
          value={
            categoriesData?.filter((c) => c.id === item.category![0])[0]
              ?.name || "-"
          }
        />
        <Card.Feature
          name="Подкатегория"
          value={
            categoriesData?.filter((c) => c.id === item.category![1])[0]
              ?.name || "-"
          }
        />
        <Card.Feature name="Цена" value={`${item.price.toString()} ₽`} />
        <GoodsCounter item={item} />
      </Card.Hidden>
    </Card>
  );
}

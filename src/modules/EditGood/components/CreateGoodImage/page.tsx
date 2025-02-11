import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Dispatch, SetStateAction } from "react";
import stl from "./style.module.scss";
import FileService from "@/shared/api/FileService.ts";
import { ImageUpload } from "@/shared/models/product.ts";

interface CreateGoodImageProps {
  images: ImageUpload[];
  setImages: Dispatch<SetStateAction<ImageUpload[]>>;
}

export function CreateGoodImage({ images, setImages }: CreateGoodImageProps) {
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = images.findIndex((img) => img.order === active.id);
    const newIndex = images.findIndex((img) => img.order === over.id);
    const newImages = arrayMove(images, oldIndex, newIndex).map(
      (img, index) => ({
        ...img,
        order: index,
      }),
    );

    setImages(newImages);
  }

  function handleDelete(order: number) {
    setImages((prev) => {
      const filtered = prev.filter((img) => img.order !== order);
      const newImages = filtered.map((img, index) => ({
        ...img,
        order: index,
      }));
      return newImages;
    });
  }

  function handleStar(order: number) {
    setImages((prevImages) => {
      const imageToTop = prevImages.find((img) => img.order === order);
      if (!imageToTop) return prevImages;

      return prevImages
        .map((img) => {
          if (img.order === order) {
            return { ...img, order: 0 };
          }
          if (img.order < order) {
            return { ...img, order: img.order + 1 };
          }
          return img;
        })
        .sort((a, b) => a.order - b.order); // Пересортировка массива
    });
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={images.map((img) => img.order)}>
        <div className={stl.imageContainer}>
          {images.map((image) => (
            <SortableImage
              key={`${image.image} ${image.order}`}
              image={image}
              onDelete={handleDelete}
              onStar={handleStar}
              isUploaded={!!image.file}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

function SortableImage({
  image,
  onDelete,
  onStar,
  isUploaded,
}: {
  image: ImageUpload;
  onDelete: (order: number) => void;
  onStar: (order: number) => void;
  isUploaded: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: image.order,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(image.order);
  };

  const handleStarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onStar(image.order);
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} className={stl.image}>
      <div className={stl.image} {...listeners}>
        <div className={stl.image_src}>
          <img
            src={isUploaded ? image.image : FileService.getFile(image.image)}
            alt={`image ${image.order}`}
          />
        </div>
        <div className={stl.image_wrapper}>
          <div className={stl.image_info}>
            <h4>{isUploaded ? image.file?.name : image.image}</h4>
            <p>Image</p>
          </div>
        </div>
      </div>
      <div className={stl.image_actions}>
        <button
          className={stl.image_actions_star}
          type="button"
          onClick={handleStarClick}
        >
          <img
            src={
              image.order === 0
                ? "/icons/blue-star.svg"
                : "/icons/gray-star.svg"
            }
            alt=""
          />
        </button>
        <button
          className={stl.image_actions_close}
          type="button"
          onClick={handleDeleteClick}
        >
          <img src="/icons/cross.svg" alt="" />
        </button>
      </div>
    </div>
  );
}

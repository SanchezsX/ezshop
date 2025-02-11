import axios from "axios";

interface ErrorCatcherDetail {
  type: string;
  loc: string[];
  msg: string;
}

interface ErrorCatcherResponse {
  detail: ErrorCatcherDetail[] | string;
}

export function errorCatcher(error: unknown): string {
  if (axios.isAxiosError(error) && error.response?.data?.detail) {
    const data = error.response.data as ErrorCatcherResponse;

    if (Array.isArray(data.detail) && data.detail.length > 0) {
      const firstError = data.detail[0];

      if (
        firstError.type === "value_error" &&
        (firstError.msg.includes(
          "Value error, wildberries link must be in format:",
        ) ||
          firstError.msg.includes("Value error, ozon link must be in format"))
      ) {
        return "Вы ввели некорректную ссылку на маркетплейс!";
      }

      switch (firstError.type) {
        case "string_too_short":
          return "Вы ввели некорректное значение для этого поля!";
        case "int_type":
          return "Поле с невалидным наполнением!";
        default:
          return firstError.msg || "Произошла ошибка";
      }
    }

    if (
      error.response.data.detail.includes("Category with child cant be deleted")
    ) {
      return "Данную категорию нельзя удалить так, как он уже используется товарами или же категориями!";
    }

    if (
      error.response.data.detail.includes(
        "Conflict while adding category (category with provided name already exists).",
      )
    ) {
      return "Категория с подобным названием уже существует!";
    }

    if (
      error.response.data.detail.includes(
        "Forbidden extra params: info=shop creation limit",
      )
    ) {
      return "Больше нельзя создать магазинов, у вас лимит!";
    }

    if (
      error.response.data.detail.includes(
        "Conflict while adding product (Item already exists) extra params: conflicted_param=article",
      )
    ) {
      return "Данный артикул уже используется другим товаром!";
    }
  }

  return "Ошибка сети или неизвестная ошибка";
}

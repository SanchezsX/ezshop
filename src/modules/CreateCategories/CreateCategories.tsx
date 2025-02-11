import { Container, Section } from "@/shared/components/features";
import { Input, Select, Title } from "@/shared/components/ui";

export function CreateCategories() {
  return (
    <>
      <Container>
        <Title.Text>Добавление категории</Title.Text>
      </Container>
      <Section title="Заполните поля">
        <Select placeholder="Категория родитель">
          <Select.Option>qwq</Select.Option>
          <Select.Option>qwq</Select.Option>
          <Select.Option>qwq</Select.Option>
        </Select>
        <Select placeholder="Подкатегория">
          <Select.Option>qwq</Select.Option>
          <Select.Option>qwq</Select.Option>
          <Select.Option>qwq</Select.Option>
        </Select>
        <Input id="3" placeholder="Название категории"></Input>
      </Section>
    </>
  );
}

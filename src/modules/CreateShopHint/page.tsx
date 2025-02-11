import { ActionArea, Container, Section } from "@/shared/components/features";
import { Button, Title } from "@/shared/components/ui";
import { useNavigate } from "react-router";
import stl from "./style.module.scss";
import { useShowBackButton } from "@/shared/hooks";

export function CreateShopHint() {
  const navigate = useNavigate();

  useShowBackButton();

  return (
    <>
      <Container>
        <Title>
          <Title.Text>Получение токена</Title.Text>
        </Title>
      </Container>
      <Section title="Инструкция" gap={false}>
        <Section.Link href="https://t.me/BotFather">
          <Section.Icon src="/icons/sections/bot.svg" />
          <Section.Text>
            <h4>
              1. Откройте чат с <span>@BotFather</span>
            </h4>
          </Section.Text>
        </Section.Link>
        <Section.Item>
          <Section.Icon src="/icons/sections/message.svg" />
          <Section.Text>
            <h4>2. Введите команду /newbot</h4>
          </Section.Text>
        </Section.Item>
        <Section.Item>
          <Section.Text className={stl.ml_text}>
            <h4>3. Введите название бота</h4>
            <p>Будет отображаться в имени чата с ботом</p>
          </Section.Text>
        </Section.Item>
        <Section.Item>
          <Section.Text className={stl.ml_text}>
            <h4>4. Введите юзернейм бота</h4>
            <p>Должно заканчиваться на bot (нельзя изменить)</p>
          </Section.Text>
        </Section.Item>
        <Section.Item>
          <Section.Icon src="/icons/sections/copy.svg" />
          <Section.Text>
            <h4>5. Скопируйте полученый токен</h4>
            <p>Скопировать можно нажатием на токен в чате</p>
          </Section.Text>
        </Section.Item>
      </Section>
      <Section title="Подробная инструкция" gap={false}>
        <Section.Link href="https://t.me">
          <Section.Text>
            <h4>
              Подробную инструкцию можно найти в канале
              <span> @channelusername</span>
            </h4>
          </Section.Text>
        </Section.Link>
      </Section>
      <ActionArea>
        <Button onClick={() => navigate(-1)}>Закрыть</Button>
      </ActionArea>
    </>
  );
}

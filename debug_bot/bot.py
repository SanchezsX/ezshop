import asyncio
import logging
import sys
from os import getenv

from aiogram import Bot, Dispatcher, html
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode
from aiogram.filters import CommandStart
from aiogram.types import Message, InlineKeyboardMarkup, InlineKeyboardButton, WebAppInfo

from dotenv import load_dotenv

load_dotenv()

TOKEN = getenv("TELEGRAM_BOT_TOKEN")
APP_URL = getenv("MAIN_APP_URL")
APP_PORT = getenv("VITE_APP_SERVER_PORT")
BOT_ADMINS = [int(x) for x in getenv("BOT_ADMINS").split(",")]

dp = Dispatcher()


kb = InlineKeyboardMarkup(
    inline_keyboard=[
        [
            InlineKeyboardButton(
                text="Открыть приложение",
                web_app=WebAppInfo(
                    url=f"{APP_URL}:{APP_PORT}"
                ),
            )
        ]
    ]
)


async def send_notify_to_admins(text: str):
    for admin in BOT_ADMINS:
        try:
            await bot.send_message(admin, text)
        except:
            pass
    await bot.session.close()


@dp.message(CommandStart())
async def command_start_handler(message: Message) -> None:
    await message.answer(f"Hello, {html.bold(message.from_user.full_name)}!", reply_markup=kb)


async def main() -> None:
    # And the run events dispatching
    await dp.start_polling(bot)


if __name__ == "__main__":
    # Initialize Bot instance with default bot properties which will be passed to all API calls
    bot = Bot(token=TOKEN, default=DefaultBotProperties(parse_mode=ParseMode.HTML))
    if len(sys.argv) > 1:
        param = sys.argv[1]
        match param:
            case "suc_build":
                asyncio.run(send_notify_to_admins("✅ FRONT BUILD SUCCESS"))
            case "err_build":
                asyncio.run(send_notify_to_admins("❌ FRONT BUILD ERROR"))
            case _:
                print("UNKNOWN NOTIFY TYPE")
                exit(2)
        exit(0)

    logging.basicConfig(level=logging.INFO, stream=sys.stdout)
    asyncio.run(main())

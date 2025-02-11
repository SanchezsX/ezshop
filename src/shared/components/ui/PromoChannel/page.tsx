import stl from "./style.module.scss"

export function PromoChannel() {
	return (
		<a className={stl.promo} href="https://t.me">
				<img src="/icons/telegram.svg" alt="" />
				<div className={stl.promo_info}>
					<h4>@ezshop</h4>
					<p>Наш Telegram-канал</p>
				</div>
			</a>
	);
}
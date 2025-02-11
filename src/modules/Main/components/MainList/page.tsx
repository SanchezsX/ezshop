import { ROUTES } from '@/shared/constants/routes'
import { Shop } from '@/shared/models/shop'
import { Link } from 'react-router'
import stl from "./style.module.scss"

interface MainListProps {
	data: Shop[];
}

export function MainList({ data }: MainListProps) {
	return (
		<div className={stl.list}>
			{data.map(({ bot_id, shop_name, shop_status }) => (
				<Link key={bot_id} to={ROUTES.shop(bot_id)} className={stl.item}>
					<h1 className={stl.item_title}>
						{shop_name}
					</h1>
					<p className={stl.item_status}>
						{shop_status}
					</p>
				</Link>
			))}
		</div>
	);
}
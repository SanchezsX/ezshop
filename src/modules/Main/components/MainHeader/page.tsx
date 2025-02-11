import { PromoChannel } from '@/shared/components/ui'
import { useInitData } from '@/shared/hooks/useInitData'
import stl from "./style.module.scss"

export function MainHeader() {
	const initData = useInitData();

	return (
		<header className={stl.header}>
			<div className={stl.header_user}>
				<div className={stl.header_avatar}>
					<img src={initData?.photoUrl} alt="" />
				</div>
				<div className={stl.header_info}>
					<h4>{initData?.firstName}</h4>
					<p>@{initData?.username}</p>
				</div>
			</div>
			<PromoChannel />
		</header>
	);
}
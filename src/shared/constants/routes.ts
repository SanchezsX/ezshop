export const ROUTES = {
	main: function() {
		return "/";
	},

	shop: function(shopId: number, ...inline: string[]) {
		return "/shop/" + shopId.toString() + inline.join("");
	},

	goods: function(shopId: number, ...inline: string[]) {
		return this.shop(shopId, "/goods", inline.join(""));
	},
	
	categories: function(shopId: number, ...inline: string[]) {
		return this.shop(shopId, "/categories", inline.join(""));
	},
	
	orders: function(shopId: number, ...inline: string[]) {
		return this.shop(shopId, "/orders", inline.join(""));
	},

	bot: function(shopId: number, ...inline: string[]) {
		return this.shop(shopId, "/bot", inline.join(""));
	},
}
const TYPES = {
	dev: "DEBUG",
	prod: ""
}

export const AUTHORIZATION_DATA = 
	import.meta.env.VITE_APP_STATUS === "DEV" ? TYPES.dev : TYPES.prod;
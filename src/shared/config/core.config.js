export const coreConfig = {
	NODE_ENV: import.meta.env.NODE_ENV,
	APP: {
		TITLE: import.meta.env.VITE_APP_TITLE,
		AUTH_STORAGE: 'SSID',
	},
	API: {
		BASE_URL: import.meta.env.VITE_APP_API_URL,
	},
};

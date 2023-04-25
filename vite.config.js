import { defineConfig } from 'vite';
import { antdDayjs } from 'antd-dayjs-vite-plugin';
import PluginReact from '@vitejs/plugin-react';
import PluginJSConfigPath from 'vite-jsconfig-paths';
import PluginDyanmicImport from 'vite-plugin-dynamic-import';
import svgr from 'vite-plugin-svgr'; // transform svg to react component

export default defineConfig({
	css: {
		preprocessorOptions: {
			sass: {
				javascriptEnabled: true,
			},
		},
	},
	optimizeDeps: ['react-quill'],
	plugins: [antdDayjs(), PluginReact(), PluginJSConfigPath(), PluginDyanmicImport(), svgr()],
});
